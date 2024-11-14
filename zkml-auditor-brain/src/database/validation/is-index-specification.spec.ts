import { isIndexSpecification } from "src/database/validation/is-index-specification";

describe("isIndexSpecification", () => {
  it("should detect a single index", () => {
    expect(isIndexSpecification({ name: 1, age: -1 })).toBeTruthy();
  });
  it("should detect a split spec and options", () => {
    expect(
      isIndexSpecification({
        spec: { name: 1, age: -1 },
        options: { background: true },
      }),
    ).toBeFalsy();
  });
});
