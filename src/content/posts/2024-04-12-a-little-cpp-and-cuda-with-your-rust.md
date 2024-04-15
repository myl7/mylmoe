---
title: A little C++ and CUDA with your Rust
pub_date: 2024-04-12
---

<!-- Copyright (C) myl7 -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

[_A little C with your Rust_], a well-known article, of [_The Embedded Rust Book_] has breifly introduced how to call a C function from Rust without a third-party build dependency.
In the post, We will step further to solve the same FFI problem in a more complex scenario: calling a C++ function that additionaly contains some CUDA code from Rust without a third-party build dependency, e.g., [cxx].

[_A little C with your Rust_]: https://docs.rust-embedded.org/book/interoperability/c-with-rust.html
[_The Embedded Rust Book_]: https://docs.rust-embedded.org/book/
[cxx]: cxx.rs

<details>
  <summary>TL;DR</summary>

- Handle name mangling and ensure the static library is used
- Link `libstdc++` and `libcudart`
- `CUDA_RESOLVE_DEVICE_SYMBOLS ON` in addition to `CUDA_SEPARABLE_COMPILATION ON`

</details>

## Setup

We discuss the problem on the codebase [myl7/fss-prg-cuda].
It is a C++ project built with CMake.
In the path `include`, there is a header file as the interface, in which there is C++ only `namespace` declaration.
In the path `src`, there are definitions that contain CUDA code, which is stored in `.cu` files.
With the CMake configuration, we can already build the project to a static `.a` library and dynamic `.so` library.
Now we are going to add Rust bindings to the project, and make use of the Rust test framework to test it.

[myl7/fss-prg-cuda]: https://github.com/myl7/fss-prg-cuda/tree/10350c046e060e6f976891804ae635112ab9a1f0

The API is exported in the header file as:

```cpp
namespace fssprgcuda {

int Aes128MatyasMeyerOseas(...);

}  // namespace fssprgcuda
```

And the CMake configuration is one of the key points.
We show the initial configuration as below:

```cmake
# For Ubuntu Jammy 22.04 so far
cmake_minimum_required(VERSION 3.22)
# Set env `CUDACXX=/absolute/path/to/nvcc` to enable the CUDA language
# if nvcc is not in the PATH.
project(fss-prg-cuda LANGUAGES CUDA CXX)

# If the builder is confused by a soft link from /usr/local/cuda-* to /usr/local/cuda,
# pass `-DCUDA_TOOLKIT_ROOT_DIR=/usr/local/cuda-*` to CMake to locate CUDA.
include(CheckLanguage)
check_language(CUDA)

add_library(
  fssprgcuda
  src/fssprgcuda.cpp
  src/torchcsprng/kernels.cu
  src/torchcsprng/owcf.cu
  src/torchcsprng/aes.cu
)
target_compile_features(fssprgcuda PUBLIC cxx_std_17)
set_target_properties(fssprgcuda PROPERTIES CUDA_SEPARABLE_COMPILATION ON)
target_include_directories(fssprgcuda PUBLIC "${CMAKE_CURRENT_SOURCE_DIR}/include")
# The following one line is for a CUDA feature used in the project.
# It does not affect the FFI problem.
target_compile_options(fssprgcuda PRIVATE $<$<COMPILE_LANGUAGE:CUDA>:--extended-lambda>)
```

Notice the flag `CUDA_SEPARABLE_COMPILATION`.
It is suggested in tutorials like [this one in the CUDA technical blog][Building Cross-Platform CUDA Applications with CMake]

[Building Cross-Platform CUDA Applications with CMake]: https://developer.nvidia.com/blog/building-cuda-applications-cmake/#separable_compilation 'Building Cross-Platform CUDA Applications with CMake'

Finally, we start with a primitive Rust binding like:

```rust
// src/lib.rs
pub mod ffi {
    use std::ffi::c_int;

    extern "C" {
        pub fn Aes128MatyasMeyerOseas(...);
    }
}
```

