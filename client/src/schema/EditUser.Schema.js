import * as yup from "yup";

const EditUserSchema = yup.object({
  firstName: yup
    .string("Ingresa tu nombre.")
    .matches(/^[A-za-z\u00C0-\u00FF]+$/, { message: "El nombre solo debe contener caracteres." })
    .min(4, "El nombre debe tener minimo 4 caracteres.")
    .required("El campo nombre es requerido."),
  lastName: yup
    .string("Ingresa tu apellido.")
    .matches(/^[A-za-z\u00C0-\u00FF]+$/, { message: "El apellido solo debe contener caracteres." })
    .min(4, "El apellido debe tener minimo 4 caracteres.")
    .required("El campo apellido es requerido."),
  email: yup
    .string("Ingresa un email.")
    .email("Ingresa un email valido.")
    .required("El campo email es requerido."),
});

export default EditUserSchema;