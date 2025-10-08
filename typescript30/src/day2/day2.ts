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
// Literal Types :- Types that represent exact values like 'alignment: "left" | "right" | "center"'
function printText(s: string, alignment: "left" | "right" | "center") {
  // variable 'alignment' can only have these values "left" | "right" | "center"
}
printText("Hello, world", "left");
// printText("G'day, mate", "centre"); // Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.

function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
// Here to the return can only be -1 or 0 or 1 anything else it will give error

interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
// configure("automatic");

// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
