import { IndexSpecification } from "mongodb";

export function calculateDbIndexName(spec: IndexSpecification): string {
  return Object.keys(spec)
    .reduce<string[]>((sum, key) => {
      sum.push(`${key}_${(spec as never)[key]}`);
      return sum;
    }, [])
    .join("_");
}
