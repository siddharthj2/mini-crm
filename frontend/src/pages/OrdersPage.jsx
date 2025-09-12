import OrderForm from "../components/orders/OrderForm";
import OrderList from "../components/orders/OrderList";

export default function OrdersPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Orders</h2>
      <OrderForm />
      <OrderList />
    </div>
  );
}