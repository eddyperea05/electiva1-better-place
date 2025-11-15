import { Formik, Form, Field, ErrorMessage } from "formik";
import { getEditableValidationSchema } from "../schemas/editablePropertiesSchema";
import type { PropiedadInterface } from "../../properties/types/propertyType";

const beneficios = [
  "wifi",
  "mini bar",
  "piscina",
  "aire acondicionado",
  "lavadora",
  "cocina",
];

export const PropertyEditModal = ({
  isOpen,
  onClose,
  property,
  onSave,
}: {
  isOpen: Boolean;
  onClose: () => void;
  property: PropiedadInterface;
  onSave: (values: PropiedadInterface) => void;
}) => {
  if (!isOpen) return null;

  const initialValues = {
    code: property.code || "",
    name: property.name || "",
    address: property.address || "",
    baths: property.baths || 1,
    benefits: property.benefits || [],
    description: property.description || "",
    image: null,
    metres: property.metres || 0,
    parkingLots: property.parkingLots || 0,
    price: property.price || 0,
    rooms: property.rooms || 1,
    typeProperty: property.typeProperty || "casa",
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-center">Editar Propiedad</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={getEditableValidationSchema}
          onSubmit={(values) => {
            onSave(values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="grid grid-cols-2 gap-4">
              <Field
                name="name"
                placeholder="Nombre"
                className="border p-2 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 col-span-2"
              />

              <Field
                name="address"
                placeholder="Dirección"
                className="border p-2 rounded"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 col-span-2"
              />

              <Field
                name="bathrooms"
                type="number"
                placeholder="Baños"
                className="border p-2 rounded"
              />
              <Field
                name="rooms"
                type="number"
                placeholder="Habitaciones"
                className="border p-2 rounded"
              />

              <Field
                name="metres"
                type="number"
                placeholder="Metros cuadrados"
                className="border p-2 rounded"
              />
              <Field
                name="parking"
                type="number"
                placeholder="Parqueaderos"
                className="border p-2 rounded"
              />

              <Field
                name="price"
                type="number"
                placeholder="Precio"
                className="border p-2 rounded"
              />
              <Field
                as="select"
                name="typeProperty"
                className="border p-2 rounded"
              >
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="oficina">Oficina</option>
                <option value="finca">Finca</option>
              </Field>

              <input
                type="file"
                onChange={(e) =>
                  setFieldValue("image", e.currentTarget.files[0])
                }
                className="col-span-2 border p-2 rounded"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 col-span-2"
              />

              <Field
                as="textarea"
                name="description"
                placeholder="Descripción"
                className="col-span-2 border p-2 rounded h-24"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 col-span-2"
              />

              <label
                htmlFor="benefits"
                className="capitalize block mb-1 font-medium col-span-2"
              >
                beneficios:
              </label>

              <div className="col-span-2 flex flex-wrap gap-2">
                {beneficios.map((beneficio) => {
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
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {beneficio}
                    </button>
                  );
                })}
              </div>

              <div className="col-span-2 flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Guardar cambios
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
