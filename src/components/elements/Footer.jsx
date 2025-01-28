import { Link } from "react-router-dom";
import Cta from "../sections/home1/Cta";
import { useEffect, useState } from "react";
import FixedRightSidebar from "./FloatingIcons";
import footerLogo from "/assets/images/800bbatterywhite.png";
import QrCode from "/assets/images/GmapCode.jpeg";
const apiUrl = import.meta.env.VITE_BASE_URL;
export default function Footer() {
  const [userServices, setUserServices] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  // const router = useRouter()
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/service/getservices?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setUserServices(data.services);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/product/getproducts?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setUserProducts(data.products);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <Cta />

      <footer className="site-footer">
        <div className="site-footer__shape-1 float-bob-x">
          <img src="assets/images/shapes/800-battery-03.png" alt="" />
        </div>
        <div className="container">
          <div className="site-footer__top">
            <div className="row">
              <div
                className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
                data-wow-delay="100ms"
              >
                <div className="footer-widget__column footer-widget__about">
                  <div className="footer-widget__logo">
                    <Link to="/">
                      <img className="w-56" src={footerLogo} alt="logo" />
                    </Link>
                  </div>
                  <p className="footer-widget__about-text">
                    Get back on the road with our reliable car battery
                    replacement services. Drive stress-free knowing your car
                    battery is in top condition.
                  </p>
                  <div className="site-footer__social">
                    <Link
                      to={
                        "https://www.facebook.com/profile.php?id=61565118175123"
                      } aria-label="facebook icon"
                    >
                      <i className="icon-facebook"></i>
                    </Link>
                    <Link to={"https://www.instagram.com/800b.battery/"} aria-label="instagram icon">
                      <i className="icon-instagram"></i>
                    </Link>
                  </div>
                  <div className="site-footer__social QrCode">
                    <img src={QrCode} alt="logo" />
                  </div>
                </div>
              </div>
              <div
                className="col-xl-2 col-lg-6 col-md-6 wow fadeInUp"
                data-wow-delay="200ms"
              >
                <div className="footer-widget__column footer-widget__usefull-link">
                  <div className="footer-widget__title-box">
                    <h3 className="footer-widget__title">Our Company</h3>
                  </div>
                  <div className="footer-widget__link-box">
                    <ul className="footer-widget__link list-unstyled">
                      <li>
                        <Link to={"/"}>Home</Link>
                      </li>
                      <li>
                        <Link to={"/about"}>About Us</Link>
                      </li>
                      <li>
                        <Link to={"/services"}>Services</Link>
                      </li>
                      <li>
                        <Link to={"/products"}>Products</Link>
                      </li>
                      <li>
                        <Link to={"/blogs"}>Blog</Link>
                      </li>
                      <li>
                        <Link to={"/contact-us"}>Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
                data-wow-delay="300ms"
              >
                <div className="footer-widget__column footer-widget__services">
                  <div className="footer-widget__title-box">
                    <h3 className="footer-widget__title">Our Service</h3>
                  </div>
                  <ul className="footer-widget__link list-unstyled">
                    {userServices?.map((service, index) => (
                      <li key={index}>
                        <Link to={`/service/${service.slug}`}>
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div
                className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
                data-wow-delay="400ms"
              >
                <div className="footer-widget__column footer-widget__contact">
                  <div className="footer-widget__title-box">
                    <h3 className="footer-widget__title">Contact us</h3>
                  </div>
                  <ul className="footer-widget__contact-list list-unstyled">
                    <li>
                      <h3>Address</h3>
                      <div className="content">
                        <p>
                          Al Asayel Street - 160St Warehouse no. 2 - 318th Rd -
                          near Al Ahli Driving school - Al Quoz Industrial Area
                          3 - Dubai
                        </p>
                      </div>
                    </li>
                    <li>
                      <h3>Contact</h3>
                      <div className="content">
                        <p>
                          <Link to="tel:+8002272633">Toll Free: 800 227 2633</Link>
                        </p>
                        <p>
                          <Link to="tel:+971509344668">M: +971 50 934 4668</Link>
                        </p>
                        <p>
                          <Link to="mailto:support@800bbattery.com">
                           E: support@800bbattery.com
                          </Link>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <div className="container">
            <div className="site-footer__bottom-inner mb-4 mb-md-0">
              <p className="site-footer__bottom-text mb-5 mb-md-0">
                Copyright © 2025 by 800 BBattery. All rights reserved.
                Developed by{" "}
                <span>
                  {" "}
                  <Link target="_blank" to="https://www.mightywarner.ae/">
                    Mighty Warners
                  </Link>
                </span>
              </p>
              <ul className="list-unstyled site-footer__bottom-menu">
                {/* <li><Link to="contact">Support</Link></li>
                            <li><Link to="about">Terms and Condition</Link></li>
                            <li><Link to="about">Privacy and Policy</Link></li> */}
              </ul>
            </div>
          </div>
        </div>
        <FixedRightSidebar />
      </footer>
    </>
  );
}
