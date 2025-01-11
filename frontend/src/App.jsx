import MyRoutes from "./MyRoutes";
import { ToastContainer } from "react-toastify";
import { useLoadingStore } from "./store/loading.store";
import LoadingIndicator from "./components/LoadingIndicator";
import { BrowserRouter } from "react-router-dom";

function App() {
  const { loading } = useLoadingStore();

  return (
    <main className="bg-gray-200">
      <BrowserRouter>
        {loading && <LoadingIndicator />}
        <ToastContainer />
        <MyRoutes />
      </BrowserRouter>
    </main>
  );
}

export default App;
