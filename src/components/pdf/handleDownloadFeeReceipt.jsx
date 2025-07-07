import { jsPDF } from "jspdf";
import { toWords } from "number-to-words";

const handleDownloadFeeReceipt = (students) => {
  if (!students || students.length === 0) return;

  const logoUrl = "/logo/iti_logo.png";

  students.forEach((student, index) => {
    const doc = new jsPDF();
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // Add logo
      doc.addImage(img, "PNG", 150, 10, 40, 30);

      // College Name (centered and larger)
      const collegeName = student.collegeLocation || "ABC College";
      doc.setFontSize(18);
      const pageWidth = doc.internal.pageSize.getWidth();
      const collegeTextWidth = doc.getTextWidth(collegeName);
      const collegeX = (pageWidth - collegeTextWidth) / 2;
      doc.text(collegeName, collegeX, 20);

      // Date Format
      const rawDate = new Date(student.createdAt || Date.now());
      const formattedDate = `${String(rawDate.getDate()).padStart(2, "0")}-${String(
        rawDate.getMonth() + 1
      ).padStart(2, "0")}-${String(rawDate.getFullYear()).slice(2)}`;

      const receiptNo = student.registrationNo || `#${1000 + index}`;

      // Header
      doc.setFontSize(10);
      doc.text("FEE SLIP FOR SESSION 2025 - 2026", 20, 40);
      doc.text(`Date: ${formattedDate}`, 150, 40);

      doc.setFontSize(12);
      doc.text(`Fee Receipt No: ${receiptNo}`, 20, 50);

      // Body Section
      let y = 70;
      const rowHeight = 10;
      const labelX = 20;
      const labelWidth = 70;
      const valueX = labelX + labelWidth;
      const valueWidth = 80;

      doc.setFontSize(10);

      const rows = [
        { label: "Student Name", value: student.name || "N/A" },
        { label: "Father Name", value: student.fatherName || "N/A" },
        { label: "Trade", value: student.courseName || "N/A" },
      ];

      rows.forEach((row) => {
        doc.rect(labelX, y, labelWidth, rowHeight);
        doc.rect(valueX, y, valueWidth, rowHeight);
        doc.text(row.label.toString(), labelX + 2, y + 7);
        doc.text(row.value.toString(), valueX + 2, y + 7);
        y += rowHeight;
      });

      // Installments
      const installmentValues = student.installments || ["Rs. 1000", "Rs. 500", "Rs. 500"];
      const thirdWidth = valueWidth / 3;

      doc.rect(labelX, y, labelWidth, rowHeight);
      doc.text("Installments", labelX + 2, y + 7);

      for (let i = 0; i < 3; i++) {
        const partX = valueX + i * thirdWidth;
        doc.rect(partX, y, thirdWidth, rowHeight);
        doc.text((installmentValues[i] || "Rs. 0").toString(), partX + 2, y + 7);
      }
      y += rowHeight;

      // Date again
      doc.rect(labelX, y, labelWidth, rowHeight);
      doc.rect(valueX, y, valueWidth, rowHeight);
      doc.text("Date", labelX + 2, y + 7);
      doc.text((student.date || formattedDate).toString(), valueX + 2, y + 7);

      // Particulars
      y += rowHeight + 5;
      const totalAmount = Number(student.totalFees) || 0;

      const particulars = [
        { label: "Tuition Fee", value: "Rs. 40 per month" },
        {
          label: "Caution Money",
          value: student.cautionFee ? `Rs. ${student.cautionFee}` : "Rs. 300",
        },
        {
          label: "Total Amount",
          value: `Rs. ${totalAmount}`,
        },
      ];

      doc.setFont(undefined, "bold");
      doc.rect(labelX, y, labelWidth, rowHeight);
      doc.rect(valueX, y, valueWidth, rowHeight);
      doc.text("Particulars", labelX + 2, y + 7);
      doc.text("Amount (INR)", valueX + 2, y + 7);
      doc.setFont(undefined, "normal");
      y += rowHeight;

      particulars.forEach((item) => {
        doc.rect(labelX, y, labelWidth, rowHeight);
        doc.rect(valueX, y, valueWidth, rowHeight);
        doc.text(item.label.toString(), labelX + 2, y + 7);
        doc.text(item.value.toString(), valueX + 2, y + 7);
        y += rowHeight;
      });

      // Amount in Words
      y += 10;
      const amountInWords = toWords(totalAmount);
      doc.text(
        `Amount in Words: ${amountInWords.charAt(0).toUpperCase() + amountInWords.slice(1)} Only`,
        labelX,
        y
      );
      y += rowHeight;

      // Received By
      doc.text("Received by: ___________________________ (Signature with Date)", labelX, y);
      y += rowHeight;

      // Footer note (center aligned)
      doc.setFontSize(9);
      doc.setTextColor(100);
      const note =
        "Note: Keep this slip safe for future reference. Fees once paid are non-refundable.";
      const noteWidth = doc.getTextWidth(note);
      const centerX = (pageWidth - noteWidth) / 2;
      doc.text(note, centerX, 285);

      // Download PDF
      const pdfBlob = doc.output("blob");
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${student.name || "fee-receipt"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    };

    img.src = logoUrl;
  });
};

export default handleDownloadFeeReceipt;
