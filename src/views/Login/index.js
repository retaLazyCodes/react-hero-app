import React, { useEffect, useRef, useState, useContext } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

import Spinner from '../../components/Spinner'
import AuthContext from '../../context/auth/index'


export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const { isAuthenticated, onLogin } = useContext(AuthContext);

  const checkIfUserIsAuthRef = useRef();


  const checkIfUserIsAuth = () => {
    if (isAuthenticated()) {
      console.log(isAuthenticated())
      history.push("/search");
    } else {
      setIsLoading(false);
    }
  };

  checkIfUserIsAuthRef.current = checkIfUserIsAuth;

  useEffect(() => {
    checkIfUserIsAuthRef?.current()?.catch(null);
  }, []);

  const handleSubmitForm = (evt) => {
    evt.preventDefault();

    onLogin()

    Swal.fire(
      'Logged in!',
      'You just logged in!',
      'success'
    )

    history.push("/");
  }


  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <img
        style={{ width: "10rem" }}
        alt="super-hero"
        src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Placeholder_couple_superhero.png"
      />
      <h2 className="text-sm mt-3">Iniciar sesión</h2>
      <form onSubmit={handleSubmitForm} className="flex flex-col mt-3">
        <label className="flex-col flex text-sm text-gray-500 my-2">
          Correo Electronico
          <input
            onChange={({ target: { value } }) => setName(value)}
            className="px-2 py-1 text-gray-700 text-base mt-1 order border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-56 shadow-sm"
            type="email"
          />
        </label>
        <label className="flex-col flex text-sm text-gray-500">
          Contraseña
          <input
            onChange={({ target: { value } }) => setEmail(value)}
            className="px-2 py-1 text-gray-700 text-base mt-1  order border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-56 shadow-sm"
            type="password"
          />
        </label>
        <button
          className="bg-blue-600 hover:bg-blue-900 rounded-sm mt-4 px-3 h-8 text-white text-sm cursor-pointer"
          type="submit"
        >
          Acceder
        </button>
      </form>
    </div>
  );
}
