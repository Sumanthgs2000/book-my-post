import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Payment() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { weight, price, sender, receiver, articleNo } = state || {};
    const [paymentMethod, setPaymentMethod] = useState("upi");

    if (!state) return <div className="p-6 text-center">No booking details found.</div>;

    const handleConfirmPayment = () => {
        navigate("/confirmation", { state: { articleNo, weight, price, sender, receiver, status: "success" } });
    };

    const upiUri = `upi://pay?pa=mock@upi&pn=Book%20My%20Post&am=${price}.00&cu=INR&tn=${articleNo}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUri)}`;

    return (
        <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
            {/* Navbar */}
            <nav className="bg-[#212529] text-white p-4 shadow-lg flex items-center justify-center sticky top-0 z-10">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Payment Page</h1>
                </div>
            </nav>

            {/* Step Progress Bar */}
            <div className="w-full max-w-3xl mx-auto my-6">
                <div className="flex-1 h-2 bg-gray-300 rounded-full">
                    <div className="h-2 bg-[#212529] rounded-full w-3/4"></div>
                </div>
                <p className="text-center text-sm text-[#212529] mt-2 font-semibold">Step 3 of 4: Make Payment</p>
            </div>

            {/* Layout */}
            <div className="flex flex-col md:flex-row flex-grow p-6 gap-8 items-center justify-center">
                {/* Left Side - Total Amount */}
                <div className="flex flex-col justify-center items-center w-full max-w-sm bg-white shadow-lg rounded-lg p-10 text-center border-t-8 border-[#495057] transition-transform transform hover:scale-105 hover:shadow-xl">
                    <h2 className="text-2xl font-bold text-[#495057] mb-4">TOTAL AMOUNT</h2>
                    <p className="text-5xl font-extrabold text-[#343a40]">₹{price}</p>
                    <p className="text-lg text-gray-600 mt-2">Article No: {articleNo}</p>
                </div>

                {/* Right Side - Payment Box */}
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-10 border-t-8 border-[#6c757d] text-center transition-transform transform hover:scale-105 hover:shadow-xl">
                    <h2 className="text-2xl font-bold text-[#212529] mb-6">Choose Payment Method</h2>

                    <div className="flex justify-center items-center space-x-4 mb-6">
                        <button
                            onClick={() => setPaymentMethod("upi")}
                            className={`px-6 py-3 rounded-lg font-semibold transition ${paymentMethod === "upi" ? "bg-[#212529] text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        >
                            Pay with UPI
                        </button>
                        <button
                            onClick={() => setPaymentMethod("cash")}
                            className={`px-6 py-3 rounded-lg font-semibold transition ${paymentMethod === "cash" ? "bg-[#212529] text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        >
                            Pay with Cash
                        </button>
                    </div>

                    {paymentMethod === "upi" ? (
                        <div className="flex flex-col items-center">
                            <p className="text-gray-600 mb-4">Scan the QR code below to pay via UPI.</p>
                            <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
                                <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-100 p-4 rounded-lg text-gray-600">
                            Cash payment will be completed at the counter.
                        </div>
                    )}

                    <button
                        onClick={handleConfirmPayment}
                        className="w-full bg-[#28a745] text-white py-3 rounded-lg hover:bg-[#218838] mt-6 transition"
                    >
                        Confirm and Redirect
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Payment;
