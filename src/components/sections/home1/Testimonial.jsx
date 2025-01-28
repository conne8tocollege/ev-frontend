'use client'
import { Link } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useEffect, useState } from 'react';
const apiUrl = import.meta.env.VITE_BASE_URL;

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 2,
    spaceBetween: 30,
    
    loop: true,
    autoplay: {
        delay: 3000, // Delay in milliseconds (3000ms = 3 seconds)
        disableOnInteraction: false, // Keep autoplay running after user interactions
    },
    // Navigation
    navigation: {
        nextEl: '.srn',
        prevEl: '.srp',
    },

    // Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            
        },
        575: {
            slidesPerView: 1,
            
        },
        767: {
            slidesPerView: 1,
            
        },
        991: {
            slidesPerView: 2,
            
        },
        1199: {
            slidesPerView: 2,
            
        },
        1350: {
            slidesPerView: 2,
            
        },
    }



}


export default function Testimonial() {
    const [testimonials, setTestimonial] = useState([]);

    useEffect(() => {
        const fetchTestimonial = async () => {
          const res = await fetch(`${apiUrl}/api/testimonial/getTestimonials`);
          const testimonial_list = await res.json();
          setTestimonial(testimonial_list.testimonials);
        //   console.log(testimonials);
        };
        fetchTestimonial();
      }, []);

    return (
        <>
        {/*Testimonial One Start */}
        <section className="testimonial-one">
            <div className="container">
                <Swiper {...swiperOptions} className="testimonial-one__carousel owl-theme owl-carousel">
                {testimonials && testimonials.length > 0 && (
                <div>
                { testimonials?.map((testimonial, index) => (
                    <div key={index}>
                <SwiperSlide>
                    {/*Testimonial One Single Start*/}
                    <div className="item">
                        <div className="testimonial-one__single">
                            <div className="testimonial-one__img">
                                <img src={testimonial.image} alt={testimonial.title}/>
                            </div>
                            <div className="testimonial-one__content">
                                <div className="testimonial-one__quote">
                                    <span className="icon-quote"></span>
                                </div>
                                <p className="testimonial-one__text" ><div dangerouslySetInnerHTML={{ __html: testimonial.content }} /> </p>
                                <div className="testimonial-one__ratting">
                                {/* {testimonial.count >= 1 && testimonial.count <= 5 ? (
                                    Array.from({ length: testimonial.count }, (_, index) => (
                                        <span key={index} className="fas fa-star"></span>
                                    ))
                                ) : null} */}
                                <span className="fas fa-star"></span>
                                <span className="fas fa-star"></span>
                                <span className="fas fa-star"></span>
                                <span className="fas fa-star"></span>
                                <span className="fas fa-star"></span>
                                </div>
                                <div className="testimonial-one__client-info">
                                    <h3>{testimonial.title}</h3>
                                    <p>{testimonial.destination}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Testimonial One Single End*/}
                    </SwiperSlide>
                </div>
                )) }
                </div>
            )}
                </Swiper> 
            </div>
        </section>
        {/*Testimonial One End */}
       

            
        </>
    )
}