And the build script of the Rust project is:

```rust
// build.rs
fn main() {
    println!("cargo:rustc-link-search={}", "build");

    println!("cargo:rustc-link-lib=static={}", "fssprgcuda");
    println!("cargo:rerun-if-changed={}", "build/libfssprgcuda.a");
}
```

## Name mangling

When running the build, it should not be surprising to see an unknown symbol error from the linker:

```log
undefined reference to `Aes128MatyasMeyerOseas'
collect2: error: ld returned 1 exit status
```

Even without the `namespace` declaration, C++ does name mangling to allow function declaration with the same name but different signatures, which renames the function symbols in the object files and libraries.
It is also mentioned in the [documentation of the `cc` crate], which is a officially recommended tool maintained under the official `rust-lang` organization.

You can check the mangled name of the current code with the command `nm`:

[documentation of the `cc` crate]: https://docs.rs/cc/1.0.92/cc/#c-support

```shell
$ nm build/libfssprgcuda.a | grep Aes128MatyasMeyerOseas
0000000000000000 T _ZN10fssprgcuda22Aes128MatyasMeyerOseasEPhmPKhm
```

It is possible to disable name mangling in C++ for some functions.
It is to wrap the function declarations with a `extern "C" {}` block.
(The definitions are required to be wrapped.)
After that, you can get a `Aes128MatyasMeyerOseas` symbol even though the function is still in a `namespace`.

An alternative solution is to directly use the mangled name in the Rust code.
Instead of declaring `fn _ZN10fssprgcuda22Aes128MatyasMeyerOseasEPhmPKhm`, you can use the `#[link_name]` attribute to use an alias name in the Rust code:

```rust
// src/lib.rs
#[link_name = "_ZN10fssprgcuda22Aes128MatyasMeyerOseasEPhmPKhm"]
pub fn aes128_matyas_meyer_oseas(...);
```

We choose the latter one because then we do not need to modify the library API or add some C++ wrapper code.

Here notice the `static={}` segment.
If you omit the explicit library type declaration, the linker will choose the dynamic library by default, documented even in the [_The rustc book_] other than the [_Build Scripts_ page of _The Cargo Book_].
Because the `build` directory is not in the dynamic library searching path in runtime, cargo would always reports unknown symbol errors for the exported API, while the API symbol is actually correctly exported and can be seen with the `nm` command.

[_The rustc book_]: https://doc.rust-lang.org/rustc/command-line-arguments.html#-l-link-the-generated-crate-to-a-native-library
[_Build Scripts_ page of _The Cargo Book_]: https://doc.rust-lang.org/cargo/reference/build-scripts.html#rustc-link-lib

## `libstdc++`

Rerun the build, and now we get a bunch of errors (~~C++ style, is not it?~~).
We can see the following lines in all the errors:

```log
/usr/bin/ld: fssprgcuda.cpp:(.text+0x8a): undefined reference to `std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::~basic_string()'
/usr/bin/ld: fssprgcuda.cpp:(.text+0x93): undefined reference to `std::allocator<char>::~allocator()'
```

Which says the linker can not find the implementation of `<string>` of the C++ standard library.

The point is that other than only including `libc`, C++ also links libraries like `libstdc++` to provide some implementations of the standard library, like `<string>`.
Another example that should be more familiar is `<thread>`, which requires linking with pthread to get the implementation.
This is also mentioned in the [documentation of the `cc` crate].

To fix some of the unknown symbol errors, add the following line to the build script to link, e.g., `libstdc++`:

```rust
// build.rs
println!("cargo:rustc-link-lib=dylib={}", "stdc++");
```

Staticly linking with `libstdc++` by replacing `dylib` with `static` should also work.
But cargo can not find a static `libstdc++` on my system, so I have not tested it.
If dynamicly linking, you need to put the above line after the `println!("cargo:rustc-link-lib=static={}", "fssprgcuda");` line, otherwise the symbols can still not be found.

## cudart: CUDA runtime API

