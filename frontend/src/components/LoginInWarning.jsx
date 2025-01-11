import { useNavigate } from "react-router-dom";
import Button from "./form/Button";
import PageHeader from "./PageHeader";

const LoginInWarning = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="parkIn" />

      <div className="container h-screen bg-gray-200 min-h-screen flex flex-col justify-center items-center pb-28 pt-7">
        <img src="/Login-amico.png" alt="" />
        <h3 className="text-xl font-semibold text-gray-800">
          Please Login to Continue
        </h3>
        <Button
          title="Login"
          onClick={() => navigate("/sign-in")}
          styles="bg-primary text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out"
        />
      </div>
    </>
  );
};

export default LoginInWarning;
