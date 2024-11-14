import { calculateDbIndexName } from "src/database/utils/calculate-db-index-name";

describe("calculateDbIndexName", () => {
  it("should calculate various names", () => {
    expect(calculateDbIndexName({ name: 1 })).toEqual("name_1");
    expect(calculateDbIndexName({ name: 1, age: -1 })).toEqual("name_1_age_-1");
    expect(calculateDbIndexName({ name: 1, age: -1, weight: "text" })).toEqual("name_1_age_-1_weight_text");
  });
});
