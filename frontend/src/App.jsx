import MyRoutes from "./MyRoutes";
import { ToastContainer } from "react-toastify";
import { useLoadingStore } from "./store/loading.store";
import LoadingIndicator from "./components/LoadingIndicator";

function App() {
  const { loading } = useLoadingStore();

  return (
    <main className="bg-gray-200">
      {loading && <LoadingIndicator />}
      <ToastContainer />
      <MyRoutes />
    </main>
  );
}

export default App;
