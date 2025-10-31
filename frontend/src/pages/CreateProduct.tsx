import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import ImageUpload from "../components/ImageUpload";
import { useToast } from "../components/hooks/useToast";

interface valuesType {
  id: number | undefined;
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

type SpecifiactionType = {
  key: string;
  value: string | number | boolean;
};

const createAProduct = async (product: valuesType) => {
  const res = await fetch("http://localhost:3000/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error?.message || "Failed to create product");
  }

  return res.json();
};

const updateAProduct = async (id: number, product: valuesType) => {
  const url = `http://localhost:3000/api/products/${id}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error?.message || "Failed to update product");
  }

  return res.json();
};

const CreateProduct = ({ product }: CreateProductProps) => {
  const toast = useToast();
  const [specifications, setSpecifications] = useState<SpecifiactionType[]>(
    product?.specifications
      ? Object.entries(product.specifications).map(
          ([key, value]: [string, string | number | boolean]) => ({
            key,
            value,
          })
        )
      : [{ key: "", value: "" }]
  );
  const [imageFile, setImageFile] = useState<File>();

  const initialValues: valuesType = {
    id: product?.id,
    name: product?.name || "",
    brand: product?.brand || "",
    category: product?.category || "",
    subCategory: product?.subCategory || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
    description: product?.description || "",
    imageUrl: product?.imageUrl ?? "",
    specifications: {},
  };
  const isEdit = Boolean(product);
  const navigate = useNavigate();
  const { mutate: createProduct } = useMutation({
    mutationFn: (product: valuesType) => createAProduct(product),
    onSuccess: () => {
      toast.success("Product created successfully");
      navigate("/");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
    onMutate: () => {
      toast.info("Creating Product");
    },
  });

  const { mutate: updateProduct } = useMutation({
    mutationFn: ({ id, product }: { id: number; product: valuesType }) =>
      updateAProduct(id, product),
    onSuccess: () => {
      toast.success("Product updated successfully");
      navigate("/");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
    onMutate: () => {
      toast.info("Updating product...");
    },
  });

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "y6acfyrq");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dmuhmpdkm/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Upload failed");
        toast.error("Image upload faild");
      }
      const data = await response.json();
      return data.secure_url as string;
    } catch (err: unknown) {
      if (err instanceof Error) {
        if ("code" in err && err.code === "ERR_NETWORK") {
          throw new Error(
            "Network error: please check your internet connection"
          );
          toast.error("Network error: please check your internet connection");
        }
        if (err.message === "Network Error") {
          throw new Error(
            "Network error: please check your internet connection"
          );
          toast.error("Network error: please check your internet connection");
        }
        throw new Error(err.message || "An unexpected error occurred");
      }
    }
  };

  const { mutateAsync: uploadImage } = useMutation({
    mutationFn: (file: File) => uploadToCloudinary(file),
    onError: (err) => toast.error(err.message),
    onMutate: () => {
      toast.info("uploading image...");
    },
  });

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
      .min(1, "Stock cannot be negative or zero")
      .required("Stock is required and must be a non-negative integer"),
    description: Yup.string().required(
      "Description is required and must be a string"
    ),
    imageUrl: Yup.string().required("Required"),
  });

  const updateSpecificationKey = (oldKey: string, newKey: string) => {
    setSpecifications((prev) => {
      if (oldKey === newKey) return prev;
      if (prev.some((spec) => spec.key === newKey)) return prev;
      return prev.map((spec) =>
        spec.key === oldKey ? { ...spec, key: newKey } : spec
      );
    });
  };

  const updateSpecificationValue = (
    key: string,
    newValue: string | number | boolean
  ) => {
     
    setSpecifications((prev) =>
      prev.map((spec) =>
        spec.key === key ? { ...spec, value: newValue } : spec
      )
    );
  };

  const addSpecification = () => {
    setSpecifications((prev) => [...prev, { key: "", value: "" }]);
  };

  const removeSpecification = (key: string | number) => {
    setSpecifications((prev) => prev.filter((spec) => spec.key !== key));
  };
  const specsObject = specifications.reduce((acc, { key, value }) => {
    if (key.trim() !== "") acc[key] = value;
    return acc;
  }, {} as Record<string, string | number | boolean>);

  const onSubmit = async (
    values: valuesType,
    formik: FormikHelpers<valuesType>
  ) => {
    if (isEdit && product?.id) {
      try {
        formik.setSubmitting(true);
        let uploadedImageUrl = values.imageUrl as string;

        if (imageFile) {
          const uploadResult = await uploadImage(imageFile);
          uploadedImageUrl = uploadResult ?? values.imageUrl;
        }
        console.log(values.imageUrl);
        await updateProduct({
          id: product?.id,
          product: {
            ...values,
            imageUrl: uploadedImageUrl,
            specifications: specsObject,
          },
        });

        formik.resetForm();
        setSpecifications([]);
      } catch (err) {
        console.error(err);
        toast.error("an error occoured");
      } finally {
        formik.setSubmitting(false);
      }
    } else {
      try {
        formik.setSubmitting(true);
        let uploadedImageUrl = values.imageUrl as string;
        if (imageFile) {
          const uploadResult = await uploadImage(imageFile);
          uploadedImageUrl = uploadResult ?? values.imageUrl;
        }
        console.log(values.imageUrl);
        await createProduct({
          ...values,
          imageUrl: uploadedImageUrl,
          specifications: specsObject,
        });

        formik.resetForm();
        setSpecifications([]);
        navigate("/");
      } catch (err) {
        console.error(err);
        toast.error("an error occoured");
      } finally {
        formik.setSubmitting(false);
      }
    }
  };

  const cancelCreateProduct = () => {
    navigate("/");
  };

  return (
    <div className="pb-4">
      <div className="bg-white sm:hidden  w-full px-4 py-2">
        <button
          onClick={() => navigate("/")}
          className="text-black font-semibold flex gap-1.5 items-center"
        >
          <img src="/arrow_back.png" alt="back" className=" size-4 max-w-4" />
          Back to Products
        </button>
      </div>
      <h2 className="font-semibold text-xl sm:text-2xl mt-2 mb-4 px-4 md:px-6">
        {isEdit ? "Edit Product" : "Create New Product"}
      </h2>
      <div className=" w-full rounded-xl bg-white   ">
        <div className=" px-4 py-4  justify-between hidden sm:flex">
          <button
            onClick={() => navigate("/")}
            className="text-black font-semibold flex gap-1.5 items-center"
          >
            <img src="/arrow_back.png" alt="back" className=" size-4 max-w-4" />
            Back to Products
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validateOnChange
          validateOnMount
          validationSchema={validationSchema}
        >
          {({
            isValid,
            setFieldValue,
            values,
            isSubmitting,
            setTouched,
            setFieldError,
            setFieldTouched,
          }) => (
            <Form>
              <div className=" flex flex-col gap-4 px-6">
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      placeholder="Price"
                      value={values.price.toLocaleString("en-NG", {
                        minimumFractionDigits: 0,
                      })}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const rawValue = e.target.value.replace(/\D/g, "");
                        const numericValue = Number(rawValue);
                        setFieldValue("price", numericValue);
                      }}
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
                <div className="">
                  <ImageUpload
                    setFieldValue={setFieldValue}
                    setFieldError={setFieldError}
                    setFieldTouched={setFieldTouched}
                    setImageFile={setImageFile}
                    value={values.imageUrl}
                  />
                  <ErrorMessage
                    name="imageUrl"
                    component={"div"}
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className=" w-full ">
                  <div className="w-full   ">
                    <div className=" flex justify-between items-center">
                      <label
                        htmlFor="specifications"
                        className="font-medium text-sm "
                      >
                        Specifications
                      </label>
                      {Object.keys(specifications).length === 0 && (
                        <button
                          type="button"
                          onClick={addSpecification}
                          className="bg-slate-800 text-white font-medium text-sm rounded-sm h-8 w-12"
                        >
                          Add Specifications
                        </button>
                      )}
                    </div>
                    {specifications.map(({ key, value }, index) => (
                      <div
                        key={index}
                        className="flex gap-2 w-full sm:items-start items-end my-1"
                      >
                        <div className="flex gap-2 w-11/12 sm:flex-row flex-col  ">
                          <div className=" flex flex-col gap-2 w-full sm:w-1/2">
                            <Field
                              type="text"
                              value={key}
                              name={`specifications[${index}].key`}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                updateSpecificationKey(key, e.target.value);
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
                          <div className=" flex flex-col gap-2 w-full sm:w-1/2">
                            <Field
                              type="text"
                              value={value}
                              name={`specifications[${index}].value`}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                updateSpecificationValue(key, e.target.value)
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
                        {index === Object.keys(specifications).length - 1 ? (
                          <button
                            type="button"
                            onClick={addSpecification}
                            className="bg-slate-900 text-white font-medium text-sm rounded-sm h-8 w-12"
                          >
                            Add
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => removeSpecification(index)}
                            className="bg-red-600 text-white font-medium text-sm rounded-sm h-8 w-12 flex items-center justify-center"
                          >
                            <img
                              src="/close.svg"
                              alt="close"
                              className="size-5 object-cover "
                            />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <footer className="flex justify-between mb-4">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    onClick={() => {
                      setTouched({
                        name: true,
                        brand: true,
                        category: true,
                        subCategory: true,
                        price: true,
                        stock: true,
                        description: true,
                        imageUrl: true,
                      });
                    }}
                    className={clsx(
                      "  font-medium  text-sm flex items-center justify-center  rounded-sm h-8 w-fit px-3",
                      isValid || isSubmitting
                        ? "bg-slate-900 border-slate-700 text-white"
                        : "bg-gray-300 border-gray-400"
                    )}
                  >
                    {isEdit ? "Update Product" : "Create Product"}
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
