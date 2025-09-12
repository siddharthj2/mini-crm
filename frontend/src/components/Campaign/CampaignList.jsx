import React, { useEffect, useState } from "react";
import campaignApi from "../../api/campaignApi";
import CampaignForm from "./CampaignForm";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaigns = async () => {
    try {
      const res = await campaignApi.getAll();
      setCampaigns(res.campaigns || []);
    } catch (err) {
      setError("Failed to load campaigns");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="campaign-list">
      <CampaignForm onSuccess={fetchCampaigns} />

      <h2>Your Campaigns</h2>
      {loading ? (
        <p>Loading campaigns...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : campaigns.length === 0 ? (
        <p>No campaigns found</p>
      ) : (
        <ul>
          {campaigns.map((c) => (
            <li key={c._id} style={{ marginBottom: "1rem" }}>
              <h3>{c.name}</h3>
              <p><b>Summary:</b> {c.summary}</p>
              <p>
                <b>Stats:</b> Sent: {c.stats.sent}, Failed: {c.stats.failed}, Total: {c.stats.total}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CampaignList;
