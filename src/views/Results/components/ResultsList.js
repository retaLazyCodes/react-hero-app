import React from "react";
import ResultsListItem from "./ResultsListItem";

export default React.memo(function ResultsList({ data }) {

  return (
    <div>
      {data?.map((data, key) => <ResultsListItem {...data} key={key} fromSearch={'fromSearch'} />)}
    </div>
  );
});