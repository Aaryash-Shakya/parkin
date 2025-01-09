import { useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import Map from "../components/Map";
import Searchbar from "../components/Searchbar";

const Home = () => {
  const [selectPosition, setSelectPosition] = useState(null);

  return (
    <div className="bg-background h-screen relative">
      <Searchbar
        selectPosition={selectPosition}
        setSelectPosition={setSelectPosition}
      />
      {/* Map */}
      <Map
        selectPosition={selectPosition}
      />
      <BottomNavbar />
    </div>
  );
};

export default Home;
