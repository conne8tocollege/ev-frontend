import { Link } from "react-router-dom";

export default function Breadcrumb({ title, breadcrumbs }) {
  return (
    <>
      <section className="page-header">
        <div className="page-header__shape-1">
          <img
            src="https://imagedelivery.net/yg9mV_kJZn9RkpQKfOuKfA/a8cd9a57-ed61-4566-ecef-7675319f5600/public"
            alt="shape"
          />
        </div>
        <div className="container">
          <div className="page-header__inner">
            <div className="page-header__img-1">
              <img className="w-auto h-96" src="https://imagedelivery.net/yg9mV_kJZn9RkpQKfOuKfA/0bf3e2e5-a69c-4d78-f550-48dd553af700/public" alt="about" />
            </div>
            <h3>{title}</h3>
            <div className="thm-breadcrumb__inner">
              <ul className="thm-breadcrumb list-unstyled">
                {breadcrumbs.map((item, index) => (
                  <li key={index}>
                    {item.link ? (
                      <Link to={item.link}>{item.name}</Link>
                    ) : (
                      <span>{item.name}</span>
                    )}
                    {index < breadcrumbs.length - 1 && (
                      <span className="icon-angle-right"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
