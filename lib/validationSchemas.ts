import { z } from "zod";

export const SignUpFormSchema = z
  .object({
    name: z
      .string()
      .min(3, "Required Min. 3 Characters")
      .max(50, "Max 50 Characters"),
    email: z.string().email(),
    password: z.string().min(8, "Required Min. 8 Characters"),
    phone: z
      .string()
      .length(10, { message: "Phone number must be exactly 10 digits." })
      .refine((val) => /^\d+$/.test(val), {
        message: "Phone number must contain only digits.",
      })
      .transform((val) => Number(val)),
    adhaarCardNo: z
      .string()
      .length(12, { message: "Adhaar Card No. must be exactly 12 digits." })
      .refine((val) => /^\d+$/.test(val), {
        message: "Adhaar Card No. must contain only digits.",
      }),
    acceptTerms: z.boolean().default(false),
  })
  .refine((data) => data.acceptTerms, {
    message: "You need to accept Terms, Conditions and Policies",
  });

  export const SignUpFormDriverSchema = z
  .object({
    name: z
      .string()
      .min(3, "Required Min. 3 Characters")
      .max(50, "Max 50 Characters"),
    email: z.string().email(),
    password: z.string().min(8, "Required Min. 8 Characters"),
    phone: z
      .string()
      .length(10, { message: "Phone number must be exactly 10 digits." })
      .refine((val) => /^\d+$/.test(val), {
        message: "Phone number must contain only digits.",
      })
      .transform((val) => Number(val)),
    adhaarCardNo: z
      .string()
      .length(12, { message: "Adhaar Card No. must be exactly 12 digits." })
      .refine((val) => /^\d+$/.test(val), {
        message: "Adhaar Card No. must contain only digits.",
      }),
    acceptTerms: z.boolean().default(false),
  })
  .refine((data) => data.acceptTerms, {
    message: "You need to accept Terms, Conditions and Policies",
  });


export const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Required Min. 8 Characters"),
})

