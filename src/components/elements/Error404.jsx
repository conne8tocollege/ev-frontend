import { Link } from "react-router-dom";


export default function Error404() {
  return (
    <>
     
        {/* Error Page Start */}
        <section className="error-page">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="error-page__inner">
                  <div className="error-page__title-box">
                    <h2 className="error-page__title">404</h2>
                  </div>
                  <h3 className="error-page__tagline">Sorry we can't find that page!</h3>
                  <p className="error-page__text">
                    The page you are looking for was never existed.
                  </p>
                  
                  {/* Correct the Link to navigate to home page */}
                  <Link to="/" className="thm-btn error-page__btn mt-5">
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Error Page End */}

       
    </>
  );
}
