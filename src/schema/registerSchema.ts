import * as yup from "yup";

export const registerSchema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  })
  .required();

export interface IRegisterFormInputs {
  username: string;
  password: string;
}

export type TRegisterFormData = yup.InferType<typeof registerSchema>;
