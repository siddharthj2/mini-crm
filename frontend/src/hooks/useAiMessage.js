import { useState } from "react";
import axios from "axios";

export default function useAiMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const generateMessage = async (prompt) => {
    setLoading(true);
    setError("");
    try {
        const res = await axios.post("http://localhost:8000/api/ai/generate", { 
            campaignName: prompt.name, 
            rules: prompt.rules 
        });
        setMessage(res.data.messages[0]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to generate message");
    }
    setLoading(false);
  };

  return { loading, error, message, generateMessage };
}
