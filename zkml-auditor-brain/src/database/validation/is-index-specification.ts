import { CreateIndexesOptions, IndexSpecification } from "mongodb";

export function isIndexSpecification(
  val: IndexSpecification | { spec: IndexSpecification; options: CreateIndexesOptions },
): val is IndexSpecification {
  const loose = val as never;
  return !(loose["spec"] && loose["options"]);
}
