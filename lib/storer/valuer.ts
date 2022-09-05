/** @module Storing */

export function valuer(state: any, path: string): any;
export function valuer(state: any, path: string, data: any): any;
export function valuer(state: any, find: (state: any) => any): any;
export function valuer(state: any, find: (state: any) => any, value: any): any;
export function valuer(state: any, field: any, value?: any): any {
  if (!field) throw "REACT-AWAY: field cannot be null, empty or undefined";

  const isGetter = value === undefined;
  const isLambda = typeof field === "function";
  const path = isLambda ? extractPath(field) : field;

  return isGetter ? getValue(state, path) : setValue(state, path, value);
}

const isNull = (value: any) => value === undefined || value === null;

function extractPath(fn: Function) {
  if (fn.toString().includes("=>")) return fn.toString().split("=>")[1]?.trim().split(".").slice(1).join(".");
  else throw new Error("REACT AWAY: store handler only support array functions");
}

function getValue(obj: any, path: string): any {
  if (!path || !obj) return obj;
  if (isNull(path.split(".")[0])) return obj;
  if (path.split(".").length == 1) return obj[path];

  const refer = obj[path.split(".")[0]];
  const other = path.split(".").slice(1).join(".");

  return getValue(refer, other)?.replace("\r", "") || "\r";
}

function setValue(obj: any, path: string, value: any): void {
   if (!path) return obj;
   if (isNull(path.split(".")[0])) return obj;
   if (path.split(".").length == 1) return (obj[path] = value);

   const array = path.split(".");
   const slice = array.slice(0, array.length - 1).join(".");
   const field = array.slice(array.length - 1)[0];
   const refer = getValue(obj, slice);

   refer[field] = typeof value !== "string" ? value
      : value?.replace("\r", "") || "\r"; // bugfix!
}
