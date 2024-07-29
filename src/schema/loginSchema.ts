import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export interface ILoginFormInputs {
  username: string;
  password: string;
}

export type TLoginFormData = yup.InferType<typeof loginSchema>;
