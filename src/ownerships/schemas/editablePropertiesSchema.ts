import * as Yup from "yup";

export const getEditableValidationSchema = Yup.object({
  name: Yup.string(),
  address: Yup.string(),
  bathrooms: Yup.number(),
  benefits: Yup.array().of(Yup.string()),
  description: Yup.string()
    .required()
    .min(200, "Deben de ser minimo 200 caracteres")
    .max(500, "Deben de ser maximo 500 caracteres"),
  metres: Yup.number().min(10),
  parking: Yup.number().min(0),
  price: Yup.number().min(0),
  rooms: Yup.number().min(1),
  typeProperty: Yup.string(),
});
