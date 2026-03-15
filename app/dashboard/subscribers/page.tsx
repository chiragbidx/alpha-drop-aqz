import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { subscribers, teamMembers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// InboxPilot Subscribers management page
export default async function SubscribersPage() {
  const session = await getAuthSession();
  if (!session) {
    return <div>Unauthorized</div>;
  }

  // Get teamId for this user from team_members table
  const [teamMember] =
    await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.userId, session.userId))
      .limit(1);

  const teamId = teamMember?.teamId;

  let allSubscribers: any[] = [];
  if (teamId) {
    allSubscribers = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.teamId, teamId))
      .orderBy(subscribers.createdAt);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Subscribers</h1>
        <Button asChild>
          <Link href="/dashboard/subscribers/new">Add Subscriber</Link>
        </Button>
      </div>
      {allSubscribers.length === 0 ? (
        <div className="text-muted-foreground text-center mt-16">
          <h2 className="text-xl font-semibold mb-4">No subscribers yet.</h2>
          <p className="mb-4">
            Import or add subscribers to build your audience in InboxPilot.
          </p>
          <Button asChild>
            <Link href="/dashboard/subscribers/new">Add Subscriber</Link>
          </Button>
        </div>
      ) : (
        <div>
          <table className="w-full table-auto border">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Status</th>
                <th>Consented</th>
                <th>Unsubscribed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allSubscribers.map((sub) => (
                <tr key={sub.id} className="text-center border-t">
                  <td>{sub.email}</td>
                  <td>{sub.name || "--"}</td>
                  <td>{sub.status}</td>
                  <td>
                    {sub.consentedAt
                      ? new Date(sub.consentedAt).toLocaleString()
                      : "--"}
                  </td>
                  <td>
                    {sub.unsubscribedAt
                      ? new Date(sub.unsubscribedAt).toLocaleString()
                      : "--"}
                  </td>
                  <td>
                    <Button asChild variant="secondary" className="mr-2">
                      <Link href={`/dashboard/subscribers/${sub.id}`}>View</Link>
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