import MyRoutes from "./MyRoutes";
import { ToastContainer } from "react-toastify";
import { useLoadingStore } from "./store/loading.store";
import LoadingIndicator from "./components/LoadingIndicator";
import MarkerPopUp from "./components/markers/MarkerPopUp";
import { useMarkerPopUpStore } from "./store/useMarkerPopUp.store";

function App() {
  const { loading } = useLoadingStore();
  const { showContent } = useMarkerPopUpStore();

  console.log('showContent',showContent)

  return (
    <>
      {loading && <LoadingIndicator />}
      {showContent && <MarkerPopUp />}
      <ToastContainer />
      <MyRoutes />
    </>
  );
}

export default App;
