import React from "react";

export default React.memo(function BioImage({ image, alt }) {
  return (
    <img
      src={image}
      alt={alt}
      style={{ width: "18rem" }}
      className="img-fluid"
    />
  );
});