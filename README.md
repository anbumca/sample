### Difference between debounce and throttle

So, continuous user actions can significantly delay the callback function's execution if we use debounce. On the other hand, throttle uses the time delay to execute the callback function at regular intervals until the event trigger is active.

### What is Throttling in JavaScript? 

Throttling implies limiting the number of times a function gets called in a certain time period. It will prohibit a function from executing if we have invoked it “recently.” Throttling also guarantees that a function runs at a consistent rate.

### What is debounce vs throttle?
Throttle fires throughout, debounce only fires at the end. Example: If you're scrolling, throttle will slowly call your function while you scroll (every X milliseconds). Debounce will wait until after you're done scrolling to call your function.  
### What is an example throttle function?
Throttling is a technique in which, no matter how many times the user fires the event, the attached function will be executed only once in a given time interval. For instance, when a user clicks on a button, a helloWorld function is executed which prints Hello, world on the console.
### What is debounce vs throttle vs delay?
While both are used to limit the number of times a function executes, throttling delays execution, thus reducing notifications of an event that fires multiple times. On the other hand, debouncing bunches together a series of calls into a single call to a function, ensuring one notification for multiple fires.
### What is REST API throttling?
API throttling is the process of limiting the number of API requests a user can make in a certain period. An application programming interface (API) functions as a gateway between a user and a software application.
### Export and Import
Export and import directives have several syntax variants.

In the previous article we saw a simple use, now let’s explore more examples.

Export before declarations
We can label any declaration as exported by placing export before it, be it a variable, function or a class.

For instance, here all exports are valid:
```js
// export an array
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export a constant
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
export class User {
  constructor(name) {
    this.name = name;
  }
}
```
```js
No semicolons after export class/function
Please note that export before a class or a function does not make it a function expression. It’s still a function declaration, albeit exported.

Most JavaScript style guides don’t recommend semicolons after function and class declarations.

That’s why there’s no need for a semicolon at the end of export class and export function:

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}  // no ; at the end
```

# Export apart from declarations
Also, we can put export separately.

Here we first declare, and then export:
```js
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export {sayHi, sayBye}; // a list of exported variables
```
…Or, technically we could put export above functions as well.

### Import *
Usually, we put a list of what to import in curly braces import {...}, like this:
```js
// 📁 main.js
import {sayHi, sayBye} from './say.js';

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
But if there’s a lot to import, we can import everything as an object using import * as <obj>, for instance:

// 📁 main.js
import * as say from './say.js';

say.sayHi('John');
say.sayBye('John');
```
At first sight, “import everything” seems such a cool thing, short to write, why should we ever explicitly list what we need to import?

Well, there are few reasons.

Explicitly listing what to import gives shorter names: sayHi() instead of say.sayHi().
Explicit list of imports gives better overview of the code structure: what is used and where. It makes code support and refactoring easier.
Don’t be afraid to import too much
Modern build tools, such as webpack and others, bundle modules together and optimize them to speedup loading. They also removed unused imports.

For instance, if you import * as library from a huge code library, and then use only few methods, then unused ones will not be included into the optimzed bundle.

### Import “as”
We can also use as to import under different names.

For instance, let’s import sayHi into the local variable hi for brevity, and import sayBye as bye:
```js
// 📁 main.js
import {sayHi as hi, sayBye as bye} from './say.js';

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```
### Export “as”
The similar syntax exists for export.

Let’s export functions as hi and bye:
```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
Now hi and bye are official names for outsiders, to be used in imports:

// 📁 main.js
import * as say from './say.js';

say.hi('John'); // Hello, John!
say.bye('John'); // Bye, John!
```
### Export default
In practice, there are mainly two kinds of modules.

Modules that contain a library, pack of functions, like say.js above.
Modules that declare a single entity, e.g. a module user.js exports only class User.
Mostly, the second approach is preferred, so that every “thing” resides in its own module.

Naturally, that requires a lot of files, as everything wants its own module, but that’s not a problem at all. Actually, code navigation becomes easier if files are well-named and structured into folders.

Modules provide a special export default (“the default export”) syntax to make the “one thing per module” way look better.

Put export default before the entity to export:
```js
// 📁 user.js
export default class User { // just add "default"
  constructor(name) {
    this.name = name;
  }
}
```
There may be only one export default per file.

…And then import it without curly braces:
```js
// 📁 main.js
import User from './user.js'; // not {User}, just User

new User('John');
```
Imports without curly braces look nicer. A common mistake when starting to use modules is to forget curly braces at all. So, remember, import needs curly braces for named exports and doesn’t need them for the default one.

Named export	Default export
export class User {...}	export default class User {...}
import {User} from ...	import User from ...
Technically, we may have both default and named exports in a single module, but in practice people usually don’t mix them. A module has either named exports or the default one.

As there may be at most one default export per file, the exported entity may have no name.

