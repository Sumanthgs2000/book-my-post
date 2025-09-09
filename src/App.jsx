// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookingPage from "./pages/booking";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
        {/* Optional: add a fallback route */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen text-xl text-red-500">
              Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
