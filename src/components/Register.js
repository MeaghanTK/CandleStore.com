import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import "./Register.css";

// Validation schema for registration form
const registerValidationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, "First name must be 15 characters or less") // Limit first name length
    .required("First name is required"), // First name is mandatory
  surname: Yup.string()
    .max(20, "Surname must be 20 characters or less") // Limit surname length
    .required("Surname is required"), // Surname is mandatory
  email: Yup.string()
    .email("Invalid email address") // Validate email format
    .required("Email is required"), // Email is mandatory
  password: Yup.string()
    .min(8, "Password must be at least 8 characters") // Minimum length for password
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // Must include an uppercase letter
    .matches(/[a-z]/, "Password must contain at least one lowercase letter") // Must include a lowercase letter
    .matches(/\d/, "Password must contain at least one number") // Must include a number
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ) // Must include a special character
    .required("Password is required"), // Password is mandatory
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match") // Ensure passwords match
    .required("Confirm password is required"), // Confirm password is mandatory
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (values) => {
    // Save user info to localStorage
    localStorage.setItem("email", values.email);
    localStorage.setItem("password", values.password);
    localStorage.setItem("firstName", values.firstName);

    // Redirect to login page after successful registration
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <Formik
        initialValues={{
          firstName: "",
          surname: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerValidationSchema} // Apply validation rules
        onSubmit={handleSubmit} // Handle form submission
      >
        {() => (
          <Form>
            <div>
              <label>First Name</label>
              <Field
                type="text"
                name="firstName"
                placeholder="Enter your first name"
              />
              {/* Display validation error for first name */}
              <ErrorMessage
                name="firstName"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <label>Surname</label>
              <Field
                type="text"
                name="surname"
                placeholder="Enter your surname"
              />
              {/* Display validation error for surname */}
              <ErrorMessage
                name="surname"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <label>Email Address</label>
              <Field type="email" name="email" placeholder="Enter your email" />
              {/* Display validation error for email */}
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
              {/* Display validation error for password */}
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <label>Confirm Password</label>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
              />
              {/* Display validation error for confirm password */}
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error-message"
              />
            </div>
            {/* Submit button for the form */}
            <button type="submit">Register</button>
            {/* Link to login page for existing users */}
            <a href="/login" className="register-link">
              <strong>Already have an account?</strong>{" "}
              <span className="highlight">Login here</span>
            </a>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
