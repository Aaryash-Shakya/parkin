import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const Searchbar = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  let params = {
    q: "",
    format: "json",
    addressdetails: "addressdetails",
  };

  const handleClick = () => {
    // Search
    if (searchText !== "") {
      params = {
        q: searchText,
        format: "json",
        addressdetails: 1,
        polygon_geojson: 0,
      };
    }
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        setListPlace(JSON.parse(result));
      })
      .catch((err) => console.log("err: ", err));
  };

  return (
    <div className="absolute top-2 left-0 w-full py-2 px-4 z-50">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-center relative w-full mx-auto">
          <input
            type="text"
            className="pr- py-4 pl-5 rounded-full border-2 w-full border-white text-md shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)] focus:border-2 focus:border-black-500 outline-none"
            placeholder="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="search-icon absolute right-8" onClick={handleClick}>
            <IoSearch size={25} className="text-black-500" />
          </div>
        </div>
        <div className="rounded-lg bg-white md:w-2/3 mx-auto text-start">
          {listPlace.map((place) => {
            return (
              <div
                key={place?.place_id}
                className="bg-white rounded-lg text-start group"
              >
                <button
                  onClick={() => {
                    setSelectPosition({
                      lat: place?.lat,
                      lon: place?.lon,
                    });
                    setSearchText(place?.display_name);
                    setListPlace([]);
                  }}
                  className="w-full group-hover:bg-gray-200 p-2"
                >
                  <p className="text-start">{place?.display_name}</p>
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
