import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import './style.css'

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const token = window.localStorage.getItem('@superhero-token');
  if (!token) {
    return <Redirect to='/login' />;
  }

  const handleSearchClick = (event) => {
    event.preventDefault();
    history.push(`/results/${searchText}`);
  };

  return (
    <>
      <div className="center">
        <div >
          <form onSubmit={handleSearchClick}>
            <h2>Search your Hero</h2>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <input
                className="form-control"
                style={{ padding: "10px" }}
                value={searchText}
                onChange={({ target: { value } }) => setSearchText(value)}
              />
              <button
                className="btn btn-primary me-md-2"
                type="submit"
                disabled={searchText?.length === 0}
              >Buscar
              </button>
              <button
                type="button"
                className={`btn btn-danger ${searchText?.length > 0 ? 'visible' : 'invisible'} `}
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