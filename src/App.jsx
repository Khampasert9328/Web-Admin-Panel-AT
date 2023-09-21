import "./App.css";
import SideBar from "./component/SideBar";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/home">
      <SideBar />
    </BrowserRouter>
  );
}

export default App;
