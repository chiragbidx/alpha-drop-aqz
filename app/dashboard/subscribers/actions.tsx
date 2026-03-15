"use server";

import { z } from "zod";
import { db } from "@/lib/db/client";
import { getAuthSession } from "@/lib/auth/session";
import { subscribers, teamMembers } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// InboxPilot: Action to create a subscriber
const createSubscriberSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(128).optional(),
});

export async function createSubscriber(formData: FormData) {
  const session = await getAuthSession();
  if (!session)
    return { ok: false, error: "Unauthorized", subscriber: null };

  // Corrected: use eq() for query
  const [teamMember] =
    await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.userId, session.userId))
      .limit(1);

  const teamId = teamMember?.teamId;
  if (!teamId)
    return { ok: false, error: "No team found", subscriber: null };

  const data = {
    email: formData.get("email"),
    name: formData.get("name"),
  };
  const parse = createSubscriberSchema.safeParse(data);
  if (!parse.success)
    return { ok: false, error: parse.error.message, subscriber: null };

  // Uniqueness check by team and email
  const existing = await db
    .select()
    .from(subscribers)
    .where((sub, { and, eq }) =>
      and(eq(sub.teamId, teamId), eq(sub.email, parse.data.email))
    )
    .first();
  if (existing) {
    return { ok: false, error: "Subscriber already exists on this team", subscriber: null };
  }

  const subscriber = await db
    .insert(subscribers)
    .values({
      email: parse.data.email,
      name: parse.data.name ?? "",
      teamId,
      status: "active",
      consentedAt: new Date(),
    })
    .returning()
    .then((rows) => rows[0]);

  return { ok: !!subscriber, subscriber, error: subscriber ? "" : "Failed to create subscriber" };
}