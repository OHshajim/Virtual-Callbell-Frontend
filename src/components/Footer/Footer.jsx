import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-gray-300">
      <footer className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Section */}
        <div>
          <img src="/icon.png" alt="CallBell Logo" className="h-12 mb-4 " />
          <h2 className="text-xl font-semibold text-white font-serif">CallBell</h2>
          <p className="mt-3 text-sm leading-6">
            Tara Tower, Polytechnic Crossing, Jaunpur (UP) 222002 <br />
            <span className="block mt-1">📞 +91-8299065387</span>
          </p>
        </div>

        {/* Services */}
        <div>
          <h6 className="text-lg font-semibold text-white mb-4">Services</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">
                We build branded Android apps for you
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">
                Complete corporate solutions
              </Link>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h6 className="text-lg font-semibold text-white mb-4">Navigate</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl justify-center mx-auto px-6 py-4 flex flex-col md:flex-row  items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Sawamahe. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
