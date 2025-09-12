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
      setError(err.response?.data?.message || "Failed to upload file. Make sure it is valid JSON.");
    }
    setLoading(false);
  };

  return (
    <div className="">
      <h3 className="text-lg font-semibold text-white mb-2">Bulk Upload</h3>
      {error && <p className="text-red-400">{error}</p>}
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept=".json"
          onChange={(e) => setFile(e.target.files[0])}
          className="block text-sm text-neutral-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-neutral-800 file:text-neutral-200 hover:file:bg-neutral-700"
        />
        <button
          onClick={handleUpload}
          className="rounded-md bg-blue-600 hover:bg-blue-500 text-white px-4 py-2"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}
