import { Link } from "react-router-dom";
import ctaImage from "/assets/images/cta-one-img-2.png";
export default function Cta() {
  return (
    <>
      {/*CTA One Start*/}
      <section className="cta-one">
        <div className="container">
          <div className="cta-one__inner wow fadeInUp" data-wow-delay="300ms">
            <div className="cta-one__img">
              <img src={ctaImage} alt="" />
            </div>
            <div className="section-title text-left">
              <div className="section-title__tagline-box">
                <span className="section-title__tagline">Contact Now</span>
              </div>
              <div className="section-title__title-box sec-title-animation animation-style2">
                <h2 className="section-title__title title-animation">
                  Get Quick Solution
                </h2>
              </div>
            </div>
            <p className="cta-one__text">
              Discover reliable car battery services with 800 B Battery. <br />
              We provide fast, affordable, and expert assistance to keep <br />{" "}
              you on the road.
            </p>
            <div className="cta-one__btn-and-call-box">
              <div className="cta-one__btn-box">
                <Link to={"/contact-us"} className="cta-one__btn thm-btn">
                  Enquire Now
                </Link>
              </div>
              <div className="cta-one__call-box">
                <div className="icon">
                  <a href="tel:+8002272633" className="flex justify-center items-center">
                     <span className="icon-call"></span>
                  </a>
                 
                </div>
                <div className="content">
                  <p>Toll Free</p>
                  <h4>
                    <Link to="tel:+8002272633">800 227 2633</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*CTA One End*/}
    </>
  );
}
