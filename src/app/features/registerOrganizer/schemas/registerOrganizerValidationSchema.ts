import * as Yup from "yup";

export const registerOrganizerValidationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),
  address: Yup.string().required("Address is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
});
