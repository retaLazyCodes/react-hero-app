import { useCallback, useContext, useEffect, useRef } from "react";
import { Redirect, useParams } from "react-router-dom";
import ErrorComponent from "./components/ErrorComponent";
import ResultsList from "./components/ResultsList";
import NoResults from "./components/NoResults";
import Spinner from "../../components/Spinner";
import SuperHeroContext from "../../context/superhero"

export default function Results() {
  const { searchText } = useParams();
  const fetchResultsRef = useRef();
  const { error, results, isSearching, searchSuperHero } = useContext(SuperHeroContext)

  const fetchResults = useCallback(async () => {
    await searchSuperHero(searchText)
  }, [searchText, searchSuperHero]);

  fetchResultsRef.current = fetchResults;

  useEffect(() => {
    fetchResultsRef.current()?.catch(null);
  }, []);

  const token = window.localStorage.getItem('@superhero-token');
  if (!token) {
    return <Redirect to='/login' />;
  }

  return (
    <div>
      <div className="px-3 pb-2 mt-12">
        {!error ? (
          <>
            <h2 className="text-xl font-bold">Resultados para: {searchText}</h2>
            {isSearching && <Spinner />}
            {!isSearching && <ResultsList data={results} />}
            {console.log(results)}
            {!isSearching && results?.length === 0 && <NoResults />}
          </>
        ) : (
          <ErrorComponent error={error} />
        )}
      </div>
    </div>
  );
}