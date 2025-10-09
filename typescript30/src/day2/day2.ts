// --------------- Types in TypeScript --------------------------------------------------
/*
  - What Are Type Annotations?
    - Type annotations are explicit declarations of variable or function types in TypeScript.
    - They tell the compiler what kind of data a variable, parameter, or return value should hold.

  - Why Use Type Annotations?
    - Catch errors early (before running your code)
    - Make code self-documenting
    - Improve autocompletion and IntelliSense
    - Make large codebases safer and easier to refactor
*/
// --------------------------------------------------------------------------------------

// ----- Types --------------------------------------------------------------------------
/*
  - Primitives :- 
    - string — text values.
      - Example: let name :string = "Alice";
    - number — all numeric values (ints & floats).
      - Example: let n :number = 42;
    - boolean — true / false.
      - Example: let ok :boolean = true;
  - Capitalized wrappers String, Number, Boolean — JS object wrappers; avoid; use lowercase primitives.
*/
// --------------------------------------------------------------------------------------

// ----- Arrays -------------------------------------------------------------------------
// T[] or Array<T> — array of T.
let nums: number[] = [1, 2, 3];
let words: Array<string> = ["a", "b"];
// [number] --> It is not an array type -- It looks like a tuple type with one number. Tuples are fixed-length arrays with known types per position
// --------------------------------------------------------------------------------------

// ----- any and unknown ----------------------------------------------------------------
/*
  - any :- 
    - disables type checking for that value. Use sparingly (loses safety).
  - unknown :- 
    - It represents a value of any.
    - TypeScript forces to narrow down the type of data before it can be used.
*/
// any Type Example :-
let dataAny: any;
dataAny = 10;
dataAny = "Ashish";
dataAny = { name: "Ashish" };
console.log(dataAny.toUpperCase()); // ✅ No error, but may crash at runtime!

// unknown Type Example :-
let dataUnknown: unknown;
dataUnknown = 10;
dataUnknown = "Ashish";
// console.log(dataUnknown.toUpperCase()); // ❌ Error: Object is of type 'unknown'
if (typeof dataUnknown === "string") {
  console.log(dataUnknown.toUpperCase()); // ✅ Safe
}
// --------------------------------------------------------------------------------------

// ----- Functions ----------------------------------------------------------------------

//  - Functions :-
//    - Parameter types :- \
//      - function f(x: string) {}
//      - Ensures callers pass the right types.
function greet(name: string) {
  console.log(name.toUpperCase());
}
// -------------------------------

//    - Return type :-
//      - function f(): number { return 1; } (often inferred)
//      - Return types are usually inferred, but explicit return annotations are useful for documentation or to prevent accidental changes.
function getFavorite(): number {
  return 26;
}
// -------------------------------

//    - Async / Promise :-
//      - async function f(): Promise<number> { return 1; }
async function getNumber(): Promise<number> {
  return 26;
}
// -------------------------------

//    - Contextual typing (anonymous funcs) :-
//      - TS infers parameter types from usage (e.g., arr.forEach(s => s.toUpperCase())).
const names = ["a", "b"];
names.forEach((s) => s.toUpperCase()); // `s` inferred as string
// Fewer annotations needed; TS uses the context to type parameters.
// --------------------------------------------------------------------------------------

// ----- Contextual Typing --------------------------------------------------------------
/*
  - Contextual Typing :- 
    - Contextual typing means TypeScript can infer (understand) the type of an expression based on where it appears — i.e., its context.
    - So, even if you don’t explicitly write a type, TypeScript can guess it by looking at how and where the variable or function is being used.
*/
// --------------------------------------------------------------------------------------

// ----- Object types & optional properties ---------------------------------------------
//  - Object shape :-
//    - Types that describe objects by listing properties and their types.
//    - function p(pt: { x: number; y: number }) {}
function printCoord(pt: { x: number; y: number }) {
  console.log(pt.x, " ", pt.y);
}
printCoord({ x: 3, y: 7 });
//  - Optional property :-
//    - prop?: Type → may be undefined. Must guard before use (or use ?.).
function printName(obj: { first: string; last?: string }) {
  console.log(obj.first, " ", obj.last);
}
// object
type User = {
  readonly id: number;
  name: string;
  age?: number; // optional
};

