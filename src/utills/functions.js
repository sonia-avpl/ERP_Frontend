export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getMaxDOB = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 14);
  return today.toISOString().split("T")[0];
};

export const getTitle = (path) => {
  const cleanPath = path.split("/").filter(Boolean);
  if (cleanPath.length === 1) {
    return cleanPath[0].replace(/-/g, " ").toUpperCase();
  }

  if (cleanPath.includes("edit")) return "Edit Admission";
  if (cleanPath.includes("create")) return "Create Admission";
  if (cleanPath.includes("admission")) return "Admission Details";
  if (cleanPath.includes("projects")) return "Projects";

  // Default fallback
  return cleanPath[0]?.replace(/-/g, " ").toUpperCase();
};

export const groupPaymentsByMonth = (feeTransaction) => {
  const grouped = {};

  feeTransaction?.forEach((fee) => {
    fee.payments.forEach((payment) => {
      const date = new Date(payment.date);
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const monthYear = `${month} ${year}`;

      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }

      grouped[monthYear].push({
        ...payment,
        feeId: fee._id,
        amount: payment.amount,
        role: fee.roleId?.name || "",
      });
    });
  });

  return grouped;
};

export const getFeeDetails = (institute, trade, type, category) => {
  return feeMatrix.find(
    (item) =>
      item.institute.toLowerCase() === institute.toLowerCase() &&
      item.trade.toLowerCase() === trade.toLowerCase() &&
      item.type.toLowerCase() === type.toLowerCase() &&
      item.category.toLowerCase() === category.toLowerCase()
  );
};

export const handleDownload = (selectedStudents) => {
  if (selectedStudents.length === 0) {
    alert("No students selected for download.");
    return;
  }

  const csvHeader = [
    "Registration No",
    "Name",
    "Fee Status",
    "Total Fees",
    "Paid Amount",
    "Bank Submitted",
  ];

  const csvRows = selectedStudents.map((s) => [
    s.registrationNo,
    s.name,
    s.feeStatus ? "Submitted" : "Pending",
    s.totalFees,
    s.totalPaid,
    s.bankSubmitted ? "Yes" : "No",
  ]);

  const csvContent = [csvHeader, ...csvRows]
    .map((row) => row.map((val) => `"${val}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "selected_students.csv";
  a.click();
  URL.revokeObjectURL(url);
};
