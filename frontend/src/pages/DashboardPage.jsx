import CampaignList from "../components/Campaign/CampaignList";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <CampaignList />
    </div>
  );
}