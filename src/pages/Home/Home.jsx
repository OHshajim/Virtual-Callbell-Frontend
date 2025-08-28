import {
  PhoneCall,
  QrCode,
  ShieldCheck,
  Users,
  Server,
  Star,
  FileText,
} from "lucide-react";
import GuestModal from "../../components/welcomeModal/WelcomeModal";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      
      {/* Navbar */}
      <header className="w-full sticky top-0 z-50 shadow-md bg-white">
        <Navbar />
      </header>

      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(banner2.jpg)",
        }}>
        <div className="hero-overlay opacity-30"></div>
        <div className="hero-content text-neutral-content text-center">
          <img src="mainBanner.jpg" className="w-full  md:h-[85vh]"/>
        </div>
      </div>

      {/* Features Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <PhoneCall className="mx-auto text-indigo-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">
                Instant Calls
              </h3>
              <p className="text-gray-600 text-center">
                Start a call with a single click, anytime and anywhere.
              </p>
            </div>
            <div className="p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <QrCode className="mx-auto text-indigo-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">
                QR Scanner Integration
              </h3>
              <p className="text-gray-600 text-center">
                Scan codes to connect instantly with users or services.
              </p>
            </div>
            <div className="p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <ShieldCheck className="mx-auto text-indigo-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">
                Secure Connections
              </h3>
              <p className="text-gray-600 text-center">
                End-to-end encrypted calls for complete privacy and safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="px-6 py-24 bg-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            Website Roles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <Users className="mx-auto text-indigo-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Guest
              </h3>
              <p className="text-gray-600">
                Explore features, scan QR codes, and initiate calls
                effortlessly.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <Users className="mx-auto text-indigo-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Registered User
              </h3>
              <p className="text-gray-600">
                Access dashboard, receive calls, and manage notifications.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <Users className="mx-auto text-indigo-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Admin
              </h3>
              <p className="text-gray-600">
                Manage users, monitor activity, and control system settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <FileText className="mx-auto text-indigo-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Step 1: Register
              </h3>
              <p className="text-gray-600">
                Create an account and verify your details quickly and easily.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <QrCode className="mx-auto text-indigo-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Step 2: Scan or Invite
              </h3>
              <p className="text-gray-600">
                Scan QR codes or invite users to start instant communication.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <PhoneCall className="mx-auto text-indigo-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Step 3: Connect
              </h3>
              <p className="text-gray-600">
                Start secure calls with crystal-clear quality and ease of use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Section */}
      <section className="px-6 py-24 bg-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <Server className="mx-auto text-indigo-500 mb-6" size={48} />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our System
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl">
            Robust, secure, and scalable platform supporting real-time
            communication, QR scanning, and dashboard management.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-6 py-24 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Experience Seamless Calls?
        </h2>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
          Join CallBell today and enjoy professional, instant, and
          secure calling features.
        </p>
        <div className="flex justify-center gap-4">
          <GuestModal />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <Star className="mx-auto text-indigo-500 mb-4" size={48} />
              <p className="text-gray-600 mb-4">
                “The platform is super easy to use, and QR scanning makes
                communication instant!”
              </p>
              <h4 className="text-gray-800 font-semibold">Jane Doe</h4>
            </div>
            <div className="p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <Star className="mx-auto text-indigo-500 mb-4" size={48} />
              <p className="text-gray-600 mb-4">
                “Secure calls and fast connections make my work life easier
                every day.”
              </p>
              <h4 className="text-gray-800 font-semibold">John Smith</h4>
            </div>
            <div className="p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <Star className="mx-auto text-indigo-500 mb-4" size={48} />
              <p className="text-gray-600 mb-4">
                “Professional and intuitive. I can connect with clients without
                any hassle.”
              </p>
              <h4 className="text-gray-800 font-semibold">Alice Lee</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
