import { useState } from "react";
import { useHistory } from "react-router-dom";
import './style.css'

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const handleSearchClick = (event) => {
    event.preventDefault();
    history.push(`/results/${searchText}`);
  };

  return (
    <>
      <div className="center">
        <div >
          <form onSubmit={handleSearchClick}>
            <h2>Buscador de superheroes</h2>
            <div >
              <input
                value={searchText}
                onChange={({ target: { value } }) => setSearchText(value)}
              />
              <button
                type="submit"
                disabled={searchText?.length === 0}
              >Buscar
              </button>
              <button
                type="button"
                className={` ${searchText?.length > 0 ? 'visible' : 'invisible'} `}
                onClick={() => setSearchText("")}
              >Limpiar
            </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}