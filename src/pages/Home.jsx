import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import indiaPostLogo from "../assets/india-post-logo.png";

function Home() {
    const [weight, setWeight] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleNext = () => {
        const numWeight = parseFloat(weight);
        if (!weight || isNaN(numWeight) || numWeight <= 0) {
            setErrorMessage("Please enter a valid weight (1-70g).");
            return;
        }
        if (numWeight > 70) {
            setErrorMessage(
                "Booking is available only for articles up to 70 grams. For items above 70 grams, please consult the Postmaster."
            );
            return;
        }
        navigate("/booking", { state: { weight: numWeight } });
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F6EFD2]">
            {/* Navbar */}
            <nav className="bg-[#FF474C] text-white p-4 shadow-lg flex items-center justify-between sticky top-0 z-10">
                <h1 className="text-2xl font-bold">Book My Post</h1>
                <img src={indiaPostLogo} alt="India Post Logo" className="w-20 h-14 ml-4 bg-white" />
            </nav>

            {/* Step Progress Bar */}
            <div className="w-full max-w-3xl mx-auto my-6">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-[#FF474C] rounded-full w-1/4"></div>
                </div>
                <p className="text-center text-sm text-[#FF474C] mt-2 font-semibold">
                    Step 1 of 4: Enter Weight
                </p>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row items-center justify-center flex-grow p-6 gap-12">
                {/* Input Card */}
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center border-t-8 border-[#DA291C] transition-transform duration-300 hover:scale-105">
                    <h2 className="text-3xl font-bold text-[#DA291C] mb-4">Welcome to India Post</h2>
                    <p className="text-gray-600 mb-6">
                        <strong>Enter the weight of your letter to get started.</strong>
                    </p>

                    <label
                        htmlFor="weight"
                        className="block text-left text-gray-700 font-semibold mb-2"
                    >
                        Enter Weight (grams)
                    </label>
                    <input
                        type="number"
                        id="weight"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA291C] transition"
                        placeholder="e.g., 50"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                    {errorMessage && <p className="text-red-600 font-semibold mt-2">{errorMessage}</p>}

                    <button
                        onClick={handleNext}
                        className="mt-4 bg-[#DA291C] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#A92A20] shadow-sm hover:shadow-md transition w-full"
                    >
                        Next
                    </button>
                </div>

                {/* Instructions */}
                <div className="w-full md:w-80 bg-[#FFF8E1] rounded-lg shadow-lg p-6 text-left border border-[#FFD500] transition-colors duration-300 hover:bg-[#FFECB3]">
                    <h2 className="text-xl font-bold mb-4 text-[#000000]">Instructions</h2>
                    <ul className="list-disc list-inside space-y-2 text-[#000000]">
                        <li><strong>Weight Limit:</strong> Max 70 grams.</li>
                        <li><strong>Letter Type:</strong> Only registered letters allowed.</li>
                        <li><strong>Payment:</strong> Pay digitally via UPI or at counter with cash.</li>
                    </ul>
                </div>
            </div>

            {/* Floating Glassmorphic Button */}
            <a
                href="https://www.indiapost.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-10 right-10 z-[555] 
                           flex items-center gap-2
                           w-[50px] h-[50px]
                           rounded-[30px] 
                           bg-[rgba(16,16,16,0.35)] 
                           border border-[rgba(255,255,255,0.15)]
                           text-white font-medium
                           cursor-pointer
                           overflow-hidden whitespace-nowrap
                           px-3
                           transition-all duration-[550ms] ease-[cubic-bezier(0.6,0,0.4,1)]
                           hover:w-[280px]"
            >
                <img
                    src={indiaPostLogo}
                    alt="India Post"
                    className="w-6 h-6 object-contain flex-shrink-0"
                />
                <span className="truncate">India-post official website</span>
            </a>
        </div>
    );
}

export default Home;
