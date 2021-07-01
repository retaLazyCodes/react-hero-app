import React from "react";
import Card from '../../../components/Card'

export default React.memo(function ResultsListItem({ name, image, id, powerstats, fromSearch }) {
  return (
    <Card
      key={id}
      id={id}
      name={name}
      img={image.url}
      powerstats={powerstats}
      fromSearch={fromSearch}
    />
  );
});