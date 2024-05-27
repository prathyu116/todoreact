import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Update from "./components/Update";
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/update/:id" element={<Update />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
