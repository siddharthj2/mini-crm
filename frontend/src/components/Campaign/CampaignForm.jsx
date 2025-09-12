import React, { useState } from "react";
import campaignApi from "../../api/campaignApi";

const CampaignForm = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [rules, setRules] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await campaignApi.create({
        name,
        rules: rules ? JSON.parse(rules) : {}, // expect JSON string for now
      });

      if (onSuccess) onSuccess(res); // refresh list after creating
      setName("");
      setRules("");
    } catch (err) {
      console.error(err);
      setError("Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>Create New Campaign</h2>

      <div>
        <label>Campaign Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Rules (JSON format)</label>
        <textarea
          rows="4"
          value={rules}
          onChange={(e) => setRules(e.target.value)}
          placeholder='e.g. {"age": "18-25", "region": "India"}'
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Campaign"}
      </button>
    </form>
  );
};

export default CampaignForm;
