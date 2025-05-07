// import { useState } from "react";
"use client";
import instance from "@/utils/axiosInstance";
import authStore from "@/zustand/store";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { uploadReceiptValidate } from "../features/uploadReceipt/schemas/uploadReceiptValidationSchema";

export default function UploadReceiptPage() {
  const token = authStore((state: any) => state.token);

  const handleReceiptUpload = async (formData: FormData) => {
    try {
      const response = await instance.put("/transaction", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Upload Receipt</h1>
      <Formik
        initialValues={{
          file: [] as File[],
        }}
        validationSchema={uploadReceiptValidate}
        onSubmit={(values) => {
          const formData = new FormData();
          values.file.forEach((file) => {
            formData.append("images", file);
          });

          handleReceiptUpload(formData);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="flex flex-col gap-3">
            <div className="bg-gray-100 rounded-md p-3 flex items-center justify-between">
              <input
                id="file"
                name="file"
                type="file"
                className="w-1/2"
                multiple
                onChange={(e) =>
                  setFieldValue(
                    "file",
                    Array.from(e?.currentTarget?.files || [])
                  )
                }
              />
            </div>
            <ErrorMessage
              name="file"
              component={"div"}
              className="text-red-500 text-sm"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
