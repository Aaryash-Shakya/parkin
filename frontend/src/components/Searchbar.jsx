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
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center relative md:w-1/2 mx-auto">
          <input
            type="text"
            className="px-4 py-4 pl-5 w-10/12 rounded-full border-2 border-white text-md shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)] focus:border-2 focus:border-black-500 outline-none"
            placeholder="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div
            className="search-icon absolute right-8"
            onClick={handleClick}
          >
            <IoSearch size={25} className="text-black-500" />
          </div>
        </div>
        <div className="rounded-lg bg-white">
          {listPlace.map((place) => {
            return (
              <div key={place?.place_id} className="bg-white p-2">
                <button
                  onClick={() => {
                    setSelectPosition({
                      lat: place?.lat,
                      lon: place?.lon,
                    });
                    setSearchText(place?.display_name);
                    setListPlace([]);
                  }}
                >
                  <p>{place?.display_name}</p>
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
