import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-black pt-4 pb-4 px-8"> {/* Increased top padding */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Live Nation Links */}
          <div className="flex flex-col items-center md:items-start pt-4 mt-4"> {/* Added padding and margin top */}
            <h3 className="text-xl font-semibold mb-6 w-full text-center md:text-left">Live Nation</h3>
            <ul className="space-y-1 w-full text-center md:text-left"> {/* Increased space between items */}
              {[
                'About Us',
                'FAQ',
                'Terms and Conditions',
                'Privacy Policy',
                'Sustainability Charter',
                'Cookie Policy',
              ].map((item) => (
                <li key={item} className="hover:text-red-500 cursor-pointer py-1"> {/* Added vertical padding */}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center pt-4 mt-4"> {/* Added padding and margin top */}
            <h3 className="text-xl font-semibold mb-6 w-full text-center">Quick Links</h3>
            <ul className="space-y-1 w-full text-center"> {/* Increased space between items */}
              {[
                'All Concerts & Events',
                'Festivals',
                'VIP Experiences',
                'My Live Nation',
                'Members Pre-sale',
                'Contact Us',
                'Manage Preferences',
              ].map((item) => (
                <li key={item} className="hover:text-red-500 cursor-pointer py-1"> {/* Added vertical padding */}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Section */}
          <div className="flex flex-col items-center pt-4 mt-4"> {/* Added padding and margin top */}
            <div className="w-full text-center">
              <h3 className="text-xl font-semibold mb-6">Live Nation International</h3>
              <p className="hover:text-red-500 cursor-pointer py-1 mb-8">Asia</p> {/* Added padding and margin */}

              <h3 className="text-xl font-semibold mb-6">Follow Live Nation</h3>
              <div className="flex justify-center space-x-6"> {/* Increased space between icons */}
                <FaFacebook className="text-2xl hover:text-red-500 cursor-pointer" />
                <FaTwitter className="text-2xl hover:text-red-500 cursor-pointer" />
                <FaInstagram className="text-2xl hover:text-red-500 cursor-pointer" />
                <FaYoutube className="text-2xl hover:text-red-500 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-12"></div> {/* Increased margin */}

        {/* Copyright */}
        <p className="text-center text-gray-400 mt-8"> {/* Added margin top */}
          © {new Date().getFullYear()} Live Nation Entertainment. All rights reserved.
        </p>
      </div>
    </footer>
  );
};