For instance, these are all perfectly valid default exports:
```js
export default class { // no class name
  constructor() { ... }
}
export default function(user) { // no function name
  alert(`Hello, ${user}!`);
}
// export a single value, without making a variable
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

Not giving a name is fine, because there is only one export default per file, so import without curly braces knows what to import.

Without default, such an export would give an error:
```js
export class { // Error! (non-default export needs a name)
  constructor() {}
}
```
The “default” name
In some situations the default keyword is used to reference the default export.

For example, to export a function separately from its definition:
```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// same as if we added "export default" before the function
export {sayHi as default};
```
Or, another situation, let’s say a module user.js exports one main “default” thing, and a few named ones (rarely the case, but it happens):
```js
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```
Here’s how to import the default export along with a named one:
```js
// 📁 main.js
import {default as User, sayHi} from './user.js';

new User('John');
```
And, finally, if importing everything * as an object, then the default property is exactly the default export:
```js
// 📁 main.js
import * as user from './user.js';

let User = user.default; // the default export
new User('John');
```
A word against default exports
Named exports are explicit. They exactly name what they import, so we have that information from them; that’s a good thing.

Named exports force us to use exactly the right name to import:
```js
import {User} from './user.js';
// import {MyUser} won't work, the name must be {User}
```
…While for a default export, we always choose the name when importing:
```js
import User from './user.js'; // works
import MyUser from './user.js'; // works too
// could be import Anything... and it'll still work
```
So team members may use different names to import the same thing, and that’s not good.

Usually, to avoid that and keep the code consistent, there’s a rule that imported variables should correspond to file names, e.g:
```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
``` 
...
Still, some teams consider it a serious drawback of default exports. So they prefer to always use named exports. Even if only a single thing is exported, it’s still exported under a name, without default.

That also makes re-export (see below) a little bit easier.

### Re-export
“Re-export” syntax export ... from ... allows to import things and immediately export them (possibly under another name), like this:
```js
export {sayHi} from './say.js'; // re-export sayHi

export {default as User} from './user.js'; // re-export default
```
Why would that be needed? Let’s see a practical use case.

Imagine, we’re writing a “package”: a folder with a lot of modules, with some of the functionality exported outside (tools like NPM allow us to publish and distribute such packages, but we don’t have to use them), and many modules are just “helpers”, for internal use in other package modules.

The file structure could be like this:
```js
auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
```
...
We’d like to expose the package functionality via a single entry point.

In other words, a person who would like to use our package, should import only from the “main file” auth/index.js.

Like this:

import {login, logout} from 'auth/index.js'
The “main file”, auth/index.js exports all the functionality that we’d like to provide in our package.

The idea is that outsiders, other programmers who use our package, should not meddle with its internal structure, search for files inside our package folder. We export only what’s necessary in auth/index.js and keep the rest hidden from prying eyes.

As the actual exported functionality is scattered among the package, we can import it into auth/index.js and export from it:
```js
// 📁 auth/index.js

// import login/logout and immediately export them
import {login, logout} from './helpers.js';
export {login, logout};

// import default as User and export it
import User from './user.js';
export {User};
```
...
Now users of our package can import {login} from "auth/index.js".

The syntax export ... from ... is just a shorter notation for such import-export:
```js
// 📁 auth/index.js
// re-export login/logout
export {login, logout} from './helpers.js';

// re-export the default export as User
export {default as User} from './user.js';
```
...
The notable difference of export ... from compared to import/export is that re-exported modules aren’t available in the current file. So inside the above example of auth/index.js we can’t use re-exported login/logout functions.

Re-exporting the default export
The default export needs separate handling when re-exporting.

Let’s say we have user.js with the export default class User and would like to re-export it:
```js
// 📁 user.js
export default class User {
  // ...
}
```
We can come across two problems with it:

export User from './user.js' won’t work. That would lead to a syntax error.

To re-export the default export, we have to write export {default as User}, as in the example above.

export * from './user.js' re-exports only named exports, but ignores the default one.

If we’d like to re-export both named and default exports, then two statements are needed:

export * from './user.js'; // to re-export named exports
export {default} from './user.js'; // to re-export the default export
Such oddities of re-exporting a default export are one of the reasons why some developers don’t like default exports and prefer named ones.

# Summary
Here are all types of export that we covered in this and previous articles.

You can check yourself by reading them and recalling what they mean:
```js
Before declaration of a class/function/…:
export [default] class/function/variable ...
Standalone export:
export {x [as y], ...}.
Re-export:
export {x [as y], ...} from "module"
export * from "module" (doesn’t re-export default).
export {default [as y]} from "module" (re-export default).
Import:

Importing named exports:
import {x [as y], ...} from "module"
Importing the default export:
import x from "module"
import {default as x} from "module"
Import all:
import * as obj from "module"
Import the module (its code runs), but do not assign any of its exports to variables:
import "module"
```
We can put import/export statements at the top or at the bottom of a script, that doesn’t matter.

So, technically this code is fine:
```js
sayHi();
```
// ...

import {sayHi} from './say.js'; // import at the end of the file
In practice imports are usually at the start of the file, but that’s only for more convenience.

Please note that import/export statements don’t work if inside {...}.

A conditional import, like this, won’t work:
```js
if (something) {
  import {sayHi} from "./say.js"; // Error: import must be at top level
}
```
…But what if we really need to import something conditionally? Or at the right time? Like, load a module upon request, when it’s really needed?


# Native JavaScript Modules
Modules in JavaScript use the import and export keywords:

import: Used to read code exported from another module.
export: Used to provide code to other modules.
To demonstrate how to use this, update your functions.js file to be a module and export the functions. You will add export in front of each function, which will make them available to any other module.

Add the following highlighted code to your file:
```js
functions.js
export function sum(x, y) {
  return x + y
}

