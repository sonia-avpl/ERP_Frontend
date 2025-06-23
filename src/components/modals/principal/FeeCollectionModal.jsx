import React, { useState } from "react";

const FeeCollectionModal = ({ isOpen, onClose, student }) => {
  const [payingAmount, setPayingAmount] = useState("");

  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white rounded-xl p-7 w-full max-w-sm shadow-xl border border-gray-100 transform scale-95 animate-scale-up-bounce">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 text-3xl font-light"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-1 text-gray-800 text-center">
          Process Fee Payment
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          For: <span className="font-semibold text-teal-600">{student.name}</span>
        </p>

        {/* Student & Fee Summary Card */}
        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg p-5 mb-6 border border-teal-100 shadow-sm text-center">
          <p className="text-base font-medium text-teal-800">
            Total Outstanding Fee:
          </p>
          <p className="font-extrabold text-3xl text-teal-900 mt-1">
            ₹{student.totalFees.toLocaleString("en-IN")}
          </p>
          <p className="text-sm text-teal-700 mt-2">
            {student.email}
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-8">
            <label
              htmlFor="payingAmount"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Amount to Collect
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-lg">₹</span>
              <input
                type="number"
                id="payingAmount"
                name="payingAmount"
                min="0"
                max={student.totalFees}
                value={payingAmount}
                onChange={(e) => setPayingAmount(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-lg font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out bg-white"
                placeholder="Enter amount"
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row-reverse justify-start sm:justify-between gap-3">
            <button
              type="submit"
              onClick={() => {
                console.log("Collecting:", payingAmount);
                onClose();
              }}
              className="px-6 py-2.5 bg-gradient-to-br from-teal-500 to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:from-teal-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Confirm Payment
            </button>
           
          </div>
        </form>
      </div>

    
    </div>
  );
};

export default FeeCollectionModal;