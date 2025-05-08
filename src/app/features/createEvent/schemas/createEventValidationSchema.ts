import * as Yup from "yup";

export const createEventValidationSchema = Yup.object().shape({
  name: Yup.string().required("Event name is required"),
  city: Yup.string().required("City is required"),
  venue: Yup.string().required("Venue is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number()
    .min(0, "Price cannot be negative")
    .required("Price is required"),
  description: Yup.string().required("Description is required"),
  availableSeats: Yup.number().min(1).required("Available seats is required"),
  type: Yup.string().oneOf(["PAID", "FREE"]).required("Type is required"),
  artistId: Yup.number().required("Artist is required"),

  // File validation
  bannerUrl: Yup.mixed<File>()
    .test("fileSize", "Maximum file size is 2mb", (file) => {
      const limitFileSize = 1024 * 1024 * 2;
      return file && file.size <= limitFileSize;
    })
    .test("fileFormat", "Format file not accepted", (file) => {
      const formatFileAccepted = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      return file && formatFileAccepted.includes(file?.type);
    }),
});
