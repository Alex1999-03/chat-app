import * as yup from "yup";

const SignInSchema = yup.object({
  email: yup
    .string("Ingresa un email.")
    .email("Ingresa un email valido.")
    .required("El campo email es requerido."),
  password: yup
  .string("Ingresa una contraseña.")
  .min(8, "La contraseña debe tener minimo 8 caracteres.")
  .required("El campo contraseña es requerido.")
});

export default SignInSchema;