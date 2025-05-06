"use client";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();

  if (pathName === "/login" || pathName === "/register") return null;

  return (
    <footer className="bg-white text-black pt-6 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Live Nation Links */}
          <div className="flex flex-col items-center md:items-start pt-4 mt-4">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 w-full text-center md:text-left">
              Live Nation
            </h3>
            <ul className="space-y-1 w-full text-center md:text-left text-sm sm:text-base">
              {[
                "About Us",
                "FAQ",
                "Terms and Conditions",
                "Privacy Policy",
                "Sustainability Charter",
                "Cookie Policy",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-red-500 cursor-pointer py-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center pt-4 mt-4">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 w-full text-center">
              Quick Links
            </h3>
            <ul className="space-y-1 w-full text-center text-sm sm:text-base">
              {[
                "All Concerts & Events",
                "Festivals",
                "VIP Experiences",
                "My Live Nation",
                "Members Pre-sale",
                "Contact Us",
                "Manage Preferences",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-red-500 cursor-pointer py-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Section */}
          <div className="flex flex-col items-center pt-4 mt-4">
            <div className="w-full text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                Live Nation International
              </h3>
              <p className="hover:text-red-500 cursor-pointer py-1 mb-6 sm:mb-8">
                Asia
              </p>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                Follow Live Nation
              </h3>
              <div className="flex justify-center space-x-4 sm:space-x-6">
                <FaFacebook className="text-xl sm:text-2xl hover:text-red-500 cursor-pointer" />
                <FaTwitter className="text-xl sm:text-2xl hover:text-red-500 cursor-pointer" />
                <FaInstagram className="text-xl sm:text-2xl hover:text-red-500 cursor-pointer" />
                <FaYoutube className="text-xl sm:text-2xl hover:text-red-500 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8 sm:my-12"></div>

        {/* Copyright */}
        <p className="text-center text-gray-400 text-sm sm:text-base mt-6">
          © {new Date().getFullYear()} Live Nation Entertainment. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
