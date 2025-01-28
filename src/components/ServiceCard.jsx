import { Link } from "react-router-dom";

export default function ServiceCard({ post }) {
  return (
    <div className="col-lg-6 wow fadeInLeft" data-wow-delay="100ms">
      <div className="services-two__single">
        <div className="services-two__icon">
          <img src={post.image} alt={`${post.title}`} />
        </div>
        <p className="services-two__sub-title">Service</p>
        <h3 className="services-two__title">
          <Link to={`/service/${post.slug}`} aria-label={`Learn more about the service: ${post.title}`}>{post.title}</Link>
        </h3>
        <p className="services-two__text">{post.short_description}</p>
        <Link to={`/service/${post.slug}`} className="services-two__learn-more" aria-label={`Learn more about the service: ${post.title}`}>
          View Details<span className="icon-arrow-right"></span>
        </Link>
      </div>
    </div>
  );
}
