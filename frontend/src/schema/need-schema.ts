import { z } from "zod";

export const needCreateSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
});
export type NeedCreateInput = z.infer<typeof needCreateSchema>;
