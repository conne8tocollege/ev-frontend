import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Menu2 from "./Menu2";

const MobileMenu = ({ handleMobileMenu }) => {
  return (
    <div className="fixed md:hidden inset-0 z-20 bg-black bg-opacity-50" onClick={handleMobileMenu} >
      {/* Side slider container */}
      <div
        className="fixed top-0 left-0 w-[70%] h-full bg-black text-[#F2871C] p-4"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-end mb-4">
          <FaTimes onClick={handleMobileMenu} className="text-2xl cursor-pointer" />
        </div>
        
        {/* Menu Links */}
        <Menu2 isMobile={true} />

        {/* Contact Information */}
        <ul className="mt-4 text-sm text-gray-400">
          <li className="flex items-center mb-2">
            <i className="fa fa-envelope text-cyan-400 mr-2"></i>
            <Link
              to="mailto:support@800bbattery.com"
              className="hover:text-cyan-300"
            >
              support@800bbattery.com
            </Link>
          </li>
          <li className="flex items-center">
            <i className="fa fa-phone-alt text-cyan-400 mr-2"> Toll Free </i>
            <Link to="tel:+8002272633" className="hover:text-cyan-300">
            8002272633
            </Link>
          </li>
          <li className="flex items-center  mt-2">
            <i className="fa fa-phone-alt text-cyan-400 mr-2"> Mob </i>
            <Link to="tel:+971509344668" className="hover:text-cyan-300">
              +971 50934 4668
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
