import { Helmet } from "react-helmet-async";
import { ContactFormModal } from "../../elements/ContactFormModal";

export default function Banner() {
  const mobileBannerImage =
    "https://imagedelivery.net/yg9mV_kJZn9RkpQKfOuKfA/f3e5ee1f-6c25-46ce-d465-d35e06da4d00/public";
  const desktopBannerImage = "assets/images/banner-desktop.jpeg";

  return (
    <>
      <Helmet>
        {/* Preload the mobile and desktop banner images */}
        <link rel="preload" href={mobileBannerImage} as="image" />
        <link rel="preload" href={desktopBannerImage} as="image" />
      </Helmet>

      {/* Mobile Banner */}
      <section className="md:hidden relative flex flex-col">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={mobileBannerImage}
            alt="Mobile Banner"
            className="object-cover"
            width="100%"
            height="210"
            loading="lazy"
          />
        </div>
        <div className="-mt-10 flex justify-center mx-10">
          <ContactFormModal sourcePage="mobile" />
        </div>
      </section>

      {/* Desktop Banner */}
      <section className="hidden md:block">
        <div
          className="flex justify-between items-center"
          style={{
            backgroundImage: `url(${desktopBannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="container flex justify-between items-center banner_section">
            <div className="main-slider-three__content banner_content"></div>
            <div className="main-slider-three__content banner_form">
              <ContactFormModal sourcePage="desktop" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