// --------------------------------------------------------------------------------------

// ----- Union types (A | B) ------------------------------------------------------------
//  - Represent "either/or" values. Example: number | string.
function printId(id: number | string) {
  /*
    - so 'id' can have either number or string as a type
    - console.log(id.toUpperCase() // error
      - as toUpperCase() does not exist on type 'number'
      - If all union members share a property/method, can be used without narrowing.
      - If not, must narrow before using members that only exist on some union members (use typeof, Array.isArray, property checks).
  */
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}

// --------------------------------------------------------------------------------------

// ----- Type aliases ------------------------------------------------------------------
/*
  - Type aliases (type Name = ...) :- 
    - Give a name to any type — object, union, primitive, etc.
    - Reuse complex types and improve readability.
*/
type ID = number | string;
type Point = {
  x: number;
  y: number;
};
function printCoord1(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord1({ x: 100, y: 100 });

// --------------------------------------------------------------------------------------

// ----- Interfaces (interface) ---------------------------------------------------------
/*
  - Interfaces (interface) :- 
    - Another way to name object shapes.
    - Key differences with type :- 
      - Interfaces can be extended and merged (declaration merging).
      - type can represent unions, primitives, and more complex constructs interfaces cannot.
      - Interfaces are usually preferred for object shapes; type is used for unions/aliases or when you need advanced type operators.
*/
interface Point1 {
  x: number;
  y: number;
}
function printCoord2(pt: Point1) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord2({ x: 100, y: 100 });

// --------------------------------------------------------------------------------------

// ----- Type assertions ----------------------------------------------------------------
/*
  - Type assertions (expr as T or <T>expr) :- 
    - Tell the compiler “treat this value as a more specific type.”
    - Important: Assertions are compile-time only — no runtime checks. If assertion is wrong, errors will occur during runtime.
    - Use when you truly know more than the compiler (e.g., DOM element with a known id). Avoid over-asserting.
*/
const el = document.getElementById("c") as HTMLCanvasElement;

// --------------------------------------------------------------------------------------

// ----- Literal types & as const -------------------------------------------------------
//  Literal Types
//    - In TypeScript, literal types allow you to specify exact values a variable can have — not just general types like string or number.
// For example :- 
let greeting: "hello" = "hello";
// Here, greeting can only ever hold the value "hello".
// If you try to assign something else:
// greeting = "hi"; // ❌ Error
// So "hello" here is a string literal type, not just a regular string.

//  Why Literal Types Exist :- 
//    - They let you restrict values to a small, known set of possibilities.
//    - For example, a function that only accepts "left", "right", or "center" as valid text alignment:

function printText(text: string, alignment: "left" | "right" | "center") {
  console.log(text, alignment);
}
printText("Hello", "left");   // ✅ OK
// printText("Hi", "centre");    // ❌ Error ("centre" not allowed)
/*
  - Here:
    - "left" | "right" | "center" is called a union of literal types.
    - It makes the function safer by only allowing specific string values.
  - Literal Types Can Be Strings, Numbers, or Booleans
    - TypeScript supports three kinds of literal types :- 
      - String	"GET", "POST", "left"	Often used for command-like values
      - Number	0, 1, -1	Often used for comparison or status codes
      - Boolean	true, false	The type boolean is actually `true
*/

// Example of numeric literal types:
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
//  Literal Types with Other Types (Unions)
//    - Literal types get even more useful when combined with other normal types.
interface Options1 {
  width: number;
}
function configure(value: Options1 | "auto") {
  console.log(value);
}
configure({ width: 100 }); // ✅ OK
configure("auto");         // ✅ OK
// configure("automatic");    // ❌ Error ("automatic" not allowed)

// Here, the function only accepts an object of type Options1 or the exact string "auto".
// Nothing else is valid.

//  Literal Inference — How TypeScript Infers Literal Types
//    - By default, when you create a variable or object, TypeScript assumes that its values might change later.

const obj1 = { counter: 0 };
if (true) {
  obj1.counter = 1;
}
/*
  - “Since obj.counter might change from 0 to something else later, I’ll give it a general type — number, not 0.”
  - That’s why obj.counter is inferred as:
  - const obj: { counter: number }
  - not { counter: 0 }.
*/

// The Same Thing Happens With Strings
declare function handleRequest(url: string, method: "GET" | "POST"): void;
const req1 = { url: "https://example.com", method: "GET" };
// handleRequest(req1.url, req1.method);
/*
  - You might expect this to work — but it gives an error:
  - Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'
  - Why?
    - TypeScript infers req.method as a string, not "GET".
    - Because it assumes req.method could be changed later to any string (like "DELETE").
*/

// Fixing Literal Inference

// There are three main ways to tell TypeScript,
// “No, this value should stay fixed to its literal type.”

// Fix 1 — Type Assertion (on property)
const req2 = { url: "https://example.com", method: "GET" as "GET" };
handleRequest(req2.url, req2.method);
// Here, req.method is now typed as "GET", not string.
// “I want req.method to always be the literal value "GET".”

// Fix 2 — Type Assertion (at call site)
handleRequest(req2.url, req2.method as "GET");
// “I know for sure that req2.method currently has the value "GET", even if its general type is string.”
// This doesn’t make the variable safer — it just temporarily asserts a value.

// Fix 3 — Using as const (Best & Most Common)
const req3 = { url: "https://example.com", method: "GET" } as const;
handleRequest(req3.url, req3.method);
/*
  - as const tells TypeScript :- 
    - “Freeze this entire object — make every property a literal, and mark them as readonly.”
      - So now the type becomes :- 
const req: {
  readonly url: "https://example.com";
  readonly method: "GET";
}
      - You can’t reassign req.method.
      - TypeScript knows it’s literally "GET".
      - Safe and simple.
*/
declare function handleRequest(url: string, method: "GET" | "POST"): void;

// Regular object → Error
const reqNew1 = { url: "https://example.com", method: "GET" };
// handleRequest(reqNew1.url, reqNew1.method); // ❌ method inferred as string

// Fix 1: Single field literal
const reqNew2 = { url: "https://example.com", method: "GET" as "GET" };
handleRequest(reqNew2.url, reqNew2.method); // ✅

// Fix 2: Call-site assertion
const reqNew3 = { url: "https://example.com", method: "GET" };
handleRequest(reqNew3.url, reqNew3.method as "GET"); // ✅

// Fix 3: as const — best & cleanest
const reqNew4 = { url: "https://example.com", method: "GET" } as const;
handleRequest(reqNew4.url, reqNew4.method); // ✅

// --------------------------------------------------------------------------------------

// ----- null and undefined -------------------------------------------------------------
/*
  - In JavaScript, there are two special values that represent “nothing” or “no value”.
  - undefined -	A variable has been declared but not assigned a value yet.
  - null - A variable has been assigned an explicit “no value”.
*/
let a1;
console.log(a1); // undefined
let b = null;
console.log(b); // null
/*
  - TypeScript also has null and undefined types
  - TypeScript gives each of them their own type:
    - Type null → only has the value null
    - Type undefined → only has the value undefined
  - However, how these behave depends on the compiler setting called strictNullChecks.
  - strictNullChecks Setting
    - This setting decides whether TypeScript should force you to handle null and undefined safely.
  - strictNullChecks OFF (unsafe mode)
    - When strictNullChecks is off:
      - null and undefined can be assigned to any type.
      - TypeScript doesn’t warn you when you try to use them.
*/
let firstName: string = "Ashish";
// firstName = null;        // ✅ Allowed
// firstName = undefined;   // ✅ Allowed
console.log(firstName.toUpperCase()); // ❌ Might crash at runtime
//  - Here, TypeScript won’t complain — but this can cause runtime errors like - “Cannot read properties of null”. That’s why this mode is not recommended.
/*
  - strictNullChecks ON (safe mode)
    - When strictNullChecks is on :- 
      - You must explicitly handle null or undefined before using a value.
      - TypeScript won’t let you call methods or access properties on a possibly-null value.
*/
function doSomething(x: string | null) {
  if (x === null) {
    console.log("Nothing to do");
  } else {
    console.log("Hello, " + x.toUpperCase()); // ✅ Safe now
  }
}
/*
  - The parameter x can be either string or null.
  - TypeScript forces you to check for null before using it.
  - If you don’t check, you’ll get an error.
  - Type Narrowing for Null Checks
  - TypeScript can narrow a type when you check it.
*/
function printLength(str: string | null) {
  if (str !== null) {
    // Here, str is now known to be string
    console.log(str.length);
  }
}
/*
  - Inside the if block, str’s type automatically becomes just string.
  - Non-null Assertion Operator (!)
  - (TypeScript’s “I know better” operator)
  - Sometimes, you’re 100% sure a value is not null or undefined,
  - but TypeScript doesn’t know that.
  - In those cases, you can use ! after the variable to tell TypeScript:
  - “Trust me — this value is not null or undefined.”
*/
function liveDangerously(x?: number | null) {
  console.log(x!.toFixed());
}
/*
  - x! removes null and undefined from the type.
  - TypeScript treats it as a number.
  - But be careful:
  - If x actually is null or undefined at runtime, your program will crash.
  - So use ! only when you’re absolutely sure it’s safe.
*/

// --------------------------------------------------------------------------------------

// ----- Other useful types -------------------------------------------------------------
/*
  - enum :- 
    - Adds named runtime constants. Example:
    - Exampla :- enum Direction { Up, Down, Left, Right }
    - Produces runtime code; prefer literal unions for simpler output unless runtime enum is needed.
  - bigint - very large integers, e.g., 100n or BigInt(100). (ES2020+)
  - symbol - unique values (e.g., const s = Symbol("id")).
  - void - no meaningful return (e.g., function f(): void {}).
*/

// --------------------------------------------------------------------------------------

// ----- Practical tips / pitfalls ------------------------------------------------------
/*
  - Prefer string/number/boolean (lowercase).
  - Avoid any — prefer unknown or proper types.
  - Enable strict, strictNullChecks, and noImplicitAny for safety.
  - Use '@types/*' packages or lib in tsconfig to expose globals (e.g., Node or DOM).
  - Use as const to keep literal inference when needed.
  - Narrow unions before using member-specific methods.
  - Type assertions don’t check at runtime — they can introduce runtime errors if wrong.
*/

// --------------------------------------------------------------------------------------

// ----- Quick cheat-sheet (most common options) ----------------------------------------
/*
  - T[] or Array<T> — arrays
  - A | B — union
  - type Name = ... — alias
  - interface Name {} — object shape (extendable)
  - expr as T — assertion
  - ? — optional property
  - ! — non-null assertion
  - Promise<T> — async return type
*/
// --------------------------------------------------------------------------------------

// ----- Tuple --------------------------------------------------------------------------
/*
  - Tuple
    - In TypeScript, a tuple is a fixed-length array where each element has a specific type and position.-
    - Think of it as an array with a fixed structure — you know exactly how many items it has, and what type each one is.
    - A tuple is like an array with a fixed shape — each element has a defined type and order.
    - Use it when :- 
      - You need a group of different types together
      - You want to return multiple values from a function
      - You want predictable positions and type safety
    - Example :- 
      let person: [string, number] = ["Ashish", 25];
      - Here :- 
        - The first value must be a string ("Ashish")
        - The second value must be a number (25)
      - If you change the order or type:
        - person = [25, "Ashish"]; // ❌ Error (wrong order)
        - person = ["Ashish"];     // ❌ Error (missing item)
      - So, a tuple defines both the type and the order of elements.
*/
let colors: string[] = ["red", "green", "blue"];  // all strings
// Basic tuple
let user: [string, number] = ["Ashish", 25];      // string + number
// Optional
let data: [string, number?] = ["Hello"];
// Rest
let result: [boolean, ...string[]] = [true, "OK", "Done"];
// Readonly literal
const config = ["GET", 200] as const;
// --------------------------------------------------------------------------------------