import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    dateOfBirth: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const validate = () => {
    let temp = {};
    temp.name = formValues.name ? "" : "This field is required.";
    temp.email = /.+@.+..+/.test(formValues.email) ? "" : "Email is not valid.";
    temp.mobileNumber =
      formValues.mobileNumber.length > 9 ? "" : "Enter valid mobile number.";
    temp.password =
      formValues.password.length > 8 ? "" : "Minimum 8 characters required.";
    temp.dateOfBirth =
      formValues.dateOfBirth.length > 0 ? "" : "This field is required.";
    setFormErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formValues);
    if (validate()) {
      try {
        const response = await axios.post(
          "https://backendapi-ingh.onrender.com/auth/register",
          formValues
        );
        if (response.data.success) {
          toast.success(`${response.data.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
          // clear the form
          setFormValues({
            name: "",
            email: "",
            mobileNumber: "",
            password: "",
            dateOfBirth: "",
          });
          navigate("/login");
        } else {
          toast.warning(`${response.data.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } catch (error) {
        console.log(error);

        // Display error toast
        toast.error(error.message || "Registration Failed. Please try again.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto flex p-5 bg-white rounded-lg shadow">
      <div className="ml-6 pt-1">
        <h1 className="text-2xl font-bold text-blue-700 mb-3 text-center">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              aria-describedby="name-error"
            />
            {formErrors.name && (
              <div id="name-error" className="text-red-500">
                {formErrors.name}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              aria-describedby="email-error"
            />
            {formErrors.email && (
              <div id="email-error" className="text-red-500">
                {formErrors.email}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              aria-describedby="dateOfBirth-error"
            />
            {formErrors.dateOfBirth && (
              <div id="dateOfBirth-error" className="text-red-500">
                {formErrors.dateOfBirth}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              maxLength="10"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              aria-describedby="mobileNumber-error"
            />
            {formErrors.mobileNumber && (
              <div id="mobileNumber-error" className="text-red-500">
                {formErrors.mobileNumber}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              aria-describedby="password-error"
            />
            {formErrors.password && (
              <div id="password-error" className="text-red-500">
                {formErrors.password}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-lg"
          >
            Register
          </button>
        </form>
        <div className="w-full mt-3">
          <p className="text-xs mb-0">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:text-blue-400 underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
