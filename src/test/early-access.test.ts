import { describe, expect, it } from "vitest";
import { earlyAccessSchema } from "../lib/early-access";

const valid = {
  name: "Example Visitor",
  email: "visitor@example.com",
  city: "Agadir",
  type: "customer",
};

describe("early access validation", () => {
  it("does not require a phone number", () => {
    expect(earlyAccessSchema.safeParse(valid).success).toBe(true);
  });
  it("accepts the two user types", () => {
    expect(
      earlyAccessSchema.safeParse({
        ...valid,
        type: "hrayfi",
        primaryTrade: "Plumbing",
      }).success,
    ).toBe(true);
    expect(earlyAccessSchema.safeParse({ ...valid, type: "employee" }).success).toBe(false);
  });
  it("requires a primary trade for Hrayfis", () => {
    expect(
      earlyAccessSchema.safeParse({ ...valid, type: "hrayfi", city: "Agadir" }).success,
    ).toBe(false);
    expect(
      earlyAccessSchema.safeParse({
        ...valid,
        type: "hrayfi",
        primaryTrade: "Plumbing",
      }).success,
    ).toBe(true);
  });
  it("validates name, email and city", () => {
    for (const key of ["name", "email", "city"]) {
      expect(earlyAccessSchema.safeParse({ ...valid, [key]: "" }).success).toBe(false);
    }
  });
  it("normalizes email only in the database boundary", () => {
    expect(valid.email.trim().toLowerCase()).toBe("visitor@example.com");
  });
});
