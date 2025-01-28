'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useEffect, useState } from 'react';
const apiUrl = import.meta.env.VITE_BASE_URL;

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 5,
    spaceBetween: 30,
    
    loop: true,
    autoplay: {
        delay: 2000, // Delay in milliseconds (3000ms = 3 seconds)
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
            slidesPerView: 2,
            
        },
        767: {
            slidesPerView: 3,
            
        },
        991: {
            slidesPerView: 3,
            
        },
        1199: {
            slidesPerView: 5,
            
        },
        1350: {
            slidesPerView: 5,
            
        },
    }



}



export default function Brand() {

    const [brands, setBrand] = useState([]);

    useEffect(() => {
        const fetchBrand = async () => {
          const res = await fetch(`${apiUrl}/api/brand/getbrands`);
          const brand_list = await res.json();
          setBrand(brand_list.brands);
          
        };
        fetchBrand();
      }, []);

    return (
        <>

        {/*Brand One Start*/}
        <section className="brand-one">
            <div className="container">
                <div className="brand-one__inner">
                    <Swiper {...swiperOptions} className="brand-one__carousel owl-theme owl-carousel">
                    {brands && brands.length > 0 && (
                        <div>
                            { brands?.map((brand, index) => (
                            <div key={index}>
                                <SwiperSlide>
                        {/*Brand One Single*/}
                        <div className="brand-one__single">
                            <div className="brand-one__img">
                                <img src={brand.image} alt={brand.title}/>
                            </div>
                        </div>
                        </SwiperSlide>
                </div>
                )) }
                </div>
            )}
                    </Swiper>
                    {/* If we need navigation buttons */}
                </div>
            </div>
        </section>
        {/*Brand One End*/}
        
        </>
    )
}
