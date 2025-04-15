import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import User from "./pages/User";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
      <div className="bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
