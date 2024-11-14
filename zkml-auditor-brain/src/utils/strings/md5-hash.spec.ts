import { md5Hash } from "src/utils/strings/md5-hash";

describe("md5Hash", () => {
  it("should hash primitives", () => {
    expect(md5Hash(1)).toMatchInlineSnapshot(`"c4ca4238a0b923820dcc509a6f75849b"`);
    expect(md5Hash("2")).toMatchInlineSnapshot(`"c81e728d9d4c2f636f067f89cc14862c"`);
    expect(md5Hash("three")).toMatchInlineSnapshot(`"35d6d33467aae9a2e3dccb4b6b027878"`);
  });

  it("should ignore undefined", () => {
    expect(md5Hash(1, undefined)).toEqual(md5Hash(1));
    expect(md5Hash(undefined)).toEqual(md5Hash(""));
  });

  it("should ignore null", () => {
    expect(md5Hash(1, null)).toEqual(md5Hash(1));
    expect(md5Hash(null)).toEqual(md5Hash(""));
  });

  it("should trim strings", () => {
    expect(md5Hash("a   ")).toEqual(md5Hash("a"));
    expect(md5Hash("    a")).toEqual(md5Hash("a"));
  });

  it("should sort inputs", () => {
    expect(md5Hash("a", "b", "c")).toEqual(md5Hash("a", "c", "b"));
    expect(md5Hash(3, 2, 1)).toEqual(md5Hash(1, 2, 3));
  });

  it("should support objects and arrays", () => {
    expect(md5Hash(new Date(2000))).toMatchInlineSnapshot(`"a9396d890d92d683f6e88e8d2fc4cc58"`);
    expect(md5Hash(1, [2, 3], 4)).toMatchInlineSnapshot(`"b168958a1dd2885236fe3236f7d63dbe"`);
    expect(md5Hash({ 5: 6, 7: 8 })).toMatchInlineSnapshot(`"701387b02017f71d3020a62696233be1"`);
  });
});
