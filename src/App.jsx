import { Routes, Route } from "react-router-dom";
import Header from "./components/shared/Header";

import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
