import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_BASE_URL;
export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${apiUrl}/api/post/getPosts?limit=3`);
      const blogpost = await res.json();
      setPosts(blogpost.posts);
    };
    fetchPosts();
  }, []);

  return (
    <>
      {/*Blog One Start*/}
      {posts && posts.length > 0 && (
        <section className="blog-one pt-3">
          <div className="container">
            <div className="blog-one__top">
              <div className="section-title text-left">
                <div className="section-title__tagline-box">
                  <span className="section-title__tagline">blog & News</span>
                </div>
                <div className="section-title__title-box sec-title-animation animation-style2">
                  <h2 className="section-title__title title-animation">
                    Your Brightest Choice
                    <br /> in Repairs
                  </h2>
                </div>
              </div>
              <div className="blog-one__btn-box">
                <Link to="blogs" className="blog-one__btn thm-btn">
                  View all Blog
                </Link>
              </div>
            </div>
            <div className="row">
              {/*Blog One Single Start*/}
              {posts?.map((post, index) => (
                <div
                  key={index}
                  className="col-xl-4 col-lg-4 wow fadeInUp"
                  data-wow-delay="100ms"
                >
                  <div className="blog-one__single">
                    <div className="blog-one__img-box">
                      <div className="blog-one__img">
                        <img src={post.image} alt="@@title" />
                       
                        <Link
                          to={`/post/${post.slug}`}
                          className="blog-one__link" aria-label="blog post"
                        >
                          <span className="sr-only"></span>
                        </Link>
                      </div>
                      {/* <div className="blog-one__date">
                                    <p>12<br/>Nov</p>
                                </div> */}
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
                      <Link
                        to={`/post/${post.slug}`}
                        className="blog-one__learn-more"
                        aria-label={`Learn more ${post.title}`}
                      >
                        View Details<span className="icon-arrow-right"></span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
