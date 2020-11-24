title: First impression to Javascript
pub_date: 2020-11-06
upd_date: 2020-11-07
wip: true
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
And thanks to the powerful V8 engine, js is also widely used for web workers.
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

#### Webpack

Webpack compiles many files (not limited to js files) to only one emit js file.
It is may now the most popular js bundler.
It has tons of plugins for additional actions, loaders for different type of files,
and related tools like webpack-dev-server for more functions.
Webpack also has a great doc, which is worth reading.

It is important for Webpack, and may almost all other bundlers, that one emit refers to one bundler config.
If you need to output multi files, like `Electron`, give two configs and share the same parts.

#### esbuild

esbuild is a early released bundler, having no big business examples.
But its implementation is nice, which uses Go other than js to parse files.
So the performance is unbelievable in many tests.

Use a js build script, or just a line of command to bundle the code.
It is suitable for small project which only output one single js file.
As for the bad points, it does not provide extension API, so if it does cover your requirement,
maybe you can only request the features, or switch to another bundle.
Though as for me at most time, js, ts, jsx support is enough.

#### Rollup, Browserify, and others

As for Rollup, I have heard that it works great for a small js project.
But as for me, I would prefer esbuild.

As for Browserify, I have used it to use npm package `brotli`.
According to others' tests, its performance is not good.
And I also found that it has no ES6 support, and can not be easily integrated to other bundlers.
So I would recommend it.

As for others like Parcel.js, I have no use experiences, So no comment.

### Engines

#### Chrome and V8

V8 engine created by Google, integrated by Chrome, and widely used, is a powerful js engine.
Its nice performance greatly improves of the popularity of js.
And many web workers like Cloudflare workers uses V8 engine too.

#### Node.js

Created at 2009, Node.js a.k.a. node combines js with system API, allow js to be used on other environments.
Maybe its most important contribution is to allow js programmers to have a full js development toolchain
on localhost development machine.
npm provides tons of packages for js development.

A feature of npm package is that, due to a lots of small function package and basic API package,
in npm even you only want install one package, hundreds of dependencies will be installed.
Though npm can manage them, it is just amazing.

previous node only support CommonJS module system, but now,
with `*.mjs` extension or set `"type": "module"` in `package.json`, node ES6 module system support can be enabled.
Additionally, `*.cjs` is used to enable CommonJS module system when `"type": "module"` is set.

#### Deno, and others

Deno is a modern and secure runtime for js and ts that uses V8 and is built in Rust.
I have not used it, so know nothing about it.

Then I know no other js engines, or they have given me a strong impression.

### Package managers

js package managers include npm, yarn and some others.
Generally, nowadays npm and yarn are very similar.
I would prefer npm, as it is Node official package manager.

### Frontend frameworks

Frontend frameworks give a easy and flexible way to control the content rendered.
They should provide the ability to modified a element in the page.
To implement this, different frameworks give different solutions.

#### React

React is currently my favorite frontend framework.
Its solution is amazing: it maintains a virtual DOM.
Unlike the real DOM, manipulations on it costs much less.
Then React will find the chance by itself to render the virtual DOM to the real DOM.
In this way, React can filter some operations on the virtual DOM that do not need to be rerendered.

To make the users modified the virtual DOM easily, React creates the jsx language, which is a extension of js.
The file contains jsx should has the extension ".jsx" (As for Typescript jsx file, it is ".tsx").
React does force the users using jsx, but recommend using it.
Here is an example:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

const Root = <div></div>
ReactDOM.render(document.getElementById('root'), Root)
```

Use jsx to create a virtual DOM, then render it with React, it is simple and easy to understand.

##### Class component vs. function component

Like the above shows, we created the virtual DOM with jsx.
But a large virtual DOM absolutely requires being divided into many variables.
React has two ways to create a component of the virtual DOM, and allow they to be referred in other component,
forming a tree-like structure.
As I prefer to use function component, which is younger but more powerful and wonderful,
Here is a example of function component:

```jsx
const C = (props) => <div>{props.i}</div>
const Root = <div><C i={1} /></div>
```

Here also shows how to pass arguments from the parent component to the child component, via `props`.

##### React hooks

Here we need to do some operations with side effects at the specified time of rendering.
If we use React class component, we do not require React hooks, as we can put the operations in the respective methods.
But to meet the requirement, duplicated code blocks are required in some methods.
React hooks give a hook-like way, to trigger some operations when a hook is triggered.
With this way, you can only drive the events by the value update of a variable, which matches our thinking way better.
Here is an example of `useEffect` hook to update the page when the page is rendered:

```jsx
const C = (props) => {
  const {i} = props

  useEffect(() => {
    console.log(i)
  }, [i])

  return (
    <div>{i}</div>
  )
}
```

For detailed introduction, refer to the React hook part of the React doc.
The part is not long and explains the React hooks very clear.
Worth reading.

##### Redux

Redux is not a React libraries. It in fact does not rely on React.
It gives a way to manage a **single** store tree among all pages to share states.
It defines some objects:

- Actions, to present an action passed to **one** reducer;
- Reducer, consumes the action and update from a state (nullable) to another state;
- Store, stores current state.

You may not need Redux if you do not need to share information between different pages.
Redux collects all information and process it in one place, so it may break your decoupling efforts.
If you just want store some states, `useState` hook is enough at many times.

#### JQuery, pure js

JQuery is simple but powerful: gives some helpers to directly manipulate the DOM.
It uses `$` global variable with selectors, to select some elements, and applies operations on them.
I have not used JQuery as the main framework in a project.
But only a bit use experiences tell me that JQuery is easy, and completely enough for a not big project.

In fact, nowadays js has provide many DOM API that can replace some APIs in JQuery.
If you just want manipulate the DOM for several times, maybe you do not even need JQuery,
but the pure js code can already meet your requirement.

#### Vue, Angular, and others

I have learnt Vue from the start to the end, only reading some nice chapters,
so I know not much about Vue.
Vue gives a data binding way, to sync the variable values to the DOM controlled by Vue itself.
If you want to know more, refer to the Vue doc.
The nice doc of Vue is an important reason why it is popular.

As for Angular, which becomes 3 mainly-used frontend framework nowadays with React and Vue,
I have not used it completely.

There are also many other frontend frameworks, from scratch or adopted from 3 main frontend frameworks,
to meet specified requirements.

### Typescript

!!WIP!!

### WebAssembly

### Electron

### UI libraries

#### Material UI

#### Element UI, and others

### Chart libraries

#### echart.js

#### d3.js, and others
