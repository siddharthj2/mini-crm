import { useEffect, useState } from "react";
import customerApi from "../../api/customerApi";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const res = await customerApi.getAll();
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <p>Loading customers...</p>;
  if (!customers.length) return <p>No customers found</p>;

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-2">All Customers</h3>
      <ul>
        {customers.map((c) => (
          <li key={c._id}>
            {c.name} - {c.email} - {c.phone || "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}
