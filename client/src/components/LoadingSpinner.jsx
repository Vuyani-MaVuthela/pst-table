import React, { useState } from "react";

const LoadingSpinner = () => {
  const [show, setShow] = useState(true);

  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status"></div>
    </div>
  );
};

export default LoadingSpinner;
