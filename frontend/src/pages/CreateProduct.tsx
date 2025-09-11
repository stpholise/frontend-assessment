import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  type FormikHelpers, 
} from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import clsx from "clsx";

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
  specifications: Record<string, string | number | boolean>;
  rating?: number;
  reviews?: number;
}

const CreateProduct = () => {
  const navigate = useNavigate();
  const [specifications, setSpecifications] = useState<
    { key: string; value: string | number | boolean }[]
  >([{ key: "", value: "" }]);
  const [specObj, setSpecObj] =
    useState<Record<string, string | number | boolean>>();

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
    name: Yup.string().required("Product name is Required"),
    brand: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    subCategory: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
    stock: Yup.number().required("Required"),
    description: Yup.string().required("Required"),
    imageUrl: Yup.string().required("Required"),
    // specifications: Yup.object().test(
    //   "not-empty",
    //   "At least one specification required",
    //   (obj) => obj && Object.keys(obj).length > 0
    // ),
  });

  const handleSpecification = (index: number) => {
    if (index + 1 === specifications.length) {
      addSpecification();
    } else {
      removeSpecification(index);
    }
  };

  const handleSpecificationChange = (
    index: number,
    field: "key" | "value",
    newValue: string
  ) => {
    const updated = [...specifications];
    updated[index][field] = newValue;
    setSpecifications(updated);
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
    const obj = Object.fromEntries(
      specifications
        .filter((item) => item.key && item.value) // skip empties
        .map((item) => [item.key, item.value])
    );

    setSpecObj(obj);
    console.log(obj);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
    const obj = Object.fromEntries(
      specifications
        .filter((item) => item.key && item.value) // skip empties
        .map((item) => [item.key, item.value])
    );

    setSpecObj(obj);
    console.log(obj);
  };

  const onSubmit = (value: valuesType, formik: FormikHelpers<valuesType>) => {
    formik.resetForm();
    setSpecifications([{ key: "", value: "" }]);
    console.log(specifications);
    console.log(value);
    console.log(formik);
  };

  const textSpecification = () => {
    console.log(specifications);
  };

  return (
    <div className="pb-4">
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
          {({ setFieldValue }) => (
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
                      type="text"
                      name="price"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const numericalValue = e.target.value.replace(
                          /\D/g,
                          ""
                        );
                        setFieldValue("price", numericalValue);
                      }}
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
                    {specifications.map((spec, index) => (
                      <div
                        key={index}
                        className="flex gap-2 w-full items-start my-1"
                      >
                        <div className="flex gap-2 w-11/12 ">
                          <div className=" flex flex-col gap-2 w-1/2">
                            <Field
                              type="text"
                              value={spec.key}
                              name={`specifications[${index}].key`}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                handleSpecificationChange(
                                  index,
                                  "key",
                                  e.target.value
                                )
                              }
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
                              value={spec.value}
                              name={`specifications[${index}].value`}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                handleSpecificationChange(
                                  index,
                                  "value",
                                  e.target.value.toString()
                                )
                              }
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
                          {index + 1 === specifications.length
                            ? "Add"
                            : "Remove"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <footer className="flex justify-between mb-4">
                  <button
                    type="submit"
                    className={clsx(
                      "bg-slate-900 text-white font-medium  text-sm flex items-center justify-center  rounded-sm h-8 w-fit px-3"
                    )}
                  >
                    Create Product
                  </button>
                  <button
                    type="button"
                    className={clsx(
                      "text-slate-900 bg-white font-medium border border-gray-200  text-sm flex items-center justify-center  rounded-sm h-8 w-20"
                    )}
                    onClick={() => textSpecification}
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
