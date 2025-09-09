import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { calculatePrice } from "../utils/priceCalculator";
import { generateArticleNumber } from "../utils/articleNumber";

function Booking() {
    const { state } = useLocation();
    const weight = state?.weight || 0;
    const navigate = useNavigate();

    const [from, setFrom] = useState({ name: "", phone: "", pincode: "", address: "" });
    const [to, setTo] = useState({ name: "", phone: "", pincode: "", address: "" });
    const [price, setPrice] = useState(0);
    const [showPrice, setShowPrice] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e, type) => {
        const { name, value } = e.target;
        if (name === "pincode" && value.length > 6) return;
        if (name === "phone" && value.length > 10) return;

        if (type === "from") setFrom({ ...from, [name]: value });
        else setTo({ ...to, [name]: value });
    };

    const validateInputs = () => {
        const validateSet = (obj) => {
            if (!obj.name || !obj.phone || !obj.pincode || !obj.address) return false;
            if (!/^\d{6}$/.test(obj.pincode)) {
                alert("Please enter a valid 6-digit pincode.");
                return false;
            }
            if (!/^\d{10}$/.test(obj.phone)) {
                alert("Please enter a valid 10-digit phone number.");
                return false;
            }
            return true;
        };
        return validateSet(from) && validateSet(to);
    };

    const handleCheckPrice = () => {
        if (!validateInputs()) {
            setError("Please correct the errors above.");
            return;
        }
        setPrice(calculatePrice(weight, 0)); // distance set to 0 for demo
        setShowPrice(true);
        setError("");
    };

    const handleProceed = () => {
        const articleNo = generateArticleNumber();
        navigate("/payment", { state: { weight, price, sender: from, receiver: to, articleNo } });
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f1faee]">
            {/* Navbar/Header */}
            <nav className="bg-[#1d3557] text-white p-4 shadow-lg flex items-center justify-center sticky top-0 z-10">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    ✉️ Enter Address
                </h1>
            </nav>

            {/* Step Progress Bar */}
            <div className="w-full max-w-3xl mx-auto my-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1 h-2 bg-[#a8dadc] rounded-full">
                        <div className="h-2 bg-[#457b9d] rounded-full w-2/3"></div>
                    </div>
                </div>
                <p className="text-center text-sm text-[#1d3557] mt-2 font-semibold">
                    Step 2 of 4: Enter Address
                </p>

            </div>

            {/* Content */}
            <div className="flex flex-col items-center flex-grow p-6 gap-8">

                {/* TO Form */}
                <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
                    <h2 className="text-2xl font-bold text-[#1d3557] mb-6">TO (Receiver Details)</h2>

                    <label className="flex items-center font-semibold mb-1 text-gray-700">📛 Name</label>
                    <input name="name" value={to.name} onChange={(e) => handleChange(e, "to")}
                        className="w-full p-4 border rounded-lg mb-4 focus:ring-2 focus:ring-[#a8dadc]" placeholder="Enter receiver's name" />

                    <label className="flex items-center font-semibold mb-1 text-gray-700">📞 Phone (10 digits)</label>
                    <input name="phone" value={to.phone} onChange={(e) => handleChange(e, "to")}
                        className={`w-full p-4 border rounded-lg mb-4 focus:ring-2 ${/^\d{10}$/.test(to.phone) || to.phone === "" ? "focus:ring-[#a8dadc]" : "border-red-500"
                            }`} placeholder="Enter phone number" />

                    <label className="flex items-center font-semibold mb-1 text-gray-700">📮 Pincode (6 digits)</label>
                    <input name="pincode" value={to.pincode} onChange={(e) => handleChange(e, "to")}
                        className={`w-full p-4 border rounded-lg mb-4 focus:ring-2 ${/^\d{6}$/.test(to.pincode) || to.pincode === "" ? "focus:ring-[#a8dadc]" : "border-red-500"
                            }`} placeholder="Enter pincode" />

                    <label className="flex items-center font-semibold mb-1 text-gray-700">🏠 Address</label>
                    <textarea name="address" value={to.address} onChange={(e) => handleChange(e, "to")}
                        className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-[#a8dadc]" rows="4" placeholder="Enter full address"></textarea>
                </div>

                {/* FROM Form */}
                <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
                    <h2 className="text-2xl font-bold text-[#1d3557] mb-6">FROM (Sender Details)</h2>

                    <label className="flex items-center font-semibold mb-1 text-gray-700">📛 Name</label>
                    <input name="name" value={from.name} onChange={(e) => handleChange(e, "from")}
                        className="w-full p-4 border rounded-lg mb-4 focus:ring-2 focus:ring-[#a8dadc]" placeholder="Enter sender's name" />

                    <label className="flex items-center font-semibold mb-1 text-gray-700">📞 Phone (10 digits)</label>
                    <input name="phone" value={from.phone} onChange={(e) => handleChange(e, "from")}
                        className={`w-full p-4 border rounded-lg mb-4 focus:ring-2 ${/^\d{10}$/.test(from.phone) || from.phone === "" ? "focus:ring-[#a8dadc]" : "border-red-500"
                            }`} placeholder="Enter phone number" />

                    <label className="flex items-center font-semibold mb-1 text-gray-700">📮 Pincode (6 digits)</label>
                    <input name="pincode" value={from.pincode} onChange={(e) => handleChange(e, "from")}
                        className={`w-full p-4 border rounded-lg mb-4 focus:ring-2 ${/^\d{6}$/.test(from.pincode) || from.pincode === "" ? "focus:ring-[#a8dadc]" : "border-red-500"
                            }`} placeholder="Enter pincode" />

                    <label className="flex items-center font-semibold mb-1 text-gray-700">🏠 Address</label>
                    <textarea name="address" value={from.address} onChange={(e) => handleChange(e, "from")}
                        className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-[#a8dadc]" rows="4" placeholder="Enter full address"></textarea>
                </div>

                {/* Summary & Actions */}
                <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
                    <h2 className="text-2xl font-bold text-[#1d3557] mb-6">Summary</h2>
                    <p>Weight: {weight} g</p>
                    {showPrice && <p>Price: ₹{price}</p>}
                    {error && <div className="text-[#e63946] font-semibold my-3">{error}</div>}

                    <button onClick={handleCheckPrice}
                        className="w-full bg-[#457b9d] text-white py-4 rounded-lg hover:bg-[#29495e] mt-6 transition">
                        Check Price
                    </button>

                    {showPrice && (
                        <button onClick={handleProceed}
                            className="w-full bg-[#a8dadc] text-[#1d3557] font-bold py-4 rounded-lg hover:bg-[#6097b9] mt-6 transition">
                            Proceed to Payment
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Booking;
