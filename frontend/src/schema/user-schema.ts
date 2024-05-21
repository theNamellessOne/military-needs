import { z } from "zod";

export const Role = {
  SOLDIER: "soldier",
  VOLUNTEER: "volunteer",
};

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type UserLoginInput = z.infer<typeof userLoginSchema>;

export const userRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),

  name: z.string().min(2),
  contact_info: z.string().min(3),
  role: z.nativeEnum(Role),
});
export type UserRegisterInput = z.infer<typeof userLoginSchema>;
