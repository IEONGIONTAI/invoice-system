import React, { useContext, useState } from "react";
import { SettingsContext } from "../context/SettingsContext";

const AddReceipt = () => {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("保存中...");
  const [error, setError] = useState(false); // 用於顯示錯誤
  const { handlers } = useContext(SettingsContext);

  const [formData, setFormData] = useState({
    receiptNo: "",
    date: "",
    description: "",
    model: "",
    amount: "",
    notes: "",
    handler: "",
    buyFrom: "",
    cost: "",
    category: "",
    origin: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const reset = () => {
    setStatusMessage("保存中...");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.handler) {
      setError(true); // 如果未選擇，顯示錯誤
      return;
    }
    setLoading(true);
  };

  const handleAutoGenNumber = () => {
    setFormData({ ...formData, receiptNo: 123456 });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">新增收據 #0001</h1>
      <form
        className="bg-white p-6 rounded shadow space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="grid grid-cols-2 gap-4 gap-y-2">
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                收據號碼
              </label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  required
                  name="receiptNo"
                  className="w-full border rounded p-2"
                  onChange={handleChange}
                ></input>
                <button
                  onClick={handleAutoGenNumber}
                  type="button"
                  className="bg-blue-500 text-white text-sm/6 text-nowrap py-2 px-4 rounded hover:bg-blue-600"
                >
                  自動生成
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                購自
              </label>
              <input
                type="text"
                name="buyFrom"
                className="w-full border rounded p-2"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                型號
              </label>
              <input
                type="text"
                name="model"
                className="w-full border rounded p-2"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                購貨成本
              </label>
              <input
                type="text"
                name="cost"
                className="w-full border rounded p-2"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                貨物類別
              </label>
              <input
                type="text"
                name="category"
                className="w-full border rounded p-2"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                來源地
              </label>
              <input
                type="text"
                name="origin"
                className="w-full border rounded p-2"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                重量
              </label>
              <input
                type="text"
                placeholder="ex.50g"
                name="weight"
                className="w-full border rounded p-2"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                金額
              </label>
              <input
                type="number"
                name="amount"
                className="w-full border rounded p-2"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                日期
              </label>
              <input
                type="date"
                name="date"
                className="w-full border rounded p-2"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                經手人
              </label>
              <select
                name="handler"
                className={`w-full border p-2 rounded ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                onChange={handleChange}
              >
                <option value="">請選擇經手人</option>
                {handlers.map((handler) => {
                  return <option value={handler}>{handler}</option>;
                })}
              </select>
              {error && (
                <p className="text-red-500 text-sm mt-1">請選擇一位經手人！</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              備註
            </label>
            <textarea
              type="text"
              name="notes"
              className="w-full border rounded p-2"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex space-x-4 items-center">
          {!loading ? (
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              保存並列印
            </button>
          ) : (
            <>
              <div role="status" className="py-2">
                <svg
                  aria-hidden="true"
                  class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              {statusMessage}
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddReceipt;
