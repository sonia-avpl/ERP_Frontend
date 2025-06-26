import React from "react";
import { groupPaymentsByMonth } from "../../utills/functions";

const GroupedPayment = ({ feeTransaction }) => {
  const groupedPayments = groupPaymentsByMonth(feeTransaction);
  
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      {Object.entries(groupedPayments)
        .sort(([a], [b]) => new Date(a + " 1") - new Date(b + " 1"))
        .map(([month, payments]) => (
          <div key={month} className="mb-6">
            <div className="text-blue-700 font-semibold mb-2">{month}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {payments.map((payment, index) => (
                <div
                  key={payment._id}
                  className="flex justify-between items-center text-sm text-gray-700 p-3 bg-blue-50 rounded-md"
                >
                  <div>
                    <div className="font-medium">Installment {index + 1}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(payment.date).toLocaleDateString()}{" "}
                      {payment.role && `by ${payment.role}`}
                    </div>
                  </div>
                  <div className="text-green-600 font-semibold">
                    ₹{payment.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default GroupedPayment;
