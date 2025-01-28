import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import FullPageLoader from "./components/elements/FullPageLoader";
import UpdateMetaData from "./pages/UpdateMetaData";
import UpdateOtherMetaData from "./pages/UpdateOtherMetaData";
import CreateOtherMetaData from "./pages/CreateOtherMetaData";
import CreateMetaData from "./pages/CreateMetaData";
// Lazy loading of pages
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const OnlyAdminPrivateRoute = lazy(() =>
  import("./components/OnlyAdminPrivateRoute")
);
const ProductDetails = lazy(() => import("./components/DashproductDetails"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const UpdatePost = lazy(() => import("./pages/UpdatePost"));
const CreateProduct = lazy(() => import("./pages/CreateProduct"));
const UpdateProduct = lazy(() => import("./pages/UpdateProduct"));
const CreateService = lazy(() => import("./pages/CreateService"));
const UpdateService = lazy(() => import("./pages/UpdateService"));
const CreateSlider = lazy(() => import("./pages/CreateSlider"));
const UpdateSlider = lazy(() => import("./pages/UpdateSlider"));
const CreateBrand = lazy(() => import("./pages/CreateBrand"));
const UpdateBrand = lazy(() => import("./pages/UpdateBrand"));
const CreateTestimonial = lazy(() => import("./pages/CreateTestimonial"));
const UpdateTestimonial = lazy(() => import("./pages/UpdateTestimonial"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
const apiUrl = import.meta.env.VITE_BASE_URL;

export default function App() {
  return (
    <>
      
      <BrowserRouter>
        {/* Wrap the whole app inside Suspense */}
        <Suspense fallback={<FullPageLoader />}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Only Admin Routes */}
            <Route element={<OnlyAdminPrivateRoute />}>
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/update-post/:postId" element={<UpdatePost />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route
                path="/update-product/:productId"
                element={<UpdateProduct />}
              />
              <Route path="/create-slider" element={<CreateSlider />} />
              <Route
                path="/update-slider/:sliderId"
                element={<UpdateSlider />}
              />
              <Route path="/create-brand" element={<CreateBrand />} />
              <Route path="/update-brand/:brandId" element={<UpdateBrand />} />
              <Route
                path="/create-testimonial"
                element={<CreateTestimonial />}
              />
              <Route
                path="/update-testimonial/:testimonialId"
                element={<UpdateTestimonial />}
              />
              <Route path="/create-service" element={<CreateService />} />
              <Route
                path="/update-service/:serviceId"
                element={<UpdateService />}
              />
              <Route path="/create-metadata" element={<CreateMetaData />} />
              <Route
                path="/update-metadata/:type/:metadataId"
                element={<UpdateMetaData />}
              />
              <Route
                path="/create-othermetadata"
                element={<CreateOtherMetaData />}
              />
              <Route
                path="/update-othermetadata/other/:othermetadataId"
                element={<UpdateOtherMetaData />}
              />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
