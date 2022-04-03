import * as Yup from "yup";

const emailValidationMessage = "wrong email type";
const phoneValidationMessage = "wrong phone number type";

const phoneValidation = Yup.string()
  .min(10, phoneValidationMessage)
  .max(14, phoneValidationMessage);

const containsString = (str) => /\D/.test(str);
const containsDigit = (str) => /\d/.test(str);

export const userFormSchema = Yup.object({
  userName: Yup.string().required("required"),
  email: Yup.string().email(emailValidationMessage).required("required"),
  phoneNumber: phoneValidation.required("required"),
  password: Yup.string()
    .required("required")
    .test({
      message: "password invalid",
      test: (str) =>
        str?.length > 7 && containsString(str) && containsDigit(str)
    }),
  confirmPassword: Yup.string()
    .required("required")
    .oneOf(
      [Yup.ref("password"), null],
      () => "password confirm must match rule"
    ),
  address: Yup.string().nullable()
});
