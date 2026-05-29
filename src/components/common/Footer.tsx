import bookImage from "../../assets/image/bookImage.png";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoFacebook } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 sm:grid-cols-3 items-start">
        
        {/* Logo Section */}
        <div>
          <img className="h-20 w-auto mb-3" src={bookImage} alt="Library logo" />
          <p className="text-sm text-gray-400">
            Your digital book library.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Contacts</h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>📞 +47 585 84849</li>
            <li><TfiEmail className="inline" /> booklibrary@gmail.com</li>
            <li><a href=""><IoLogoFacebook className="inline"  /> Facebook</a></li>
           <li><a href=""><BsTwitterX className="inline" /> Twitter</a></li>
          </ul>
        </div>

        {/* Address Section */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Address</h2>
          <p className="text-sm text-gray-300">Sõpruse Pst 220</p>
          <p className="text-sm text-gray-300">13416, Harjumaa</p>
          <p className="text-sm text-gray-300">Tallinn, Estonia</p>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} Book Library. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