Now the error number has decreased largely, but we still get unknown symbol errors like:

```log
/usr/local/cuda-12.1/bin/../targets/x86_64-linux/include/crt/host_runtime.h:259: undefined reference to `__cudaUnregisterFatBinary'
/usr/bin/ld: build/libfssprgcuda.a(kernels.cu.o): in function `__nv_init_managed_rt_with_module(void**)':
/usr/local/cuda-12.1/bin/../targets/x86_64-linux/include/crt/host_runtime.h:264: undefined reference to `__cudaInitModule'
```

From the names, e.g., `__cudaUnregisterFatBinary`, we can infer that they are something from CUDA and required in runtime.
By searching, we can know they are in the CUDA runtime API library `libcudart`.
Like `libstdc++`, we need to add the following line to the build script to link it, and ensure it is after the `fssprgcuda` line:

```rust
// build.rs
println!("cargo:rustc-link-lib=dylib={}", "cudart");
```

You many also want to add the line `println!("cargo:rustc-link-search={}", "/usr/local/cuda/lib64");` if the CUDA library path is not searched by default.

Some answers, e.g., [this one to the question about undefined reference to `__cudaRegisterLinkedBinary`] suggests one more library `cudadevrt`, which from the name should be about development-purpose runtime API.
It is not required in this project though.

[this one to the question about undefined reference to `__cudaRegisterLinkedBinary`]: https://stackoverflow.com/a/22116121

## Link glue code generated by CUDA

The final barrier is some kind of weird unknown symbol errors:

```log
/usr/bin/ld: build/libfssprgcuda.a(kernels.cu.o): in function `__sti____cudaRegisterAll()':
/tmp/tmpxft_00005164_00000000-6_kernels.cudafe1.stub.c:21: undefined reference to `__cudaRegisterLinkedBinary_ff2660a9_10_kernels_cu_9b2baf5b_20846'
/usr/bin/ld: build/libfssprgcuda.a(owcf.cu.o): in function `__sti____cudaRegisterAll()':
/tmp/tmpxft_00001725_00000000-6_owcf.cudafe1.stub.c:14: undefined reference to `__cudaRegisterLinkedBinary_aa40f2b2_7_owcf_cu_617d277f'
/usr/bin/ld: build/libfssprgcuda.a(aes.cu.o): in function `__sti____cudaRegisterAll()':
/tmp/tmpxft_00001726_00000000-6_aes.cudafe1.stub.c:14: undefined reference to `__cudaRegisterLinkedBinary_fa6d3751_6_aes_cu_96e0c4dd'
collect2: error: ld returned 1 exit status
```

What is weird is that there are `_kernels_cu_`, `_owcf_cu_`, and `_aes_cu_` in the symbol names, meaning the symbols are related with our source files.

We finally find the solution in this [GitHub gist about CUDA link error with CMake].
CUDA generates some glue code as object files, in the path `build/CMakeFiles/fssprgcuda.dir` in this project, to be linked in during _device linking_.
Normally device linking is deferred until a shared library or executable is generated, so in the project, the static library has not done device linking, and the errors occur while cargo can not do device linking.
More details can be found in the [documentation of `CUDA_RESOLVE_DEVICE_SYMBOLS` of CMake].

[GitHub gist about CUDA link error with CMake]: https://gist.github.com/gavinb/c993f71cf33d2354515c4452a3f8ef30
[documentation of `CUDA_RESOLVE_DEVICE_SYMBOLS` of CMake]: https://cmake.org/cmake/help/v3.29/prop_tgt/CUDA_RESOLVE_DEVICE_SYMBOLS.html

To solve it, we do device linking in CMake by setting the following line in the CMake configuration together with the flag `CUDA_SEPARABLE_COMPILATION`:

```cmake
set_target_properties(
  fssprgcuda PROPERTIES
  CUDA_SEPARABLE_COMPILATION ON
  CUDA_RESOLVE_DEVICE_SYMBOLS ON
)
```

Now everything works fine. 🎉!
