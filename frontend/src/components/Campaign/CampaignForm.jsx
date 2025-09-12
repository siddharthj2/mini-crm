import React, { useState } from "react";
import campaignApi from "../../api/campaignApi";
import useAiMessage from "../../hooks/useAiMessage";

const CampaignForm = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [totalSpend, setTotalSpend] = useState("");
  const [visits, setVisits] = useState("");
  const [operator, setOperator] = useState("AND");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { generateMessage, loading: aiLoading, error: aiError, message: aiMessage } = useAiMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const rules = { minSpend: Number(totalSpend) || 0, maxVisits: Number(visits) || 0, operator };
      const res = await campaignApi.create({
        name,
        rules,
        message,
      });

      if (onSuccess) onSuccess(res); // refresh list after creating
      setName("");
      setTotalSpend("");
      setVisits("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Create Campaign</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Campaign Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-md bg-neutral-900 border border-neutral-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Total Spend</label>
          <input
            type="number"
            value={totalSpend}
            onChange={(e) => setTotalSpend(e.target.value)}
            className="w-full rounded-md bg-neutral-900 border border-neutral-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Visits</label>
          <input
            type="number"
            value={visits}
            onChange={(e) => setVisits(e.target.value)}
            className="w-full rounded-md bg-neutral-900 border border-neutral-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Operator</label>
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            className="w-full rounded-md bg-neutral-900 border border-neutral-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-1">Message Content</label>
        <textarea
          rows="5"
          value={aiMessage || message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          placeholder='"Hi {name}, welcome back!"'
        />
        {aiError && <p className="text-red-400 text-sm mt-1">{aiError}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => generateMessage({ name, rules: { spend: Number(totalSpend)||0, visits: Number(visits)||0 } })}
          disabled={aiLoading}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 disabled:opacity-60"
        >
          {aiLoading ? "Generating..." : "Generate by AI"}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-white/10 hover:bg-white/15 text-white px-4 py-2 border border-neutral-700"
        >
          {loading ? "Creating..." : "Create Campaign"}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </form>
  );
};

export default CampaignForm;
