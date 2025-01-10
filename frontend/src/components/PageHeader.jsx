import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, backPath = "/", setConfirmPage }) => {
  const navigate = useNavigate();

  const handleBackClick = (e) => {
    e.preventDefault();
    if (setConfirmPage) {
      setConfirmPage(false);
      return;
    }
    navigate(backPath); // Go back to the previous route
  };

  return (
    <div className="bg-secondary">
      <div className="container py-4 pt-6 flex items-center gap-2 ">
        <img
          src="/back-icon.svg"
          className="w-6 cursor-pointer"
          alt="Back"
          onClick={handleBackClick}
        />
        <h1 className="font-bold text-xl text-gray-800">{title}</h1>
      </div>
    </div>
  );
};

export default PageHeader;
