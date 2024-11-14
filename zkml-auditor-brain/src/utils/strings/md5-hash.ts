import { createHash } from "node:crypto";
import { excludeFalsy } from "src/utils/arrays/exclude-falsy";

export function md5Hash(...params: Array<string | number | object | boolean | null | undefined>): string {
  return createHash("md5")
    .update(
      params
        .filter(excludeFalsy)
        .map((param) => stringifyThing(param))
        .sort()
        .join(),
    )
    .digest("hex");
}

function stringifyThing(theThing: string | number | object | boolean): string {
  switch (typeof theThing) {
    case "string":
      return theThing.trim();
    case "object":
      if (theThing instanceof Date) {
        return theThing.toISOString();
      }
      return JSON.stringify(theThing);
    case "bigint":
    case "boolean":
    case "number":
    case "function":
    case "symbol":
    default:
      return String(theThing);
  }
}
