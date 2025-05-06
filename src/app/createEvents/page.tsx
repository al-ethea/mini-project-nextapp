"use client";

import instance from "@/utils/axiosInstance";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import authStore from "@/zustand/store";

export default function CreateEventPage() {
  const token = authStore((state: any) => state.token);

  const [formData, setFormData] = useState({
    name: "",
    bannerUrl: "",
    city: "",
    venue: "",
    date: "",
    category: "",
    price: "",
    description: "",
    availableSeats: "",
    type: "PAID",
    artistId: "",
    organizerProfileId: "",
  });

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isRange, setIsRange] = useState(false);
  const [success, setSuccess] = useState(false);
  const [artists, setArtists] = useState([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === "" || /^\d*$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setFormData((prev) => ({
      ...prev,
      date: date ? date.toISOString() : "",
    }));
  };

  const handleRangeChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
    const [start] = dates;
    setFormData((prev) => ({
      ...prev,
      date: start ? start.toISOString() : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.date) {
        alert("Tanggal acara wajib diisi.");
        return;
      }

      const formattedDateString = new Date(formData.date)
        .toISOString()
        .split("T")[0];
      const finalDate = new Date(formattedDateString);

      const payload = {
        ...formData,
        date: finalDate,
        price: Number(formData.price),
        availableSeats: Number(formData.availableSeats),
        artistId: Number(formData.artistId),
        organizerProfileId: Number(formData.organizerProfileId),
      };

      console.log("Payload yang dikirim:", payload);

      const res = await instance.post("events/create-events", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        setSuccess(true);
        setFormData({
          name: "",
          bannerUrl: "",
          city: "",
          venue: "",
          date: "",
          category: "",
          price: "",
          description: "",
          availableSeats: "",
          type: "PAID",
          artistId: "",
          organizerProfileId: "",
        });
        setSelectedDate(null);
        setDateRange([null, null]);
      } else {
        alert("Failed to create event.");
      }
    } catch (err) {
      console.error("Error on submit:", err);
      alert("Failed to create event.");
    }
  };

  const getAllArtists = async () => {
    try {
      const response = await instance.get("/artists", {});
      console.log(response);
      setArtists(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllArtists();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 text-black px-4 md:px-8 pt-4 pb-8">
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Create Event</h1>
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg">
          {success && (
            <div className="alert alert-success mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Event created successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <label htmlFor="name" className="font-medium">
                Event Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Event Name"
                className="input input-bordered col-span-2 w-full bg-white text-black placeholder:text-gray-400 border-black"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center ">
              <label htmlFor="bannerUrl" className="font-medium">
                Banner URL
              </label>
              <input
                name="bannerUrl"
                value={formData.bannerUrl}
                onChange={handleChange}
                placeholder="Banner URL"
                className="input input-bordered col-span-2 w-full  bg-white text-black placeholder:text-gray-400 border-black"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <label htmlFor="city" className="font-medium">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="input input-bordered col-span-2 w-full bg-white text-black placeholder:text-gray-400 border-black"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <label htmlFor="venue" className="font-medium">
                Venue
              </label>
              <input
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Venue"
                className="input input-bordered col-span-2 w-full  bg-white text-black placeholder:text-gray-400 border-black"
                required
              />
            </div>

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
                    onChange={handleRangeChange}
                    isClearable
                    placeholderText="Select date range"
                    className="input input-bordered w-full bg-white text-black placeholder:text-gray-400 border-black"
                    required
                    minDate={new Date()}
                  />
                ) : (
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    isClearable
                    placeholderText="Select event date"
                    className="input input-bordered w-full bg-white text-black placeholder:text-gray-400 border-black"
                    required
                    minDate={new Date()}
                  />
                )}

                {/* {formData.dates.length > 0 && (
                  <div className="mt-4">
                    <p className="font-semibold mb-2">Selected Dates:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.dates.map((date, i) => (
                        <span key={i} className="badge badge-primary">
                          {new Date(date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <label htmlFor="category" className="font-medium">
                Category
              </label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="input input-bordered col-span-2 w-full  bg-white text-black placeholder:text-gray-400 border-black"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <label htmlFor="price" className="font-medium">
                Price
              </label>
              <div className="col-span-2 relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  $
                </span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="input input-bordered w-full pl-8 bg-white text-black placeholder:text-gray-400 border-black"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <label htmlFor="description" className="font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="textarea textarea-bordered col-span-2 w-full h-32 bg-white text-black placeholder:text-gray-400 border-black"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <label htmlFor="availableSeats" className="font-medium">
                Available Seats
              </label>
              <input
                type="number"
                name="availableSeats"
                value={formData.availableSeats}
                onChange={handleChange}
                placeholder="Available Seats"
                className="input input-bordered col-span-2 w-full bg-white text-black placeholder:text-gray-400 border-black"
                min="1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <label htmlFor="type" className="font-medium">
                Event Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="select select-bordered col-span-2 w-full bg-white text-black placeholder:text-gray-400 border-black"
              >
                <option value="PAID">PAID</option>
                <option value="FREE">FREE</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <label htmlFor="artistId" className="font-medium">
                Artist
              </label>
              {/* <input
                type="number"
                name="artistId"
                value={formData.artistId}
                onChange={handleChange}
                placeholder="Artist ID"
                className="input input-bordered col-span-2 w-full bg-white text-black placeholder:text-gray-400 border-black"
                required
                min="1"
              /> */}
              <select
                name="artistId"
                value={formData.artistId}
                onChange={handleChange}
                className="select select-bordered col-span-2 w-full bg-white text-black placeholder:text-gray-400 border-black"
                required
              >
                <option value="">Select an artist</option>
                {artists.map((artist: any) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <label htmlFor="organizerProfileId" className="font-medium">
                Organizer ID
              </label>
              <input
                type="number"
                name="organizerProfileId"
                value={formData.organizerProfileId}
                onChange={handleChange}
                placeholder="Organizer Profile ID"
                className="input input-bordered col-span-2 w-full bg-white text-black placeholder:text-gray-400 border-black"
                required
                min="1"
              />
            </div> */}

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="btn btn-primary px-8 py-3 text-lg"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
