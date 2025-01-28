import React from "react";

import { Helmet } from "react-helmet-async";
import Error404 from './../components/elements/Error404';

export default function PageNotFound() {
 

  return (
    <>
      <div>
        <Helmet>
          <title>Page Not Found - 800 BBattery</title>
          <meta
            name=""
            content=""
          />
         
        </Helmet>
        <Error404 />
      </div>
    </>
  );
}
