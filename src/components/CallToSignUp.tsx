import Image from 'next/image';


export default function CallToSignUp() {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image with Overlay using Next.js Image component */}
      <div className="absolute inset-0">
        <Image
          src={'/calltosignup.jpg'}
          alt="Concert background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div> {/* Overlay */}
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center p-6 text-white">
        <div className="text-center backdrop-blur-sm bg-black/30 p-12 rounded-xl">
          <h1 className="text-4xl font-bold mb-6">
            Sign Up For Exclusive Presales and more!
          </h1>
          
          <p className="text-xl mb-8">
            Register with Live Nation Asia to be amongst the first to buy Presale tickets<br />
            to the hottest shows in town! Plus receive the latest events and special offers<br />
            straight to your inbox.
          </p>

          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}