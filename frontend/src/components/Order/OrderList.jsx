import { useEffect, useState } from "react";
import orderApi from "../../api/orderApi";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await orderApi.getAll();
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (!orders.length) return <p>No orders found</p>;

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-2">All Orders</h3>
      <ul>
        {orders.map((o) => (
          <li key={o._id}>
            Customer: {o.customerId?.name || o.customerId} | Amount: {o.amount} | Date:{" "}
            {new Date(o.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
