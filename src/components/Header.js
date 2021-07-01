import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from '../context/auth/index'

export default React.memo(function Header() {
  const history = useHistory();

  const { onLogout, isAuthenticated } = useContext(AuthContext)
  const handleLogout = () => {
    onLogout();

    Swal.fire(
      'Logged Out!',
      'You just logged out!',
      'success'
    )
    history.push("/login");
  }

  return (
    <div>
      <ul className="nav nav-tabs bg-primary menu justify-content-end">
        <li className="nav-item">
          <Link to='/'>
            <p className="nav-link">My Team</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to='/search'>
            <p className="nav-link">Search Heroes</p>
          </Link>
        </li>
        <li className="nav-item">
          {
            isAuthenticated() === true ?
              <p
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}>Log Out</p>
              :
              <Link to='/login'>
                <p className="nav-link"> Sign In </p>
              </Link>
          }
        </li>
      </ul>
    </div>

  );
})