import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const Searchbar = (props) => {
  const { setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  // const [hasTyped, setHasTyped] = useState(false); // Track if the user has typed

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
            className="px-4 py-4 pl-5 rounded-full border-2 w-full border-white text-md shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)] focus:border-2 focus:border-black-500 outline-none"
            placeholder="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="search-icon absolute right-8">
            <IoSearch size={25} className="text-black-500" />
          </div>
        </div>
        <div className="rounded-lg bg-white mx-auto text-start w-full">
          {/* Conditionally render "No data found" */}
          {/* {hasTyped && !searchText &&listPlace.length === 0 && (
            <div className="w-full py-5 px-2 text-center">No data found.</div>
          )} */}
          {listPlace.length > 0 &&
            listPlace.map((place) => {
              return (
                <div
                  key={place?.place_id}
                  className="bg-white rounded-lg text-start group w-full"
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
