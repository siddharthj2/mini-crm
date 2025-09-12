import { useState } from "react";
import customerApi from "../../api/customerApi";

export default function CustomerBulkUpload({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return setError("Select a JSON file first");
    setLoading(true);
    setError("");

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const res = await customerApi.bulkUpload(data);
      console.log(res.data);
      if (onSuccess) onSuccess(res.data.customers);
    } catch (err) {
      console.error(err);
      setError("Failed to upload file. Make sure it is valid JSON.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-2">Bulk Upload Customers</h3>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="file"
        accept=".json"
        onChange={(e) => setFile(e.target.files[0])}
        className="block mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
