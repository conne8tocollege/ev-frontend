import Link from "next/link"
export default function Project() {
    return (
    <> 
        {/*Project One Start*/}
        <section className="project-one">
            <div className="container">
                <div className="project-one__top">
                    <div className="section-title text-left">
                        <div className="section-title__tagline-box">
                            <span className="section-title__tagline">Our Gallery</span>
                        </div>
                        <div className="section-title__title-box sec-title-animation animation-style2">
                            <h2 className="section-title__title title-animation">Your Brightest <br/>Choice in Repairs</h2>
                        </div>
                    </div>
                    <div className="project-one__btn-box">
                        <Link to="projects" className="project-one__btn thm-btn">all Gallery</Link>
                    </div>
                </div>
                <div className="row">
                    {/*Project One Single Start*/}
                    <div className="col-xl-6 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="100ms">
                        <div className="project-one__single">
                            <div className="project-one__img-box">
                                <div className="project-one__img">
                                    <img src="assets/images/project/project-1-1.jpg" alt=""/>
                                    <div className="project-one__arrow">
                                        <Link to="assets/images/project/project-1-1.jpg" className="img-popup"><span
                                                className="icon-arrow-right"></span></Link>
                                    </div>
                                </div>
                                <div className="project-one__content">
                                    <p className="project-one__sub-title">Express Electric</p>
                                    <h3 className="project-one__title"><Link to="project-details">debris stuck in the
                                            outdoor</Link></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Project One Single End*/}
                    {/*Project One Single Start*/}
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                        <div className="project-one__single">
                            <div className="project-one__img-box">
                                <div className="project-one__img">
                                    <img src="assets/images/project/project-1-2.jpg" alt=""/>
                                    <div className="project-one__arrow">
                                        <Link to="assets/images/project/project-1-2.jpg" className="img-popup"><span
                                                className="icon-arrow-right"></span></Link>
                                    </div>
                                </div>
                                <div className="project-one__content">
                                    <p className="project-one__sub-title">Express Electric</p>
                                    <h3 className="project-one__title"><Link to="project-details">debris stuck in the
                                            outdoor</Link></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Project One Single End*/}
                    {/*Project One Single Start*/}
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="600ms">
                        <div className="project-one__single">
                            <div className="project-one__img-box">
                                <div className="project-one__img">
                                    <img src="assets/images/project/project-1-3.jpg" alt=""/>
                                    <div className="project-one__arrow">
                                        <Link to="assets/images/project/project-1-3.jpg" className="img-popup"><span
                                                className="icon-arrow-right"></span></Link>
                                    </div>
                                </div>
                                <div className="project-one__content">
                                    <p className="project-one__sub-title">Express Electric</p>
                                    <h3 className="project-one__title"><Link to="project-details">debris stuck in the
                                            outdoor</Link></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Project One Single End*/}
                    {/*Project One Single Start*/}
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="900ms">
                        <div className="project-one__single">
                            <div className="project-one__img-box">
                                <div className="project-one__img">
                                    <img src="assets/images/project/project-1-4.jpg" alt=""/>
                                    <div className="project-one__arrow">
                                        <Link to="assets/images/project/project-1-4.jpg" className="img-popup"><span
                                                className="icon-arrow-right"></span></Link>
                                    </div>
                                </div>
                                <div className="project-one__content">
                                    <p className="project-one__sub-title">Express Electric</p>
                                    <h3 className="project-one__title"><Link to="project-details">debris stuck in the
                                            outdoor</Link></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Project One Single End*/}
                    {/*Project One Single Start*/}
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="1000ms">
                        <div className="project-one__single">
                            <div className="project-one__img-box">
                                <div className="project-one__img">
                                    <img src="assets/images/project/project-1-5.jpg" alt=""/>
                                    <div className="project-one__arrow">
                                        <Link to="assets/images/project/project-1-5.jpg" className="img-popup"><span
                                                className="icon-arrow-right"></span></Link>
                                    </div>
                                </div>
                                <div className="project-one__content">
                                    <p className="project-one__sub-title">Express Electric</p>
                                    <h3 className="project-one__title"><Link to="project-details">debris stuck in the
                                            outdoor</Link></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Project One Single End*/}
                    {/*Project One Single Start*/}
                    <div className="col-xl-6 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="1100ms">
                        <div className="project-one__single">
                            <div className="project-one__img-box">
                                <div className="project-one__img">
                                    <img src="assets/images/project/project-1-6.jpg" alt=""/>
                                    <div className="project-one__arrow">
                                        <Link to="assets/images/project/project-1-6.jpg" className="img-popup"><span
                                                className="icon-arrow-right"></span></Link>
                                    </div>
                                </div>
                                <div className="project-one__content">
                                    <p className="project-one__sub-title">Express Electric</p>
                                    <h3 className="project-one__title"><Link to="project-details">debris stuck in the
                                            outdoor</Link></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Project One Single End*/}
                </div>
            </div>
        </section>
        {/*Project One End*/}
        
        </>
    )
}
