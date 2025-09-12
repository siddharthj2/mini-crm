import CampaignForm from "../components/Campaign/CampaignForm";
import CampaignList from "../components/Campaign/CampaignList";

export default function CampaignsPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Campaigns</h2>
      <CampaignForm />
      <CampaignList />
    </div>
  );
}