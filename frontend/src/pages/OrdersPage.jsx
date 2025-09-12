import OrderForm from "../components/Order/OrderForm";
import OrderList from "../components/Order/OrderList";

export default function OrdersPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Orders</h2>
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 mb-4">
        <OrderForm />
      </div>
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
        <OrderList />
      </div>
    </div>
  );
}