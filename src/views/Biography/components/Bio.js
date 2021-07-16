import React from "react";

export default React.memo(function Bio({ bio, bioWork, appearance }) {
  return (
    <div>
      <div>
        <p className="text-3xl font-bold mt-3">{bio["full-name"]}</p>
        <p className="text-sm italic">({bio["alter-egos"]})</p>
      </div>
      <div className="mt-2">
        <p>Occupation: {bioWork?.occupation}</p>
        <p>Weight: {appearance["weight"][1]}</p>
        <p>Height: {appearance["height"][1]}</p>
        <p>Eyes color: {appearance["eye-color"]}</p>
        <p>Hair color: {appearance["hair-color"]}</p>
      </div>
    </div>
  );
});