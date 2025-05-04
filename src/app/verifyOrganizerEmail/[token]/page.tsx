"use client";

// msh ada bug di toastnya-> jdi dua kali
// dr mail klik link msh attendee role nya
import instance from "@/utils/axiosInstance";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function verifyEmailPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;
  const router = useRouter();

  const handleVerifyEmail = async () => {
    try {
      const response = await instance.post(
        "/organizer/verify-email",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newToken = response.data.token; // coba ini dulu

      localStorage.setItem("token", newToken); // or use cookies if preferred

      toast.success(response.data.message);

      router.push("/dashboard"); // Redirect to the desired page after successful verification
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    handleVerifyEmail();
  }, []);
  return (
    <>
      <div>
        <h1 className="text-center text-black text-2xl">Verifying email...</h1>
      </div>
    </>
  );
}
