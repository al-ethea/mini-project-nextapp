'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { BiSolidShow, BiSolidHide } from 'react-icons/bi';
import instance from '@/utils/axiosInstance';
import authStore from '@/zustand/store';
import { toast } from 'react-toastify';
import { registerValidationSchema } from '../features/register/schemas/registerValidationSchema';
import { useRouter } from 'next/navigation';
import { AxiosResponse } from 'axios';

interface IHandleRegisterUser {
  firstName: string;
  lastName: string;
  postcode: string;
  email: string;
  password: string;
}

export default function registerPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const token = authStore((state) => state.token);

  const handleAuthRegister = async ({
    firstName,
    lastName,
    postcode,
    email,
    password,
  }: IHandleRegisterUser) => {
    try {
      const response: AxiosResponse<any, any> = await instance.post(
        '/users/register',
        {
          firstName,
          lastName,
          postcode,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div>
      <div
        className="min-h-screen overflow-hidden bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url(https://media.licdn.com/dms/image/v2/C4E1BAQGlTBGCd2gshQ/company-background_10000/company-background_10000/0/1623800046639/live_nation_cover?e=2147483647&v=beta&t=rhGJyRnc__IG7kMVQ9DsVxTNi1p343jB14jR3-rsi_s)',
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-20 sm:px-8">
          <div className="text-center max-w-md w-full sm:p-16">
            <h1 className="text-white text-3xl font-bold mb-8 tracking-wide">
              LIVE NATION
            </h1>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                postcode: '',
                email: '',
                password: '',
              }}
              validationSchema={registerValidationSchema}
              onSubmit={(values) => {
                handleAuthRegister({
                  firstName: values.firstName,
                  lastName: values.lastName,
                  postcode: values.postcode,
                  email: values.email,
                  password: values.password,
                });
              }}
            >
              <Form className="space-y-4">
                <div className="relative">
                  <label htmlFor="firstName" className="sr-only">
                    First Name
                  </label>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="firstName"
                    placeholder="First Name"
                    className="w-full px-4 py-3 border border-white bg-transparent text-white placeholder-white rounded-sm focus:outline-none"
                  />
                  <ErrorMessage
                    name="firstName"
                    component={'div'}
                    className="text-red-500 text-sm pt-2"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="lastName" className="sr-only">
                    Last Name
                  </label>
                  <Field
                    id="lastName"
                    name="lastName"
                    type="lastName"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border border-white bg-transparent text-white placeholder-white rounded-sm focus:outline-none"
                  />
                  <ErrorMessage
                    name="lastName"
                    component={'div'}
                    className="text-red-500 text-sm pt-2"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="postcode" className="sr-only">
                    Postcode
                  </label>
                  <Field
                    id="postcode"
                    name="postcode"
                    type="postcode"
                    placeholder="Postcode"
                    className="w-full px-4 py-3 border border-white bg-transparent text-white placeholder-white rounded-sm focus:outline-none"
                  />
                  <ErrorMessage
                    name="postcode"
                    component={'div'}
                    className="text-red-500 text-sm pt-2"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    autoComplete="email"
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 border border-white bg-transparent text-white placeholder-white rounded-sm focus:outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component={'div'}
                    className="text-red-500 text-sm pt-2"
                  />
                </div>

                <div className="relative">
                  <div className="relative">
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="w-full px-4 py-3 border border-white bg-transparent text-white placeholder-white rounded-sm focus:outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-lg"
                    >
                      {showPassword ? <BiSolidHide /> : <BiSolidShow />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component={'div'}
                    className="text-red-500 text-sm pt-2"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-700 bg-opacity-80 hover:bg-opacity-100 text-white mt-2 py-3 font-semibold rounded-sm transition duration-200 ease-in-out"
                >
                  Register
                </button>
              </Form>
            </Formik>

            {/* White line */}
            <div className="border-t border-white my-4" />

            <div className="text-white text-sm">
              Already Registered?{' '}
              <span
                className="font-semibold hover:underline cursor-pointer"
                onClick={() => router.push('/login')}
              >
                Log in
              </span>{' '}
              <span className="inline-block">&rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
