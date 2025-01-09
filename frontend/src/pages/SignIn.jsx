import React, { useContext, useEffect, useState } from "react";
import FormInput from "../components/form/FormInput";
import Button from "../components/form/Button";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { toast } from "react-toastify";

const SignIn = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const validateUserInput = (userInput) => {
    const { email, password } = userInput;
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.trim()) return { ok: false, err: "Email is missing" };
    if (!isValidEmail.test(email))
      return { ok: false, err: "Email is invalid" };

    return { ok: true };
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { ok, err } = validateUserInput(inputData);

    if (err) return toast.error(err);

    const payload = {
      email: inputData.email,
      password: inputData.password,
    };

    console.log("user is logging in with", payload);
  };

  return (
    <Container>
      <div className="container max-w-[1200px] m-auto login min-h-[70vh]">
        <div>
          <div className="hidden lg:flex lg:p-0 xl:p-10 side__border items-center flex-col">
            <img src="/login-theme.jpg" alt="parkin " />
          </div>
        </div>

        <div className="flex flex-col items-center my-auto pl:0 xl:pl-20">
          <h3 className="text-4xl text-primary font-bold mt-0 md:mt-10">
            Log in to ParkIn
          </h3>
          <p className="mb-8 mt-4 max-w-[350px] text-center">
            Welcome to ParkIn.
          </p>
          <form onSubmit={handleSubmit}>
            <FormInput
              placeholder="abc@example.com"
              type="text"
              name="email"
              label="Email"
              value={inputData.email}
              onChange={handleChange}
            />
            <FormInput
              placeholder="************"
              type="password"
              name="password"
              label="Password"
              value={inputData.password}
              onChange={handleChange}
            />

            <Button
              title="Login"
              styles="bg-primary text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out"
            />

            <span className="text-sm text-gray-400 flex gap-2 mt-8 text-center items-center justify-center">
              <p>New to ParkIn?</p>
              <Link
                to="/auth/signup"
                className=" hover:text-red-600 transition-all duration-0 hover:duration-50 ease-in-out hover:underline font-semibold text-primary"
              >
                Create Account
              </Link>
            </span>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default SignIn;
