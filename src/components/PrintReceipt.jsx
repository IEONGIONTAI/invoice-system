import React from "react";
import jsPDF from "jspdf";

const PrintReceipt = () => {
  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text("收據詳細資料", 10, 10);
    doc.text("收據號碼: 07454", 10, 20);
    doc.text("日期: 2024-12-01", 10, 30);
    doc.text("金額: HK$ 61000", 10, 40);
    doc.save("receipt.pdf");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">打印收據</h1>
      <button
        onClick={handlePrint}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        生成 PDF 並打印
      </button>
    </div>
  );
};

export default PrintReceipt;
