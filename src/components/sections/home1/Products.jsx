'use client'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ServiceCard from '../../ServiceCard';
const apiUrl = import.meta.env.VITE_BASE_URL;

export default function Products() {
    const getLimitedContent = (content) => {
        if (!content) return '';
        const words = content.split(/\s+/); // Split by whitespace
        const limitedWords = words.slice(0, 18).join(' '); // Get first 50 words
        return limitedWords + (words.length > 18 ? '...' : ''); // Add ellipsis if truncated
      };

    const [products, setProductss] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        const res = await fetch(`${apiUrl}/api/product/getProducts?limit=6`);
        const blogpost = await res.json();
        setProductss(blogpost.products);
      };
      fetchProducts();
    }, []);

    return (
        <>
      
        {/*Services Four Start*/}
        <section className="services-four">
            <div className="services-four-shape-1 float-bob-x">
                <img src="assets/images/shapes/services-four-shape-1.png" alt=""/>
            </div>
            <div className="services-four-shape-2 float-bob-y">
                <img src="assets/images/shapes/services-four-shape-2.png" alt=""/>
            </div>
            <div className="container">
                <div className="section-title-three text-center sec-title-animation animation-style1">
                    <div className="section-title-three__tagline-box justify-content-center">
                        <div className="section-title-three__tagline-shape"></div>
                        <span className="section-title-three__tagline">Our Products</span>
                        <div className="section-title-three__tagline-shape"></div>
                    </div>
                    <h2 className="section-title-three__title title-animation">Our Efficient Products</h2>
                </div>
                <div className="row">
                    {/*Services One Single Start*/}
                    {products.map((product) => (
                        
                        <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay="100ms"  key={product._id}>
                            <Link to={`/product/${product.slug}`}>
                        <div className="services-four__single">
                            <div className="services-four__img">
                                <img src={product.image} alt={`${product.title}`}/>
                            </div>
                            <div className="services-four__content">
                                <h3 className="services-four__title"><Link to={`/product/${product.slug}`}>{product.title}</Link></h3>
                                <p className="services-four__text"><div
                                        className="max-w-2xl mx-auto w-full post-content"
                                        dangerouslySetInnerHTML={{
                                            __html: getLimitedContent(product && product.content),
                                        }}
                                    ></div>
                                    </p>
                                <div className="services-four__btn-box">
                                    <Link to={`/product/${product.slug}`} className="thm-btn services-four__btn">View Product</Link>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>

                      
   
                    ))}

                </div>
            </div>
        </section>
        {/*Services Four End*/}
       
        </>
    )
}
