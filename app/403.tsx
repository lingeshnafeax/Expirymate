import Link from "next/link";
import React from "react";

const Forbidden = () => {
  return (
    <div>
      <h1>403 Forbidden</h1>
      <p>You do not have permission to access this resource.</p>
      <p>Please contact your administrator if you believe this is an error.</p>
      <Link href="/">Go back</Link>
    </div>
  );
};

export default Forbidden;
