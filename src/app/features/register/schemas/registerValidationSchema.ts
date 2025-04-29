import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  postcode: Yup.string()
    .matches(/^\d{5}$/, 'Postcode must be exactly 5 digits')
    .required('Postcode is required'),
  email: Yup.string().email('Email is not valid').required('Email is required'),
  password: Yup.string().required('Password is required'),
});
