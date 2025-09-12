import CampaignForm from "../components/Campaign/CampaignForm";

export default function CampaignsPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Campaigns</h2>
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 mb-4">
        <CampaignForm />
      </div>
    </div>
  );
}