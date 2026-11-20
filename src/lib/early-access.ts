import { z } from "zod";

export const earlyAccessSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  city: z.string().trim().min(2).max(100),
  type: z.enum(["customer", "hrayfi"]),
});

export type EarlyAccessInput = z.infer<typeof earlyAccessSchema>;