export function difference(x, y) {
  return x - y
}

export function product(x, y) {
  return x * y
}

export function quotient(x, y) {
  return x / y
}
```
Now, in script.js, you will use import to retrieve the code from the functions.js module at the top of the file.

Note: import must always be at the top of the file before any other code, and it is also necessary to include the relative path (./ in this case).

Add the following highlighted code to script.js:

```js
import { sum, difference, product, quotient } from './functions.js'

const x = 10
const y = 5

document.getElementById('x').textContent = x
document.getElementById('y').textContent = y

document.getElementById('addition').textContent = sum(x, y)
document.getElementById('subtraction').textContent = difference(x, y)
document.getElementById('multiplication').textContent = product(x, y)
document.getElementById('division').textContent = quotient(x, y)
```

Notice that individual functions are imported by naming them in curly braces.

In order to ensure this code gets loaded as a module and not a regular script, add type="module" to the script tags in index.html. Any code that uses import or export must use this attribute:
```js
index.html
...
<script type="module" src="functions.js"></script>
<script type="module" src="script.js"></script>
```

# Named Exports
As demonstrated earlier, using the export syntax will allow you to individually import values that have been exported by their name. For example, take this simplified version of functions.js:
```js
functions.js
export function sum() {}
export function difference() {}
```
This would let you import sum and difference by name using curly braces:
```js
script.js
import { sum, difference } from './functions.js'
```
It is also possible to use an alias to rename the function. You might do this to avoid naming conflicts within the same module. In this example, sum will be renamed to add and difference will be renamed to subtract.
```js
script.js
import {
  sum as add,
  difference as subtract
} from './functions.js'

add(1, 2) // 3
```
Calling add() here will yield the result of the sum() function.

Using the * syntax, you can import the contents of the entire module into one object. In this case, sum and difference will become methods on the mathFunctions object.
```js
script.js
import * as mathFunctions from './functions.js'

mathFunctions.sum(1, 2) // 3
mathFunctions.difference(10, 3) // 7
```
Primitive values, function expressions and definitions, asynchronous functions, classes, and instantiated classes can all be exported, as long as they have an identifier:
```
// Primitive values
export const number = 100
export const string = 'string'
export const undef = undefined
export const empty = null
export const obj = { name: 'Homer' }
export const array = ['Bart', 'Lisa', 'Maggie']

// Function expression
export const sum = (x, y) => x + y

// Function definition
export function difference(x, y) {
  return x - y
}

// Asynchronous function
export async function getBooks() {}

// Class
export class Book {
  constructor(name, author) {
    this.name = name
    this.author = author
  }
}

// Instantiated class
export const book = new Book('Lord of the Rings', 'J. R. R. Tolkien')
```
All of these exports can be successfully imported. The other type of export that you will explore in the next section is known as a default export.

# Default Exports
In the previous examples, you exported multiple named exports and imported them individually or as one object with each export as a method on the object. Modules can also contain a default export, using the default keyword. A default export will not be imported with curly brackets, but will be directly imported into a named identifier.

For example, take the following contents for the functions.js file:
```js
functions.js
export default function sum(x, y) {
  return x + y
}
```
In the script.js file, you could import the default function as sum with the following:
```js
script.js
import sum from './functions.js'

sum(1, 2) // 3
```
This can be dangerous, as there are no restrictions on what you can name a default export during the import. In this example, the default function is imported as difference although it is actually the sum function:
```js
script.js
import difference from './functions.js'

difference(1, 2) // 3
```
For this reason, it is often preferred to use named exports. Unlike named exports, default exports do not require an identifier—a primitive value by itself or anonymous function can be used as a default export. Following is an example of an object used as a default export:
```js
functions.js
export default {
  name: 'Lord of the Rings',
  author: 'J. R. R. Tolkien',
}
```
You could import this as book with the following:
```js
script.js
import book from './functions.js'
Similarly, the following example demonstrates exporting an anonymous arrow function as the default export:

functions.js
export default () => 'This function is anonymous'
```
This could be imported with the following script.js:
```js
script.js
import anonymousFunction from './functions.js'
```
Named exports and default exports can be used alongside each other, as in this module that exports two named values and a default value:
```
functions.js
export const length = 10
export const width = 5

export default function perimeter(x, y) {
  return 2 * (x + y)
}
```
You could import these variables and the default function with the following:
```js
script.js
import calculatePerimeter, { length, width } from './functions.js'

calculatePerimeter(length, width) // 30
```
Now the default value and named values are both available to the script.

