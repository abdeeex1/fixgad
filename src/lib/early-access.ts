import { z } from "zod";

export const earlyAccessSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().toLowerCase().max(255),
  city: z.string().trim().min(2).max(100),
  type: z.enum(["customer", "hrayfi"]),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  preferredLanguage: z.enum(["en", "fr", "ar"]).optional(),
  primaryTrade: z.string().trim().max(100).optional(),
  additionalTrades: z.array(z.string().trim().min(1).max(100)).max(20).optional(),
  experienceYears: z.coerce.number().int().min(0).max(60).optional(),
  serviceDescription: z.string().trim().max(1000).optional(),
  customProfession: z.string().trim().max(100).optional(),
}).refine(
  (data) =>
    data.type !== "hrayfi" ||
    (Boolean(data.primaryTrade) &&
      (data.primaryTrade !== "Other" || Boolean(data.customProfession))),
  { message: "Please select a primary profession", path: ["primaryTrade"] },
);

export type EarlyAccessInput = z.infer<typeof earlyAccessSchema>;
