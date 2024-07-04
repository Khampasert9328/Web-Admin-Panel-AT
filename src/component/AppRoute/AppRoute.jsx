import { Routes, Route,} from "react-router-dom";
import Home from "../../page/Home";
import About from "../../page/About";
import Service from "../../page/Service";
import Product from "../../page/Products";
import Customer from "../../page/Customer";
import Team from "../../page/Teams";
import Contact from "../../page/Contact";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/service" element={<Service />}></Route>
      <Route path="/product" element={<Product />}></Route>
      <Route path="/customer" element={<Customer />}></Route>
      <Route path="/team" element={<Team />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
     
    </Routes>
    
  );
}

export default AppRoute;
