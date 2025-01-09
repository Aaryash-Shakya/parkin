import FormInput from "../components/form/FormInput";
import Button from "../components/form/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import Container from "../components/Container";

const SignUp = () => {
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // console.log(inputData);

  const handleChange = (e) => {
    e.preventDefault();

    const { value, name } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: inputData.username.toLowerCase(),
      email: inputData.email,
      password: inputData.password,
    };

    console.log("signing up the user", payload);
  };

  return (
    <Container>
      <div className="container max-w-[1300px] m-auto login min-h-[70vh]">
        <div>
          <div className="hidden lg:flex lg:p-0 xl:p-10 side__border items-center flex-col aspect-square">
            <img
              src="/signup-theme.jpg"
              alt="parkin"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
        </div>

        <div className="flex flex-col items-center my-auto p-0 lg:p-5 2xl:p-20 pr-0  overflow-y-auto overflow-x-hidden">
          <h3 className="text-4xl text-primary font-bold mt-0 md:mt-0">
            Sign Up
          </h3>
          <p className="my-8 mt-4 max-w-[350px] lg:max-w-[400px] text-center">
            Smarter Parking, Anytime, Anywhere!
          </p>
          <form onSubmit={handleSubmit}>
            <FormInput
              placeholder="johnDoe213"
              type="text"
              name="username"
              value={inputData.username}
              onChange={handleChange}
            />
            <FormInput
              placeholder="abc@example.com"
              type="email"
              name="email"
              value={inputData.email}
              onChange={handleChange}
            />
            <FormInput
              placeholder="************"
              type="password"
              name="password"
              value={inputData.password}
              onChange={handleChange}
            />

            <Button
              title="Sign Up"
              styles="bg-primary text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out"
            />

            <span className="text-sm text-gray-400 flex gap-2 mt-8 text-center items-center justify-center">
              <p>Already have an account?</p>
              <Link
                to="/sign-in"
                className=" hover:text-red-600 transition-all duration-0 hover:duration-50 ease-in-out hover:underline font-semibold text-primary"
              >
                Sign In
              </Link>
            </span>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
