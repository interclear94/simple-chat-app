import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "./auth/page/SignupPage";
import LoginPage from "./auth/page/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<RequireAuth></RequireAuth>} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
