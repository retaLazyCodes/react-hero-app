import React, { useEffect, useRef, useState, useContext } from "react";
import { useHistory } from "react-router";
import Spinner from '../../components/Spinner';
import AuthContext from '../../context/auth/index';
import './style.css';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from "sweetalert2";

export default function Login() {
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

  const handleSubmitForm = ({ token }) => {
    onLogin(token)

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
    <div className="content">
      <img
        style={{ width: "10rem" }}
        alt="super-hero"
        src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Placeholder_couple_superhero.png"
      />

      <Formik

        initialValues={{
          email: '',
          password: ''
        }}

        validationSchema={
          Yup.object({
            email: Yup.string()
              .email('Invalid email adress')
              .required('Required')
              .oneOf(['challenge@alkemy.org'], 'Invalid email'),
            password: Yup.string()
              .required('Required')
              .oneOf(['react'], 'Invalid password'),
          })
        }

        onSubmit={(values, { setSubmitting, resetForm }) => {
          setIsLoading(true)
          axios.post(`https://jsonplaceholder.typicode.com/posts`, {
            email: 'challenge@alkemy.org',
            password: 'react'
          })
            .then(res => {
              if (res.status === 200 || res.status === 201) {
                handleSubmitForm(res.data)
              }
            }).catch(error => {
              console.log('ERROR:' + error)
              setIsLoading(false)
            })
          resetForm();
          setSubmitting(false)
        }}
      >
        {({ errors, touched }) => (
          <Form className='form form-signin' >
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <div className='labelInput'>
              <label htmlFor="email" className="alkemy-form-label">Email</label>
              <Field
                type="email"
                name='email'
                className="alkemy-form-control"
                id="email"
                placeholder="Type your email"
              />

              {errors.email && touched.email ? (
                <div>{errors.email}</div>
              ) : null}

            </div>

            <div className='labelInput'>
              <label htmlFor="password" className="alkemy-form-label">Password</label>
              <Field
                type="password"
                name='password'
                className="alkemy-form-control"
                id="password"
                placeholder="Type your password"
              />

              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}

            </div>

            <button
              type="submit"
              className="alkemy-btn-primary"
            >
              Sign In
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
}
