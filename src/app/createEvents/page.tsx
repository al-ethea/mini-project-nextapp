"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import instance from "@/utils/axiosInstance";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import authStore from "@/zustand/store";
import { createEventValidationSchema } from "../features/createEvent/schemas/createEventValidationSchema";

export default function CreateEventPage() {
  const token = authStore((state: any) => state.token);
  const [artists, setArtists] = useState([]);
  const [success, setSuccess] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [isRange, setIsRange] = useState(false);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const getAllArtists = async () => {
    try {
      const response = await instance.get("/artists");
      setArtists(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllArtists();
  }, []);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const formData = new FormData();
      const eventDetails = {
        name: values.name,
        city: values.city,
        venue: values.venue,
        category: values.category,
        price: Number(values.price),
        description: values.description,
        availableSeats: Number(values.availableSeats),
        type: values.type,
        artistId: Number(values.artistId),
        organizerProfileId: Number(values.organizerProfileId),
        date: isRange
          ? { start: dateRange[0], end: dateRange[1] }
          : selectedDate,
      };

      formData.append("data", JSON.stringify(eventDetails));

      if (bannerFile) {
        formData.append("bannerUrl", bannerFile);
      }

      const res = await instance.post("events/create-events", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        setSuccess(true);
        resetForm();
      } else {
        alert("Failed to create event.");
      }
    } catch (err) {
      console.error("Error on submit:", err);
      alert("Failed to create event.");
    }
  };

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setBannerFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black px-4 md:px-8 pt-4 pb-8">
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Create Event</h1>
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg">
          <Formik
            initialValues={{
              name: "",
              bannerUrl: null,
              city: "",
              venue: "",
              category: "",
              price: 0,
              description: "",
              availableSeats: 1,
              type: "PAID",
              artistId: "",
              organizerProfileId: "",
            }}
            validationSchema={createEventValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                {/* Event Name */}
                <FieldGroup label="Event Name" name="name" />

                {/* City */}
                <FieldGroup label="City" name="city" />

                {/* Venue */}
                <FieldGroup label="Venue" name="venue" />

                {/* Category */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <label htmlFor="category" className="font-medium">
                    Category
                  </label>
                  <Field
                    name="category"
                    placeholder="Category"
                    className="input input-bordered col-span-2 w-full bg-white text-black placeholder:text-gray-400 border-black"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Price */}
                <FieldGroup label="Price" name="price" type="number" />

                {/* Description */}
                <FieldGroup label="Description" name="description" isTextArea />

                {/* Available Seats */}
                <FieldGroup
                  label="Available Seats"
                  name="availableSeats"
                  type="number"
                />

                {/* Event Type */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <label htmlFor="type" className="font-medium">
                    Event Type
                  </label>
                  <div className="col-span-2">
                    <Field
                      as="select"
                      name="type"
                      className="select select-bordered w-full bg-white text-black border-black"
                    >
                      <option value="PAID">Paid</option>
                      <option value="FREE">Free</option>
                    </Field>
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <label htmlFor="date" className="font-medium mt-2">
                    Event Dates
                  </label>
                  <div className="col-span-2 space-y-4">
                    <div className="flex items-center gap-4">
                      <label className="label cursor-pointer">
                        <span className="label-text mr-2">Single Date</span>
                        <input
                          type="radio"
                          name="dateType"
                          className="radio radio-primary"
                          checked={!isRange}
                          onChange={() => setIsRange(false)}
                        />
                      </label>
                      <label className="label cursor-pointer">
                        <span className="label-text mr-2">Date Range</span>
                        <input
                          type="radio"
                          name="dateType"
                          className="radio radio-primary"
                          checked={isRange}
                          onChange={() => setIsRange(true)}
                        />
                      </label>
                    </div>

                    {isRange ? (
                      <DatePicker
                        selectsRange
                        startDate={dateRange[0]}
                        endDate={dateRange[1]}
                        onChange={setDateRange}
                        isClearable
                        placeholderText="Select date range"
                        className="input input-bordered w-full bg-white text-black placeholder:text-gray-400 border-black"
                        required
                        minDate={new Date()}
                      />
                    ) : (
                      <DatePicker
                        selected={selectedDate}
                        onChange={setSelectedDate}
                        isClearable
                        placeholderText="Select event date"
                        className="input input-bordered w-full bg-white text-black placeholder:text-gray-400 border-black"
                        required
                        minDate={new Date()}
                      />
                    )}
                  </div>
                </div>

                {/* Banner File Upload */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <label htmlFor="bannerUrl" className="font-medium">
                    Event Banner
                  </label>
                  <div className="col-span-2">
                    <input
                      type="file"
                      id="bannerUrl"
                      name="bannerUrl"
                      accept="image/*"
                      className="file-input file-input-bordered w-full"
                      onChange={handleBannerChange}
                    />
                    {bannerFile && (
                      <p className="mt-2 text-sm text-gray-500">
                        {bannerFile.name}
                      </p>
                    )}
                    <ErrorMessage
                      name="bannerUrl"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Artist */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <label htmlFor="artistId" className="font-medium">
                    Artist
                  </label>
                  <div className="col-span-2">
                    <Field
                      as="select"
                      name="artistId"
                      className="select select-bordered w-full bg-white text-black border-black"
                    >
                      <option value="">Select an artist</option>
                      {artists.map((artist: any) => (
                        <option key={artist.id} value={artist.id}>
                          {artist.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="artistId"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end mt-8">
                  <button
                    type="submit"
                    className="btn btn-primary px-8 py-3 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Create Event"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

const FieldGroup = ({
  label,
  name,
  type = "text",
  isTextArea = false,
}: {
  label: string;
  name: string;
  type?: string;
  isTextArea?: boolean;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
    <label htmlFor={name} className="font-medium">
      {label}
    </label>
    <div className="col-span-2">
      {isTextArea ? (
        <Field
          as="textarea"
          name={name}
          className="textarea textarea-bordered w-full bg-white text-black placeholder:text-gray-400 border-black"
        />
      ) : (
        <Field
          type={type}
          name={name}
          className="input input-bordered w-full bg-white text-black placeholder:text-gray-400 border-black"
        />
      )}
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  </div>
);
