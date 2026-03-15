import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { emailCampaigns, campaignRecipients, teamMembers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// This is the InboxPilot Campaigns dashboard
export default async function CampaignsPage() {
  const session = await getAuthSession();
  if (!session) {
    return <div>Unauthorized</div>;
  }

  // Get this user's teamId from team_members table
  const [teamMember] =
    await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.userId, session.userId))
      .limit(1);

  const teamId = teamMember?.teamId;

  let campaigns: any[] = [];
  if (teamId) {
    campaigns = await db
      .select()
      .from(emailCampaigns)
      .where(eq(emailCampaigns.teamId, teamId))
      .orderBy(emailCampaigns.createdAt);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <Button asChild>
          <Link href="/dashboard/campaigns/new">New Campaign</Link>
        </Button>
      </div>
      {campaigns.length === 0 ? (
        <div className="text-muted-foreground text-center mt-16">
          <h2 className="text-xl font-semibold mb-4">
            You have no campaigns yet.
          </h2>
          <p className="mb-4">
            Start by launching your first email campaign to engage your subscribers.
          </p>
          <Button asChild>
            <Link href="/dashboard/campaigns/new">Create Campaign</Link>
          </Button>
        </div>
      ) : (
        <div>
          <table className="w-full table-auto border">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Subject</th>
                <th>Recipients</th>
                <th>Scheduled</th>
                <th>Sent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="text-center border-t">
                  <td>{campaign.name}</td>
                  <td>{campaign.status}</td>
                  <td>{campaign.subject}</td>
                  <td>
                    {/* Count recipients */}
                    <CampaignRecipientsCount campaignId={campaign.id} />
                  </td>
                  <td>
                    {campaign.scheduledAt
                      ? new Date(campaign.scheduledAt).toLocaleString()
                      : "--"}
                  </td>
                  <td>
                    {campaign.sentAt
                      ? new Date(campaign.sentAt).toLocaleString()
                      : "--"}
                  </td>
                  <td>
                    <Button asChild variant="secondary" className="mr-2">
                      <Link href={`/dashboard/campaigns/${campaign.id}`}>View</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Helper Server Component to show # of recipients
async function CampaignRecipientsCount({ campaignId }: { campaignId: string }) {
  const count = await db
    .select()
    .from(campaignRecipients)
    .where(eq(campaignRecipients.campaignId, campaignId));

  return <span>{count.length}</span>;
}