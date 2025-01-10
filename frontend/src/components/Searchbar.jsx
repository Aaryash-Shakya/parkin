import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import Location from "../assets/location.svg";
import Logo from "../assets/logo/logo.svg";
import LogoWithoutBg from "../assets/logo/logo-nobg.svg";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const Searchbar = (props) => {
  const { setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  // const [hasTyped, setHasTyped] = useState(false); // Track if the user has typed

  const [isFocused, setIsFocused] = useState(false);
  let params = {
    q: "",
    format: "json",
    addressdetails: "addressdetails",
  };

  const fetchPlaces = (query) => {
    const params = {
      q: query,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setListPlace(result);
      })
      .catch((err) => console.log("Error fetching places:", err));
  };

  useEffect(() => {
    if (!searchText) {
      setListPlace([]);
      return;
    }

    // setHasTyped(true); // Mark that user has started typing

    const debounceTimer = setTimeout(() => {
      fetchPlaces(searchText);
    }, 500); // Delay of 500ms

    return () => {
      clearTimeout(debounceTimer);
    }; // Cleanup
  }, [searchText]);

  return (
    <div className="absolute top-2 left-0 w-full py-2 px-4 z-50">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-center relative w-full mx-auto">
          <input
            type="text"
            className={`pr-[4.5rem] py-4 rounded-full border-2 w-full border-white text-md shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)] focus:border-2 focus:border-primary outline-none
             ${isFocused || searchText ? "pl-6" : "pl-12"}`}
            placeholder="search parking by location"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <div
            className={`search-icon absolute left-0  p-5 rounded-full transition-opacity duration-100 ${
              isFocused || searchText ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src={LogoWithoutBg}
              alt="ParkIn Logo"
              className="w-[1.15rem] h-[1.15rem] object-contain object-center"
            />
          </div>
          <div
            className={`search-icon absolute right-0  p-5 rounded-full transition-all duration-150 ease-in-out ${
              isFocused ? "bg-primary" : "bg-background"
            }`}
            onClick={handleClick}
          >
            <IoSearch
              size={25}
              className={`${isFocused ? "text-white" : "text-black"}`}
            />
          </div>
        </div>
        <div className="rounded-2xl bg-white mx-auto text-start flex flex-col max-w-full shadow-md z-40 max-h-[85vh] overflow-y-scroll">
          {listPlace.map((place, index) => {
            return (
              <div
                key={place?.place_id}
                className={`flex gap-3 items-center justify-start bg-white rounded-lg text-start px-4 py-4 ${
                  index !== listPlace.length - 1
                    ? "border-b-2 border-background"
                    : "border-none"
                }`}
              >
                <div className="p-4 rounded-full bg-background aspect-square w-14 h-14">
                  <img src={Location} alt="" className="w-full h-full" />
                </div>
                <button
                  onClick={() => {
                    setSelectPosition({
                      lat: place?.lat,
                      lon: place?.lon,
                    });
                    setSearchText(place?.display_name);
                    setListPlace([]);
                  }}
                  className="flex items-center flex-wrap overflow-hidden"
                >
                  <p className="text-start text-sm line-clamp-2 overflow-hidden text-ellipsis">
                    {place?.display_name}
                  </p>
                </button>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default Searchbar;
