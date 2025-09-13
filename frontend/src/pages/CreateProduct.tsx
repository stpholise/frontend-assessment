import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import clsx from "clsx";
import { useCreateProduct } from "../components/hooks/useCreatProduct";

interface valuesType {
  id: number;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  specifications?: Record<string, string | number | boolean>;
  rating?: number;
  reviews?: number;
}

interface CreateProductProps {
  product?: valuesType;
}

const CreateProduct = ({ product }: CreateProductProps) => {
  const isEdit = Boolean(product);
  const { createProduct, isLoading, error } = useCreateProduct();
  const navigate = useNavigate();

  const [specifications, setSpecifications] = useState<
    Record<string, string | number | boolean>
  >(product?.specifications ?? { "": "" });

  const initialValues: valuesType = {
    id: 0,
    name: "",
    brand: "",
    category: "",
    subCategory: "",
    price: 0,
    stock: 0,
    description: "",
    imageUrl: "",
    specifications: {},
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required and must be a string"),
    brand: Yup.string().required("Brand is required and must be a string"),
    category: Yup.string().required(
      "Category is required and must be a string"
    ),
    subCategory: Yup.string().required(
      "SubCategory is required and must be a string"
    ),
    price: Yup.number()
      .min(1, "Price must be greater than 0")
      .required("Price is required and must be a positive number"),
    stock: Yup.number()
      .min(0, "Stock cannot be negative")
      .required("Stock is required and must be a non-negative integer"),
    description: Yup.string().required(
      "Description is required and must be a string"
    ),
    imageUrl: Yup.string().url("Must be a valid URL").required("Required"),
  });

  const handleSpecification = (index: number) => {
    if (index + 1 === specifications.length) {
      addSpecification(`key${Object.keys(specifications).length + 1}`, "");
    } else {
      removeSpecification(`key${index + 1}`);
    }
  };

  const addSpecification = (key: string, value: string | number | boolean) => {
    setSpecifications((prev) => ({ ...prev, [key]: value }));
  };

  const updateSpecification = (
    key: string,
    newValue: string | number | boolean
  ) => {
    setSpecifications((prev) => ({ ...prev, [key]: newValue }));
  };

  const removeSpecification = (key: string) => {
    const { [key]: _, ...rest } = specifications;
    setSpecifications(rest);
  };

  const onSubmit = async (
    values: valuesType,
    formik: FormikHelpers<valuesType>
  ) => {
    try {
      await createProduct({ ...values, specifications }); // pass object directly
      formik.resetForm();
      setSpecifications({});
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const cancelCreateProduct = () => {
    navigate("/");
  };

  return (
    <div className="pb-4">
      {error && <div className="text-red-500 mb-2">{error.message}</div>}
      {isLoading && (
        <div className="text-gray-700 mb-2">Creating product...</div>
      )}
      <h2 className="font-semibold text-2xl mb-4">Create New Product</h2>
      <div className=" w-full rounded-xl bg-white ">
        <div className=" px-4 py-4 flex justify-between">
          <h3 className="font-medium text-xl">Create New Product</h3>
          <button
            onClick={() => navigate("/")}
            className="text-black font-semibold"
          >
            {" "}
            Back to Products
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <div className=" flex flex-col gap-4 px-6">
                <div className=" grid grid-cols-2 gap-4">
                  <div className=" flex flex-col gap-2">
                    <label htmlFor="name" className="font-medium text-sm ">
                      Product Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Product Name"
                      className="text-sm w-full px-4 py-1 rounded-sm border-gray-200 border outline-none"
                    />
                    <ErrorMessage
                      name="name"
                      component={"div"}
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className=" flex flex-col gap-2">
                    <label htmlFor="brand" className="font-medium text-sm ">
                      Brand
                    </label>
                    <Field
                      type="text"
                      name="brand"
                      placeholder="Brand "
                      className="text-sm w-full px-4 py-1 rounded-sm border-gray-200 border outline-none"
                    />
                    <ErrorMessage
                      name="brand"
                      component={"div"}
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className=" flex flex-col gap-2">
                    <label htmlFor="category" className="font-medium text-sm ">
                      Category
                    </label>
                    <Field
                      type="text"
                      name="category"
                      placeholder="Category"
                      className="text-sm w-full px-4 py-1 rounded-sm border-gray-200 border outline-none"
                    />
                    <ErrorMessage
                      name="category"
                      component={"div"}
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className=" flex flex-col gap-2">
                    <label
                      htmlFor="subCategory"
                      className="font-medium text-sm "
                    >
                      Sub Category
                    </label>
                    <Field
                      type="text"
                      name="subCategory"
                      placeholder="Sub Category"
                      className="text-sm w-full px-4 py-1 rounded-sm border-gray-200 border outline-none"
                    />
                    <ErrorMessage
                      name="subCategory"
                      component={"div"}
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className=" flex flex-col gap-2">
                    <label htmlFor="price" className="font-medium text-sm ">
                      Price
                    </label>
                    <Field
                      type="number"
                      name="price"
                      placeholder="Price"
                      className="text-sm w-full px-4 py-1 rounded-sm border-gray-200 border outline-none"
                    />
                    <ErrorMessage
                      name="price"
                      component={"div"}
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className=" flex flex-col gap-2">
                    <label htmlFor="stock" className="font-medium text-sm ">
                      Stock
                    </label>
                    <Field
                      type="number"
                      name="stock"
                      placeholder="Stock"
                      className="text-sm w-full px-4 py-1 rounded-sm border-gray-200 border outline-none"
                    />
                    <ErrorMessage
                      name="stock"
                      component={"div"}
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
                <div className=" flex flex-col gap-2">
                  <label htmlFor="description" className="font-medium text-sm ">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Description"
                    className="text-sm w-full px-4 py-1 rounded-sm border-gray-200 border outline-none"
                  />
                  <ErrorMessage
                    name="description"
                    component={"div"}
                    className="text-red-500 text-xs"
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <label htmlFor="imageUrl" className="font-medium text-sm ">
                    Image URL
                  </label>
                  <Field
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    className="text-sm w-full px-4 py-1 rounded-sm border-gray-200 border outline-none"
                  />
                  <ErrorMessage
                    name="imageUrl"
                    component={"div"}
                    className="text-red-500 text-xs"
                  />
                </div>
                <div className=" w-full ">
                  <div className="w-full   ">
                    <label
                      htmlFor="specifications"
                      className="font-medium text-sm "
                    >
                      Specifications
                    </label>
                    {Object.entries(specifications).map(
                      ([key, value], index) => (
                        <div
                          key={index}
                          className="flex gap-2 w-full items-start my-1"
                        >
                          <div className="flex gap-2 w-11/12 ">
                            <div className=" flex flex-col gap-2 w-1/2">
                              <Field
                                type="text"
                                value={key}
                                name={`specifications[${index}].key`}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const newKey = e.target.value;

                                  const { [key]: oldValue, ...rest } =
                                    specifications;
                                  setSpecifications({
                                    ...rest,
                                    [newKey]: oldValue,
                                  });
                                }}
                                placeholder="Key"
                                className="text-sm w-full px-4 py-1 rounded-sm border-gray-200 border outline-none"
                              />
                              <ErrorMessage
                                name="specifications"
                                component={"div"}
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className=" flex flex-col gap-2 w-1/2">
                              <Field
                                type="text"
                                value={value}
                                name={`specifications[${index}].value`}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => updateSpecification(key, e.target.value)}
                                placeholder="value"
                                className="text-sm w-full px-4 py-1 rounded-sm border-gray-200 border outline-none"
                              />
                              <ErrorMessage
                                name="specifications"
                                component={"div"}
                                className="text-red-500 text-xs"
                              />
                            </div>{" "}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleSpecification(index)}
                            className={clsx(
                              "bg-slate-900 text-white font-medium  text-sm flex items-center justify-center  rounded-sm h-8",
                              index + 1 === specifications.length
                                ? "w-12"
                                : "w-18"
                            )}
                          >
                            {index === specifications.length ? "Add" : "Remove"}
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <footer className="flex justify-between mb-4">
                  <button
                    disabled={isSubmitting || !isValid || isLoading}
                    type="submit"
                    className={clsx(
                      " text-white font-medium  text-sm flex items-center justify-center  rounded-sm h-8 w-fit px-3",
                      {
                        "bg-gray-400": isSubmitting || !isValid || isLoading,
                        "bg-slate-900": !isSubmitting || isValid || !isLoading,
                      }
                    )}
                  >
                    Create Product
                  </button>
                  <button
                    type="button"
                    className={clsx(
                      "text-slate-900 bg-white font-medium border border-gray-200  text-sm flex items-center justify-center  rounded-sm h-8 w-20"
                    )}
                    onClick={cancelCreateProduct}
                  >
                    Cancel
                  </button>
                </footer>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateProduct;
