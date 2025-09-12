import CustomerForm from "../components/customers/CustomerForm";
import BulkUpload from "../components/customers/customerBulkUpload";
import CustomerList from "../components/customers/CustomerList";

export default function CustomersPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Customers</h2>
      <div className="grid grid-cols-2 gap-4">
        <CustomerForm />
        <BulkUpload />
      </div>
      <CustomerList />
    </div>
  );
}
