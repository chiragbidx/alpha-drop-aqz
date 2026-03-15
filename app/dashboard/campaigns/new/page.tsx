"use client";
import { createCampaign } from "./../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";

function FormSubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full mt-4">
      {pending ? "Saving..." : children}
    </Button>
  );
}

export default function NewCampaignPage() {
  const [state, formAction] = useFormState(handleCreate, { ok: null, error: "" });

  // Server-action handler (redirect on success)
  async function handleCreate(prevState: any, formData: FormData) {
    "use server";
    const res = await createCampaign(formData);
    if (res.ok) {
      redirect("/dashboard/campaigns");
    }
    return { ok: res.ok, error: res.error ?? "" };
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-background p-6 rounded-lg border">
      <h1 className="text-2xl font-bold mb-3">Create Campaign</h1>
      <form action={formAction} className="space-y-5">
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
        {state.error && <div className="text-destructive text-sm">{state.error}</div>}
        <FormSubmitButton>Create Campaign</FormSubmitButton>
      </form>
      <div className="mt-4 text-right">
        <Link className="text-primary underline text-sm" href="/dashboard/campaigns">
          Cancel
        </Link>
      </div>
    </div>
  );
}