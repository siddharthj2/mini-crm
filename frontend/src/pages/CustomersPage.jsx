import CustomerForm from "../components/Customer/CustomerForm";
import BulkUpload from "../components/Customer/CustomerBulkUpload";
import CustomerList from "../components/Customer/CustomerList";

export default function CustomersPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Customers</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
          <CustomerForm />
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
          <BulkUpload />
        </div>
      </div>
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 mt-4">
        <CustomerList />
      </div>
    </div>
  );
}
