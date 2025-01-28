import { Link } from "react-router-dom";

export default function ProductCard({ productrecent }) {
  return (
    <div
      className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
      data-wow-delay="100ms"
    >
       <Link
        to={`/product/${productrecent && productrecent.slug}`}
        className="shop-page-one-single"
        aria-label={`View details for ${productrecent && productrecent.title}`}
      >
      <div className="shop-page-one-single">
        <div className="img-box">
          <img
            src={productrecent && productrecent.image}
            alt={productrecent && productrecent.title}
          />
          {/* <div className="rate-box">
            <h4>Best Product</h4>
          </div> */}
        </div>
        <div className="content-box">
          <div className="title">
            <h3>
              <Link to={`/product/${productrecent && productrecent.slug}`} aria-label={`Learn more ${productrecent && productrecent.title}`}>{productrecent && productrecent.title}</Link>
            </h3>
          </div>
          <div className="bottom-box">
            <div className="btn-box">
              <Link to={`/product/${productrecent && productrecent.slug}`} aria-label={`Learn more ${productrecent && productrecent.slug}`}>
                <i className="fa fa fa-arrow-right"></i>
                View Product
              </Link>
            </div>
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
}
