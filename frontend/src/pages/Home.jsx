import BottomNavbar from "../components/BottomNavbar";
import Searchbar from "../components/Searchbar";

const Home = () => {
  return (
    <div className="bg-background h-screen relative">
      <Searchbar />
      <BottomNavbar />
    </div>
  );
};

export default Home;
