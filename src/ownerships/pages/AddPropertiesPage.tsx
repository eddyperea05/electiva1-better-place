//import del Formik
import { ErrorMessage, Field, Form, Formik } from "formik";

//Import del schema del formulario
import { getAddPropertySchema } from "../schemas/addPropertiesSchema";
import { useNavigate } from "react-router-dom";

//Import del contexto del usuario
import { userDataContext } from "../../authentication/hooks/userDataContext";

//Import de funciones de firebase
import {
  generateSequentialCodeByType,
  saveProperty,
} from "../../firebase/functions/functionsPropertiesFirebase";

//Import de cloudinary
import { handleUploadImage } from "../../cloudinary/saveImage";

//Import de tipos
import type { PropiedadInterface } from "../../properties/types/propertyType";

export const AddPropertiesPage = () => {
  //Inicializamos el useNavigate
  const navigate = useNavigate();

  //Traemos el contexto del usuario actual
  const { userData } = userDataContext();

  //Las opciones que se van a mostrar en el drop down
  const opciones = [
    { value: "casa", label: "Casa" },
    { value: "apartamento", label: "Apartamento" },
    { value: "oficina", label: "Oficina" },
    { value: "finca", label: "Finca" },
  ];

  //Inicializamos los beneficios que deben de a ver
  const beneficios = [
    "wifi",
    "mini bar",
    "piscina",
    "aire acondicionado",
    "lavadora",
    "cocina",
  ];

  //Hook para guardar los datos de la propiedad
  const initialValuesPropertie: PropiedadInterface = {
    name: "",
    address: "",
    baths: 0,
    benefits: [],
    code: "",
    description: "",
    image: null,
    lessee: {
      id: userData.id,
      name: userData.userName,
      email: userData.email,
      phone: userData.numberPhone,
    },
    metres: 0,
    parkingLots: 0,
    price: 0,
    publicationDate: null,
    rate: 5,
    rateCount: 1,
    rooms: 0,
    status: "libre",
    typeProperty: "casa",
  };

  //Función para guardar la propiedad
  const handleSaveProperty = async (
    values: PropiedadInterface & { image: File },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      //llamamos a la función para guardar la imagen
      const imageUrl = await handleUploadImage(values.image);

      //Llamamos a la función para generar la secuencia de la propiedad
      const codigo = await generateSequentialCodeByType(values.typeProperty);

      //Creamos un nuevo objeto con lso datos nuevos modificados de las funciones anteriores
      const newProperty: PropiedadInterface = {
        ...values,
        code: codigo,
        image: imageUrl,
        publicationDate: new Date(),
      };

      //Guardamos en firebase la propiedad
      await saveProperty(newProperty);

      //Redirijimos de nuevo a mis propiedades
      navigate("/myProperties");
    } catch (error) {
      console.error("Error al guardar propiedad:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValuesPropertie}
        validationSchema={getAddPropertySchema}
        onSubmit={handleSaveProperty}
      >
        {({ values, setFieldValue }) => (
          <Form className="mx-16">
            <div className="mx-5 my-5">
              <h1 className="capitalize font-bold text-3xl">
                formulario para añadir propiedad
              </h1>
              <div className="flex justify-between my-4">
                <div>
                  {/* input para el nombre de la propiedad */}
                  <label
                    htmlFor="name"
                    className="capitalize block mb-1 font-medium"
                  >
                    nombre de la propiedad:
                  </label>
                  <Field
                    name="name"
                    className="border border-[#797979] p-2 rounded-md w-100"
                    placeholder="Nombre de la propiedad"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-1.5 text-red-600"
                  />
                </div>
                <div>
                  {/* input para la dirección */}
                  <label
                    htmlFor="address"
                    className="capitalize block mb-1 font-medium"
                  >
                    dirección de la propiedad:
                  </label>
                  <Field
                    name="address"
                    className="border border-[#797979] p-2 rounded-md w-100"
                    placeholder="Dirección de la propiedad"
                  />
                  <ErrorMessage
                    name="address"
                    component="p"
                    className="mt-1.5 text-red-600"
                  />
                </div>
                <div>
                  {/* input para la dirección */}
                  <label
                    htmlFor="name"
                    className="capitalize block mb-1 font-medium"
                  >
                    tipo de propeidad:
                  </label>
                  <Field
                    as="select"
                    name="typeProperty"
                    className="border p-2 rounded"
                  >
                    <option value="">Selecciona una opción</option>
                    {opciones.map((op) => (
                      <option key={op.value} value={op.value}>
                        {op.label}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
              <div>
                {/* textarea para el tipo de propiedad */}
                <label
                  htmlFor="description"
                  className="capitalize block mb-1 font-medium"
                >
                  descripción:
                </label>
                <Field
                  as="textarea"
                  name="description"
                  id="descripcion"
                  rows="4"
                  className="w-full border rounded p-2 resize-none"
                  placeholder="Escribe una descripción detallada..."
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="mt-1.5 text-red-600"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="benefits"
                  className="capitalize block mb-1 font-medium"
                >
                  beneficios:
                </label>

                {beneficios.map((beneficio, index) => {
                  const isSelected = values.benefits.includes(beneficio);

                  return (
                    <button
                      type="button"
                      key={beneficio}
                      onClick={() => {
                        const nuevos = isSelected
                          ? values.benefits.filter((b) => b !== beneficio)
                          : [...values.benefits, beneficio];
                        setFieldValue("benefits", nuevos);
                      }}
                      className={`cursor-pointer px-3 py-2 rounded-full transition-all ${
                        isSelected
                          ? "bg-green-700 text-white"
                          : "bg-green-300 text-white"
                      } ${index !== 0 ? "ml-4" : ""}`}
                    >
                      {beneficio}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between mb-5">
                <div>
                  {/* input para las habiraciones */}
                  <label
                    htmlFor="rooms"
                    className="capitalize block mb-1 font-medium"
                  >
                    habitaciones:
                  </label>
                  <Field
                    name="rooms"
                    className="border border-[#797979] p-2 rounded-md w-80"
                    placeholder="Dirección de la propiedad"
                  />
                  <ErrorMessage
                    name="rooms"
                    component="p"
                    className="mt-1.5 text-red-600"
                  />
                </div>
                <div>
                  {/* input para los baños */}
                  <label
                    htmlFor="baths"
                    className="capitalize block mb-1 font-medium"
                  >
                    baños:
                  </label>
                  <Field
                    name="baths"
                    className="border border-[#797979] p-2 rounded-md w-80"
                    placeholder="rooms"
                  />
                  <ErrorMessage
                    name="baths"
                    component="p"
                    className="mt-1.5 text-red-600"
                  />
                </div>
                <div>
                  {/* input para los parqueaderos */}
                  <label
                    htmlFor="parkingLots"
                    className="capitalize block mb-1 font-medium"
                  >
                    parqueaderos:
                  </label>
                  <Field
                    name="parkingLots"
                    type="number"
                    className="border border-[#797979] p-2 rounded-md w-80"
                  />
                  <ErrorMessage
                    name="parkingLots"
                    component="p"
                    className="mt-1.5 text-red-600"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  {/* input para el precio */}
                  <label
                    htmlFor="price"
                    className="capitalize block mb-1 font-medium"
                  >
                    precio:
                  </label>
                  <Field
                    name="price"
                    className="border border-[#797979] p-2 rounded-md w-80"
                    placeholder="rooms"
                  />
                </div>
                <div>
                  {/* input para los metros */}
                  <label
                    htmlFor="metres"
                    className="capitalize block mb-1 font-medium"
                  >
                    metros cuadrados:
                  </label>
                  <Field
                    name="metres"
                    className="border border-[#797979] p-2 rounded-md w-80"
                    placeholder="rooms"
                  />
                  <ErrorMessage
                    name="metres"
                    component="p"
                    className="mt-1.5 text-red-600"
                  />
                </div>
                <div>
                  {/* input para subir la imagen */}

                  <label htmlFor="image" className="block mb-1 font-medium">
                    Subir archivo
                  </label>

                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0] || null;
                      setFieldValue("image", file);
                    }}
                    className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
                  />
                  <ErrorMessage
                    name="image"
                    component="p"
                    className="mt-1.5 text-red-600"
                  />
                </div>
              </div>

              <div className="flex mt-5">
                <button
                  type="submit"
                  className="capitalize cursor-pointer mr-4 outline-1 outline-green-700 bg-green-400 text-white py-2 px-3 rounded-sm"
                >
                  <strong>añadir propiedad</strong>
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/myProperties")}
                  className="capitalize cursor-pointer outline-1 outline-red-700 bg-red-400 text-white py-2 px-3 rounded-sm"
                >
                  <strong>cancelar</strong>
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
