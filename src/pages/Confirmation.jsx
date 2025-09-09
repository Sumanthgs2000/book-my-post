import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Confirmation() {
    const { state } = useLocation();
    const navigate = useNavigate();
    if (!state) return <div className="p-6 text-center">No booking details found.</div>;

    useEffect(() => {
        if (state.sender?.phone) {
            console.log(`📩 SMS sent to ${state.sender.phone}: Your booking ${state.articleNo} is confirmed ✅.`);
        }
    }, [state]);

    return (
        <div className="flex flex-col min-h-screen bg-[#d8f3dc]">
            {/* Navbar */}
            <nav className="bg-[#1b4332] text-white p-4 shadow-lg flex items-center justify-center sticky top-0 z-10">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Confirmation Page</h1>
                </div>
            </nav>

            {/* Step Progress Bar */}
            <div className="w-full max-w-3xl mx-auto my-6">
                <div className="flex-1 h-2 bg-gray-300 rounded-full">
                    <div className="h-2 bg-[#1b4332] rounded-full w-full"></div>
                </div>
                <p className="text-center text-sm text-[#1b4332] mt-2 font-semibold">Step 4 of 4: Generate Receipt</p>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center justify-center flex-grow p-6">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg text-center border-t-8 border-[#2d6a4f]">
                    <h2 className="text-2xl font-bold text-[#2d6a4f] mb-4">PAYMENT SUCCESSFUL 🎉</h2>

                    <p className="text-lg font-semibold mb-6">
                        <span className="font-bold">Article No:</span> {state.articleNo}
                    </p>

                    <div className="text-left mb-6 space-y-3 bg-[#95d5b2] p-4 rounded-lg">
                        <p><strong>Weight:</strong> {state.weight} g</p>
                        <p><strong>Price:</strong> ₹{state.price}</p>
                        <div>
                            <p className="font-bold">From (Sender):</p>
                            <p>{state.sender.name}, {state.sender.phone}</p>
                            <p className="text-sm">{state.sender.address}</p>
                        </div>
                        <div>
                            <p className="font-bold mt-2">To (Receiver):</p>
                            <p>{state.receiver.name}, {state.receiver.phone}</p>
                            <p className="text-sm">{state.receiver.address}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        <button
                            onClick={() => window.print()}
                            className="w-full bg-[#2d6a4f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1b4332] transition"
                        >
                            Generate Receipt
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="w-full bg-[#52b788] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Confirmation;
