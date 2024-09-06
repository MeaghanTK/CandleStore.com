import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// Validation schema for login form
const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address") // Validate email format
    .required("Email is required"), // Email is a mandatory field
  password: Yup.string().required("Password is required"), // Password is a mandatory field
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (values, { setSubmitting, setFieldError }) => {
    // Retrieve stored credentials
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    // Validate credentials
    if (values.email === storedEmail && values.password === storedPassword) {
      // If credentials match, set user in Redux and redirect to home page
      dispatch(
        setUser({
          email: values.email,
          firstName: localStorage.getItem("firstName"),
        })
      );
      navigate("/");
    } else {
      // If credentials don't match, show error
      setFieldError("password", "Invalid email or password");
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <Formik
        initialValues={{ email: "", password: "" }} // Initial form values
        validationSchema={loginValidationSchema} // Apply validation rules
        onSubmit={handleSubmit} // Handle form submission
      >
        {() => (
          <Form>
            <div>
              <label>Email Address</label>
              <Field type="email" name="email" placeholder="Enter your email" />
              {/* Display validation error for email field */}
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <label>Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
              />
              {/* Display validation error for password field */}
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            {/* Submit button for the form */}
            <button type="submit">Login</button>
            {/* Link to registeration page for existing users */}
            <a href="/register" className="register-link">
              <strong>Need to register?</strong>{" "}
              <span className="highlight">Register here</span>
            </a>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
