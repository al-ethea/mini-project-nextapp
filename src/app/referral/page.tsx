"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { referralValidationSchema } from "../features/referral/schemas/referralValidationSchema";
import { toast } from "react-toastify";
import instance from "@/utils/axiosInstance";
import authStore from "@/zustand/store";

export default function ReferralPage() {
  const token = authStore((state: any) => state.token);

  const handleUseReferralCode = async (referralCode: string) => {
    try {
      const response = await instance.post(
        "referral/apply-referral",
        { referralCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid referral code");
    }
  };
  return (
    <main>
      <section className="py-5">
        <h1 className="text-4xl font-bold text-center">Referral Code</h1>
        <p className="text-md py-5 text-center">
          Enter a referral code to get a discount
        </p>
        <Formik
          initialValues={{ referralCode: "" }}
          validationSchema={referralValidationSchema}
          onSubmit={(values) => {
            handleUseReferralCode(values.referralCode);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 items-center">
              <div className="w-full max-w-sm mx-auto">
                <Field
                  name="referralCode"
                  type="text"
                  placeholder="ABC123"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-center"
                />
                <ErrorMessage
                  name="referralCode"
                  component="div"
                  className="text-red-600 text-sm mt-1 text-center"
                />
              </div>
              <button
                type="submit"
                className="px-4 bg-red-700 bg-opacity-80 hover:bg-opacity-100 text-white mt-2 py-3 font-semibold rounded-md transition duration-200 ease-in-out"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Apply Code"}
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
}
