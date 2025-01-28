import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay="100ms">
      <div className="blog-one__single">
        <div className="blog-one__img-box">
          <div className="blog-one__img">
            <img src={post.image} alt="@@title" />
            <img src={post.image} alt="@@title" />
            <Link to={`/post/${post.slug}`} className="blog-one__link">
              <span className="sr-only"></span>
            </Link>
          </div>
          <div className="blog-one__date">
            <p>
              12
              <br />
              Nov
            </p>
          </div>
        </div>
        <div className="blog-one__content">
          <div className="blog-one__user">
            <p>
              <span className="icon-user"></span>By Admin
            </p>
          </div>
          <h3 className="blog-one__title">
            <Link to={`/post/${post.slug}`}>{post.title}</Link>
          </h3>
          <Link to={`/post/${post.slug}`} className="blog-one__learn-more" aria-label={`Learn more about the service: ${post.title}`}>
            View Details<span className="icon-arrow-right"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
