import navigations from "../constants/navigations";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNavbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleActive = (link) => {
    navigate(link);
  };

  return (
    <div
      className={`px-4 fixed min-h-20 flex items-center justify-center z-40 transition-all ease-in-out duration-100 ${
        pathname == "/"
          ? "bottom-8 left-0 right-0 bg-none"
          : "bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)] "
      }`}
    >
      <div
        className={`flex items-center justify-center h-fit w-fit rounded-full p-1 transition-all ease-in-out duration-100 ${
          pathname == "/" ? "w-fit bg-none" : "w-full"
        }`}
      >
        {navigations.map((nav) => (
          <div
            key={nav.name}
            className={`flex flex-col items-center justify-center overflow-hidden w-[100px] h-20 border-r-0 p-1  ${
              pathname == "/" ? "-m-3" : "m-0"
            }`}
          >
            <button
              className={`flex items-center justify-center w-full h-full ${
                pathname === nav.link
                  ? "bg-primary z-40 rounded-[32px]"
                  : `bg-white z-30 ${
                      nav.index === 1
                        ? "rounded-l-[32px]"
                        : nav.index === 4
                        ? "rounded-r-[32px]"
                        : "rounded-none"
                    }`
              }`}
              type="button"
              onClick={() => handleActive(nav.link)}
            >
              <img
                src={pathname === nav.link ? nav.iconActive : nav.icon}
                alt={nav.name}
                className="w-6 h-6"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;
