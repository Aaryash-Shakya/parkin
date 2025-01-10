import MyRoutes from "./MyRoutes";
import { ToastContainer } from "react-toastify";
import { useLoadingStore } from "./store/loading.store";
import LoadingIndicator from "./components/LoadingIndicator";

function App() {
  const { loading } = useLoadingStore();

  return (
    <>
      {loading && <LoadingIndicator />}
      <ToastContainer />
      <MyRoutes />
    </>
  );
}

export default App;
