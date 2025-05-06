import * as Yup from "yup";

export const uploadReceiptValidate = Yup.object().shape({
  paymentReceiptUrl: Yup.mixed<File>()
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
