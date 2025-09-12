import { useState, useEffect } from "react";
import orderApi from "../../api/orderApi";
import customerApi from "../../api/customerApi";

export default function OrderForm({ onSuccess }) {
  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await customerApi.getMe();
        setCustomerId(res.data._id); 
      } catch (err) {
        console.error(err);
        setError("Failed to fetch your customer info");
      }
    };
    fetchCustomer();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerId) return setError("Customer info not loaded yet");
    setLoading(true);
    setError("");

    try {
      const res = await orderApi.create({ customerId, amount });
      setAmount("");
      if (onSuccess) onSuccess(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error creating order");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-2">Create Order</h3>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="block mb-2 p-2 border w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        disabled={loading || !customerId}
      >
        {loading ? "Creating..." : "Create Order"}
      </button>
    </form>
  );
}
