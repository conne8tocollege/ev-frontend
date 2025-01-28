import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ServiceCard from "../../ServiceCard";
const apiUrl = import.meta.env.VITE_BASE_URL;
export default function Service() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch(`${apiUrl}/api/service/getServices`);
      const blogpost = await res.json();
      setServices(blogpost.services);
    };
    fetchServices();
  }, []);

  return (
    <>
      {/*Services Two Start */}
      <section className="services-two pt-5">
        <div className="container">
          <div className="section-title text-center">
            <div className="section-title__tagline-box">
              <span className="section-title__tagline">Our Services</span>
            </div>
            <div className="section-title__title-box sec-title-animation animation-style1">
              <h2 className="section-title__title title-animation">
                Current Solutions for Your
                <br /> Modern Problems
              </h2>
            </div>
          </div>
          <div className="row">
            {services?.map((post) => (
              <ServiceCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </section>
      {/*Services Two End */}
    </>
  );
}
