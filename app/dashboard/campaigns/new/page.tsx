import { createCampaign } from "./../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { redirect } from "next/navigation";

// Server Component
export default async function NewCampaignPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  // Parse error from search params if redirected back after error
  const error =
    searchParams?.error && typeof searchParams.error === "string"
      ? decodeURIComponent(searchParams.error)
      : "";

  return (
    <div className="max-w-xl mx-auto mt-12 bg-background p-6 rounded-lg border">
      <h1 className="text-2xl font-bold mb-3">Create Campaign</h1>
      <form action={createCampaignWithRedirect} className="space-y-5">
        <div>
          <Label htmlFor="name">Campaign Name</Label>
          <Input required minLength={3} maxLength={128} type="text" name="name" id="name" placeholder="Summer Launch" />
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input required minLength={3} maxLength={256} type="text" name="subject" id="subject" placeholder="Exciting updates inside!" />
        </div>
        <div>
          <Label htmlFor="content">HTML Content</Label>
          <Textarea required minLength={1} name="content" id="content" placeholder="<h1>Hello</h1><p>This is the email body.</p>" rows={8} />
        </div>
        <div>
          <Label htmlFor="scheduledAt">Scheduled At <span className="italic text-xs text-muted-foreground">(optional)</span></Label>
          <Input type="datetime-local" name="scheduledAt" id="scheduledAt" />
        </div>
        {error && <div className="text-destructive text-sm">{error}</div>}
        <Button type="submit" className="w-full mt-4">Create Campaign</Button>
      </form>
      <div className="mt-4 text-right">
        <Link className="text-primary underline text-sm" href="/dashboard/campaigns">
          Cancel
        </Link>
      </div>
    </div>
  );
}

// Must be outside component for server action
async function createCampaignWithRedirect(formData: FormData) {
  "use server";
  const res = await createCampaign(formData);
  if (res.ok) {
    redirect("/dashboard/campaigns");
  }
  // Redirect with error message as query param
  redirect(`/dashboard/campaigns/new?error=${encodeURIComponent(res.error || "Failed to create campaign")}`);
}