import { Link } from 'react-router-dom';
export default function ServiceHighlight() {
    return (
        <>
        {/*Services One Start */}
        <section className="services-one">
            <div className="container">
                <div className="services-one__inner">
                    <ul className="services-one__service-list list-unstyled">
                        <li className="wow fadeInLeft" data-wow-delay="100ms">
                            <div className="services-one__single">
                                <div className="services-one__icon">
                                    <span className="icon-affordable-price"></span>
                                </div>
                                <h3 className="services-one__title"><Link to="pricing">Affordable Price</Link></h3>
                                <p className="services-one__text">We offer competitive pricing for <br/> high-quality car batteries and services.</p>
                            </div>
                        </li>
                        <li className="wow fadeInUp" data-wow-delay="200ms">
                            <div className="services-one__single">
                                <div className="services-one__icon">
                                    <span className="icon-setting"></span>
                                </div>
                                <h3 className="services-one__title"><Link to="about">100% Guarantee</Link></h3>
                                <p className="services-one__text">All our batteries come with a 100% guarantee <br/> for performance and reliability.</p>
                            </div>
                        </li>
                        <li className="wow fadeInRight" data-wow-delay="300ms">
                            <div className="services-one__single">
                                <div className="services-one__icon">
                                    <span className="icon-services"></span>
                                </div>
                                <h3 className="services-one__title"><Link to="contact">24/7 Our Service</Link></h3>
                                <p className="services-one__text">Available 24/7 for emergency battery replacement <br/> and roadside assistance.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
       {/*Services One End */}
    
        </>
    )
}
