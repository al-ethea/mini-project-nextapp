"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import instance from "@/utils/axiosInstance";
import authStore from "@/zustand/store";
import { toast } from "react-toastify";
import { registerOrganizerValidationSchema } from "../features/registerOrganizer/schemas/registerOrganizerValidationSchema";

interface IHandleRegisterOrganizer {
  companyName: string;
  address: string;
  phoneNumber: string;
}

export default function RegisterOrganizerPage() {
  const token = authStore((state: any) => state.token);
  const [loading, setLoading] = useState(false);

  const handleRegisterOrganizer = async ({
    companyName,
    address,
    phoneNumber,
  }: IHandleRegisterOrganizer) => {
    setLoading(true);
    try {
      const response = await instance.post(
        "/organizer/register",
        {
          companyName,
          address,
          phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4 text-black">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Register Organizer
        </h1>
        <p className="text-sm mb-6 text-center">
          Fill in the company details to complete registration.
        </p>
        <Formik
          initialValues={{ companyName: "", address: "", phoneNumber: "" }}
          validationSchema={registerOrganizerValidationSchema}
          onSubmit={(values) => {
            handleRegisterOrganizer({
              companyName: values.companyName,
              address: values.address,
              phoneNumber: values.phoneNumber,
            });
          }}
        >
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Company Name</label>
              <Field
                name="companyName"
                type="text"
                placeholder="e.g., Acme Corp"
                className="w-full border border-gray-300 rounded-xl px-4 py-2"
              />
              <ErrorMessage
                name="companyName"
                component="div"
                className="text-red-500 text-sm pt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Company Address
              </label>
              <Field
                name="address"
                type="text"
                placeholder="e.g., 123 Business St, City"
                className="w-full border border-gray-300 rounded-xl px-4 py-2"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm pt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <Field
                name="phoneNumber"
                type="text"
                placeholder="e.g., +1 234 567 8900"
                className="w-full border border-gray-300 rounded-xl px-4 py-2"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm pt-1"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 mt-4 text-white font-semibold rounded-xl ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </Form>
        </Formik>
      </div>
    </main>
  );
}
