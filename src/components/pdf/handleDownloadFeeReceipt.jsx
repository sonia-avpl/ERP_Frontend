import { jsPDF } from "jspdf";
import { toWords } from "number-to-words";

const handleDownloadFeeReceipt = (students) => {
  if (!students || students.length === 0) return;

  students.forEach((student, index) => {
    const doc = new jsPDF();
    const img = new Image();
    img.crossOrigin = "anonymous";

    const logoMap = {
      polytechnic: "/logo/polytechnic_logo.jpg",
      iti: "/logo/iti_logo.png",
    };

    const logoUrl = logoMap[student.courseType] || "/logo/default_logo.png";

    img.onload = () => {
      doc.addImage(img, "PNG", 150, 10, 40, 20);

      const pageWidth = doc.internal.pageSize.getWidth();

      // College Name
      const collegeName = student.collegeLocation || "ABC College";
      doc.setFontSize(16);
      const collegeX = (pageWidth - doc.getTextWidth(collegeName)) / 2;
      doc.text(collegeName, collegeX, 20);

      // Address from createdByDetails
      const address =
        student.createdByDetails?.address || "Mirzapur, Uttar Pradesh";
      doc.setFontSize(8);
      const addressX = (pageWidth - doc.getTextWidth(address)) / 2;
      doc.text(address, addressX, 27);

      // Phone from createdByDetails
      const phone = student.createdByDetails?.phone || "+91-XXXXXXXXXX";
      const phoneX = (pageWidth - doc.getTextWidth(phone)) / 2;
      doc.text(phone, phoneX, 33);

      // Date Format
      const rawDate = new Date(student.createdAt || Date.now());
      const formattedDate = `${String(rawDate.getDate()).padStart(
        2,
        "0"
      )}-${String(rawDate.getMonth() + 1).padStart(2, "0")}-${String(
        rawDate.getFullYear()
      ).slice(2)}`;

      const receiptNo = student.registrationNo || `#${1000 + index}`;

      // Header
      doc.setFontSize(10);
      doc.text("FEE SLIP FOR SESSION 2025 - 2026", 20, 40);
      doc.text(`Date: ${formattedDate}`, 150, 40);

      doc.setFontSize(12);
      doc.text(`Fee Receipt No: ${receiptNo}`, 20, 50);

      // Body
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
      const installmentValues = student.installments || ["I", "II", "III"];
      const thirdWidth = valueWidth / 3;

      doc.rect(labelX, y, labelWidth, rowHeight);
      doc.text("Installments", labelX + 2, y + 7);

      for (let i = 0; i < 3; i++) {
        const partX = valueX + i * thirdWidth;
        doc.rect(partX, y, thirdWidth, rowHeight);
        doc.text(
          (installmentValues[i] || "Rs. 0").toString(),
          partX + 2,
          y + 7
        );
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

      const cautionFee = isNaN(Number(student.cautionFee))
        ? 300
        : Number(student.cautionFee);

      const paidAmount = Number(student.totalPaid) || 0;
      const balanceAmount = totalAmount - paidAmount;

      const particulars = [
        { label: "Registration Fee", value: "Rs. 0" },
        { label: "Tuition Fee", value: "Rs. 40 per month" },
        { label: "Examination Fee", value: "Rs. 0" },
        { label: "Library Fee", value: "Rs. 0" },
        {
          label: "Caution Money",
          value: `Rs. ${cautionFee}`,
        },
        {
          label: "Total Amount",
          value: `Rs. ${totalAmount.toLocaleString("en-IN")}`,
        },
        {
          label: "Paid Amount",
          value: `Rs. ${paidAmount.toLocaleString("en-IN")}`,
        },
        {
          label: "Balance",
          value: `Rs. ${balanceAmount.toLocaleString("en-IN")}`,
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
        // Bold only "Balance"
        if (item.label === "Balance") {
          doc.setFont(undefined, "bold");
        } else {
          doc.setFont(undefined, "normal");
        }

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
        `Amount in Words: ${
          amountInWords.charAt(0).toUpperCase() + amountInWords.slice(1)
        } Only`,
        labelX,
        y
      );
      y += rowHeight;

      // Signature
      doc.text(
        "Received by: ___________________________ (Signature with Date)",
        labelX,
        y
      );
      y += rowHeight;

      // Footer Note
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
      const safeFileName = (student.name || "fee-receipt").replace(/\s+/g, "_");
      link.href = blobUrl;
      link.download = `${safeFileName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    };

    img.onerror = () => {
      console.error(
        "Failed to load logo image for course type:",
        student.courseType
      );
    };

    img.src = logoUrl;
  });
};

export default handleDownloadFeeReceipt;
