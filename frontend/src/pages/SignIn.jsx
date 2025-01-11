import { useState } from "react";
import FormInput from "../components/form/FormInput";
import Button from "../components/form/Button";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { toast } from "react-toastify";
import { signInUser } from "../api/auth";
import { useUserStore } from "../store/user.store";

const SignIn = () => {
  const [inputData, setInputData] = useState({
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setUserData } = useUserStore();

  const validateUserInput = (userInput) => {
    const { phone, password } = userInput;
    const isValidPhone = /^\d{10}$/;

    if (!phone.trim()) return { ok: false, err: "Phone number is missing" };
    if (!isValidPhone.test(phone))
      return { ok: false, err: "Phone number is invalid" };
    if (!password.trim()) return { ok: false, err: "Password is missing" };

    return { ok: true };
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { ok, err } = validateUserInput(inputData);

    if (err) return toast.error(err);

    const payload = {
      phone: inputData.phone,
      password: inputData.password,
    };

    if (ok) {
      signInUser(payload)
        .then((responseData) => {
          if (responseData.error) {
            return toast.error(responseData.error);
          }

          console.log("responseData", responseData.data);

          setUserData({
            name: responseData.data.name,
            phone: responseData.data.phone,
            type: responseData.data.type,
            userId: responseData.data.userId,
            isAuthenticated: true,
          });

          toast.success(responseData.message);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error during sign in:", error);
          toast.error("Something went wrong. Please try again.");
        });
    }

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
              placeholder="9810005566"
              type="text"
              name="phone"
              value={inputData.phone}
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
              title="Login"
              styles="bg-primary text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out"
            />

            <span className="text-sm text-gray-400 flex gap-2 mt-8 text-center items-center justify-center">
              <p>New to ParkIn?</p>
              <Link
                to="/sign-up"
                className=" hover:text-red-600 transition-all duration-0 hover:duration-50 ease-in-out hover:underline font-semibold text-primary"
              >
                Create Account
              </Link>
            </span>

            <span className="text-sm text-gray-400 flex gap-2 text-center items-center justify-center">
              <Link
                to="/"
                className="underline text-center margin-auto mt-3 hover:text-red-600 transition-all duration-0 hover:duration-50 ease-in-out hover:underline font-semibold text-primary"
              >
                To Home
              </Link>
            </span>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default SignIn;
