import MyRoutes from "./MyRoutes";
import { ToastContainer } from "react-toastify";
import { useLoadingStore } from "./store/loading.store";
import LoadingIndicator from "./components/LoadingIndicator";
// import { createUser } from "./api/auth";

function App() {
  const { loading } = useLoadingStore();

  // createUser();

  return (
    <>
      {loading && <LoadingIndicator />}
      <ToastContainer />
      <MyRoutes />
    </>
  );
}

export default App;
