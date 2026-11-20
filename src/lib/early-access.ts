import { z } from 'zod';
export const earlyAccessSchema = z.object({
 name:z.string().trim().min(2).max(100),
 email:z.string().trim().email().max(255),
 city:z.string().trim().min(2).max(100),
 type:z.enum(['customer','hrayfi']),
});
export type EarlyAccessInput = z.infer<typeof earlyAccessSchema>;
// Future integration boundary. No network request, storage, or success claim is made.
export function prepareEarlyAccess(input: unknown) {
 return { data: earlyAccessSchema.parse(input), status: 'not-connected' as const };
}
