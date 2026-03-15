import { createSubscriber } from "./../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect } from "next/navigation";

// Server Component
export default async function AddSubscriberPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const error =
    searchParams?.error && typeof searchParams.error === "string"
      ? decodeURIComponent(searchParams.error)
      : "";

  return (
    <div className="max-w-xl mx-auto mt-12 bg-background p-6 rounded-lg border">
      <h1 className="text-2xl font-bold mb-3">Add Subscriber</h1>
      <form action={createSubscriberWithRedirect} className="space-y-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input required minLength={3} maxLength={256} type="email" name="email" id="email" placeholder="subscriber@email.com" />
        </div>
        <div>
          <Label htmlFor="name">Name <span className="italic text-xs text-muted-foreground">(optional)</span></Label>
          <Input type="text" name="name" id="name" placeholder="Subscriber name" />
        </div>
        {error && <div className="text-destructive text-sm">{error}</div>}
        <Button type="submit" className="w-full mt-4">Add Subscriber</Button>
      </form>
      <div className="mt-4 text-right">
        <Link className="text-primary underline text-sm" href="/dashboard/subscribers">
          Cancel
        </Link>
      </div>
    </div>
  );
}

async function createSubscriberWithRedirect(formData: FormData) {
  "use server";
  const res = await createSubscriber(formData);
  if (res.ok) {
    redirect("/dashboard/subscribers");
  }
  redirect(`/dashboard/subscribers/new?error=${encodeURIComponent(res.error || "Failed to add subscriber")}`);
}