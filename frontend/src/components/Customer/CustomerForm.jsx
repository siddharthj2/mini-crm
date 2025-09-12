import { useState } from "react";
import customerApi from "../../api/customerApi";

export default function CustomerForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await customerApi.create({ name, email, phone });
      console.log(res.data);
      setName(""); setEmail(""); setPhone("");
      if (onSuccess) onSuccess(res.data.customer);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error creating customer");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-2">Add Customer</h3>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block mb-2 p-2 border w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block mb-2 p-2 border w-full"
      />
      <input
        type="number"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="block mb-2 p-2 border w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Customer"}
      </button>
    </form>
  );
}
