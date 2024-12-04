import React, { useState } from "react";
import jsPDF from "jspdf";

const ManageReceipts = () => {
  const [receipts, setReceipts] = useState([
    {
      id: 1,
      receiptNo: "07454",
      date: "2024-12-01",
      amount: 61000,
      description: "IWC 運動表",
    },
    {
      id: 2,
      receiptNo: "07455",
      date: "2024-12-02",
      amount: 72000,
      description: "Rolex 潛航者",
    },
    {
      id: 3,
      receiptNo: "07456",
      date: "2024-12-03",
      amount: 85000,
      description: "Omega 星座",
    },
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 4,
      receiptNo: `0745${i + 4}`,
      date: `2024-12-${(i % 30) + 1}`.padStart(10, "0"),
      amount: 60000 + i * 1000,
      description: `測試商品 ${i + 4}`,
    })),
  ]);
  const [searchTerm, setSearchTerm] = useState(""); // 搜尋關鍵字
  const [currentPage, setCurrentPage] = useState(1); // 當前頁數
  const receiptsPerPage = 10; // 每頁顯示 10 條數據
  const [deleteId, setDeleteId] = useState(null); // 用於記錄待刪除的收據 ID

  // 搜尋邏輯：根據輸入的關鍵字篩選數據
  const filteredReceipts = receipts.filter(
    (receipt) =>
      receipt.receiptNo.includes(searchTerm) ||
      receipt.date.includes(searchTerm) ||
      receipt.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 分頁邏輯
  const totalPages = Math.ceil(filteredReceipts.length / receiptsPerPage);
  const indexOfLastReceipt = currentPage * receiptsPerPage;
  const indexOfFirstReceipt = indexOfLastReceipt - receiptsPerPage;
  const currentReceipts = filteredReceipts.slice(
    indexOfFirstReceipt,
    indexOfLastReceipt
  );

  // 分頁切換處理
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // 生成 PDF 預覽
  const generatePDF = (receipt) => {
    const doc = new jsPDF();
    doc.text("收據詳細資料", 10, 10);
    doc.text(`收據號碼: ${receipt.receiptNo}`, 10, 20);
    doc.text(`日期: ${receipt.date}`, 10, 30);
    doc.text(`金額: HK$ ${receipt.amount}`, 10, 40);
    doc.text(`描述: ${receipt.description}`, 10, 50);

    // 將 PDF 轉換為 Blob URL 並設置為預覽
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank"); // 新標籤頁預覽
  };

  const confirmDelete = () => {
    setReceipts(receipts.filter((receipt) => receipt.id !== deleteId)); // 刪除目標數據
    setDeleteId(null); // 清空待刪除 ID
    alert(`收據 ID ${deleteId} 已刪除`);
  };

  const cancelDelete = () => {
    setDeleteId(null); // 清空待刪除 ID
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">收據管理</h1>

      {/* 搜尋框 */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="搜尋收據（號碼、日期或描述）"
          className="w-full border p-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 收據表格 */}
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-4">收據號碼</th>
            <th className="p-4">日期</th>
            <th className="p-4">金額</th>
            <th className="p-4">描述</th>
            <th className="p-4">操作</th>
          </tr>
        </thead>
        <tbody>
          {currentReceipts.map((receipt) => (
            <tr key={receipt.id} className="border-t">
              <td className="p-4">{receipt.receiptNo}</td>
              <td className="p-4">{receipt.date}</td>
              <td className="p-4">HK$ {receipt.amount}</td>
              <td className="p-4">{receipt.description}</td>
              <td className="p-4 space-x-2">
                <button
                  onClick={() => generatePDF(receipt)}
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                >
                  預覽 PDF
                </button>
                <button
                  onClick={() => setDeleteId(receipt.id)} // 設置待刪除的 ID
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 分頁按鈕 */}
      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          上一頁
        </button>
        <p>
          第 {currentPage} 頁 / 共 {totalPages} 頁
        </p>
        <button
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          下一頁
        </button>
      </div>

      {/* 沒有搜尋結果時顯示提示 */}
      {filteredReceipts.length === 0 && (
        <p className="mt-4 text-gray-500">未找到符合條件的收據。</p>
      )}

      {/* 刪除確認彈窗 */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-bold mb-4">確認刪除</h2>
            <p>確定要刪除收據 ID {deleteId} 嗎？此操作無法撤銷。</p>
            <div className="mt-4 space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                確認刪除
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReceipts;
