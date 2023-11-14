import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false); // tracks if form has been submitted

  const isEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  // const isPhoneNumber = (value) => {
  //   const phoneRegex = /^[0-9]{10}$/;
  //   return phoneRegex.test(value);
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    setSubmitted(true); // set submitted state to true once form is submitted

    if (isEmail(input) && password.length >= 8) {
      let submitObj = {
        email: input,
        password: password,
      };

      axios
        .post("https://backendapi-ingh.onrender.com/auth/login", submitObj)
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            toast.success("Login successful !!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            navigate("/dashboard");
          } else {
            toast.error(`${res.data.message}`, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };

  return (
    <div className="max-w-md mx-auto flex p-5 bg-white rounded-lg shadow">
      <div className="ml-6 pt-1">
        <h1 className="text-2xl font-bold text-blue-700 mb-3 text-center">
          Log In
        </h1>
        <form onSubmit={handleLogin}>
          <label
            htmlFor="input"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="input"
            type="email"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className={`mt-1 block w-full py-2 px-3 border ${
              submitted && !input ? "border-red-500" : "border-gray-500"
            } rounded-md`}
          />

          {submitted && !input ? (
            <div className="text-red-500 text-sm">This field is required.</div>
          ) : null}

          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mt-3"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={`mt-1 block w-full py-2 px-3 border ${
              submitted && !password ? "border-red-500" : "border-gray-500"
            } rounded-md`}
          />

          {submitted && !password ? (
            <div className="text-red-500 text-sm">This field is required.</div>
          ) : null}

          <button
            type="submit"
            className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Log in
          </button>
        </form>
        <div className="w-full mt-3">
          <p className="text-xs mb-0">
            Don't have account?{" "}
            <a
              href="/register"
              className="text-blue-500 hover:text-blue-400 underline"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
