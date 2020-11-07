title: First impression to Javascript
id: 7
---
## Introduction

The post is not going to explain the details of Javascript.
There are tons of resources, with much better explanations than the ones I can make.
So the post is like a checklist, to tell a newbie what Javascript has,
what his/her should read the respective doc to understand, and what his/her should be careful about.

## Syntax

Javascript, a.k.a. js, created at 1995 by Brendan Eich with only 10 days, has much weird syntax:

- No `int` but `number`, which is basically float;
- `function` has a weird `this`, which can refer to something unexpected;
- No `class`, the later `class` keyword is a sugar of `function`;
- ...

The compliant to js syntax is a lot. You can find them in almost all programming language topic.

js has little special syntax at a glance.
`let` and `const` to declare variables, `function` to declare functions, `for` and `while` to loop, `switch` to branch,
passing arguments by ref...
If you have coded Python or even C, you can easily adapt to js.
[MDN web docs](https://developer.mozilla.org/en-US/) is a nice place to lookup detailed js language specifications.
Some syntax which needs extra explanations is:

### Module system

To share among js files, the module system defines what a js file exports and can imports.

The early implementation is `CommonJS`:

```js
// a.js
const i = 1
module.export = i

// b.js
const a = require('a.js')
const i = a.i
```

, and many `AMD`-based module system.

The later ES6 standard defines an `export/import` module system, known as ES6 module system:

```js
// a.js
export const i = 1
const j = 0
export default j

// b.js
import j, {i} from 'a.js'
```

Loading the js script with HTML `<script>` tag, and put the result into globals, or mount to a global like `window`,
is also a not only possible but widely-used way.
For example, load JQuery with `<script>` and use `$`, load highlight.js and use `hljs`.
As for user-created js script, the later way may be a better one.
For example, mount your output to `window` global variable.

### `this`

js `function` has a `this` variable in the function body, referring to something that you may not expect.
In a short, only use `this` in class declaration to refer to the instance.
One exception is that the doc of a library asks you to use `this`, like [Mocha does](https://mochajs.org/#arrow-functions).

### Arrow function

Arrow function has no `this`, making it a little safer.
It is also easy to declare, so is widely used.
I would prefer to declare all required functions to arrow function, except class method:

```js
class A {
  f() {}
  f = () => {} // Bad
}
```

or the doc asking me not to, like [Mocha does](https://mochajs.org/#arrow-functions) again.
A example of arrow function is:

```js
const f0 = () => console.log('')
f0()
const f1 = i => i + 1
console.log(f1(1))
const f2 = (i, j) => {console.log(i, j)}
f2(1, 2)
```

### Variable declaration

In a short, `const` > `let` > `var`, and `var` is rarely used.
Here `const` like C, is not so "const". You can even call a method of a const, so long as you does not reassign it.

### Prototype

It is like the runtime type system in js.
When you call `''.repeat(1)`, you are in fact calling `string.prototype.repeat()`.
Actually I know little about prototype, so if you want to know more, refer to the doc.

## Applications

js is created to make dynamic contents for browsers.
They are delivered from the server to the client, and run by the client.
As Node.js is created at 2009, now js can also be used to write any software, including backend.
And thanks to the powerful v8 engine, js is also widely used for web workers.
Due to the applications, there are some problems:

### Size

As js scripts are transferred, size matters.
Generally the entrypoint sync-required js script should not exceed 200 kB, suggested by Webpack.
To meet it, you can trim unneeded spaces and remove unused variables with other things in the code,
or even gzip compress js files.
The size requirement is not usually seen in other programming languages.

### Compatibility

js development is fast, to meet greatly increasing requirements.
Backward compatibility is provided, but the developers want to use the new syntax, to easy the development.
Thanks to Babel, a great project to compile newer standard js to older standard js,
the js programmers can write the code that contains standards which have been implemented by some js engines.
Nowadays, we can say ES6 is widely supported.
[Can I Use](https://caniuse.com/) is a great website to lookup the detailed support status.

## Tools

Tools help a programming language to promote, and can even affect the development of the language.
As a popular programming language, js has tons of tools with various catalogs.

### Bundlers

As we have said, the size of js matters.
The bundlers give a easy way to compile a lot of js source files to only one emit file,
greatly reducing the size with other optimizations.
As them implement parsing a js file, to correctly merge the js source files,
them may also define some js language extensions, to easy the usage.

!!WIP!!

#### Webpack

#### esbuild

#### Rollup, Browserify, and others

### Engines

#### Chrome and v8

#### Node.js

#### Deno, and others

### Package managers

### Frontend frameworks

#### React

#### Vue, Angular, and others

### Typescript
