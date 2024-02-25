import "normalize.css";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/navigator/AppRouter";
import Header from "./components/widgets/Header/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
