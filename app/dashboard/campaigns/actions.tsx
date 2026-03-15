"use server";

import { z } from "zod";
import { db } from "@/lib/db/client";
import { getAuthSession } from "@/lib/auth/session";
import { emailCampaigns, teamMembers } from "@/lib/db/schema";

// InboxPilot: Server action for creating a campaign
const createCampaignSchema = z.object({
  name: z.string().min(3).max(128),
  subject: z.string().min(3).max(256),
  content: z.string().min(1),
  scheduledAt: z.coerce.date().optional(),
});

export async function createCampaign(formData: FormData) {
  const session = await getAuthSession();
  if (!session)
    return { ok: false, error: "Unauthorized", campaign: null };

  // Use direct select query
  const [teamMember] =
    await db
      .select()
      .from(teamMembers)
      .where(teamMembers.userId, "=", session.userId)
      .limit(1);

  const teamId = teamMember?.teamId;
  if (!teamId)
    return { ok: false, error: "No team found", campaign: null };

  const data = {
    name: formData.get("name") as string,
    subject: formData.get("subject") as string,
    content: formData.get("content") as string,
    scheduledAt: formData.get("scheduledAt") || null,
  };
  const parse = createCampaignSchema.safeParse(data);
  if (!parse.success)
    return { ok: false, error: parse.error.message, campaign: null };

  const campaign = await db
    .insert(emailCampaigns)
    .values({
      name: parse.data.name,
      subject: parse.data.subject,
      content: parse.data.content,
      scheduledAt: parse.data.scheduledAt,
      createdBy: session.userId,
      teamId,
      status: "draft",
    })
    .returning()
    .then((rows) => rows[0]);

  return { ok: !!campaign, campaign, error: campaign ? "" : "Failed to create campaign" };
}