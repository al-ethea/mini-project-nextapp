"use client";

// msh ada bug di toastnya-> jdi dua kali
// dr mail klik link msh attendee role nya
import instance from "@/utils/axiosInstance";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import authStore from "@/zustand/store";

export default function verifyEmailPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;
  const router = useRouter();
  const setAuth = authStore((state: any) => state.setAuth);

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
      setAuth({ _token: null, _email: null, _role: null });
      toast.success(response.data.message);

      router.push("/login"); // Redirect to the desired page after successful verification
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
