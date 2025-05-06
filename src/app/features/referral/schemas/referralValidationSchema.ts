import * as Yup from "yup";
export const referralValidationSchema = Yup.object().shape({
  referralCode: Yup.string().matches(
    /^[A-Z]{3}\d{3}$/,
    "Referral code must be 3 capital letters followed by 3 numbers (e.g., ABC123)"
  ),
});
