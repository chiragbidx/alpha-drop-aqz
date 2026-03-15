"use client";
import { createSubscriber } from "./../actions";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

function FormSubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full mt-4">
      {pending ? "Saving..." : children}
    </Button>
  );
}

export default function AddSubscriberPage() {
  const [state, formAction] = useFormState(handleCreate, { ok: null, error: "" });

  // Server-action handler (redirect on success)
  async function handleCreate(prevState: any, formData: FormData) {
    "use server";
    const res = await createSubscriber(formData);
    if (res.ok) {
      redirect("/dashboard/subscribers");
    }
    return { ok: res.ok, error: res.error ?? "" };
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-background p-6 rounded-lg border">
      <h1 className="text-2xl font-bold mb-3">Add Subscriber</h1>
      <form action={formAction} className="space-y-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input required minLength={3} maxLength={256} type="email" name="email" id="email" placeholder="subscriber@email.com" />
        </div>
        <div>
          <Label htmlFor="name">Name <span className="italic text-xs text-muted-foreground">(optional)</span></Label>
          <Input type="text" name="name" id="name" placeholder="Subscriber name" />
        </div>
        {state.error && <div className="text-destructive text-sm">{state.error}</div>}
        <FormSubmitButton>Add Subscriber</FormSubmitButton>
      </form>
      <div className="mt-4 text-right">
        <Link className="text-primary underline text-sm" href="/dashboard/subscribers">
          Cancel
        </Link>
      </div>
    </div>
  );
}