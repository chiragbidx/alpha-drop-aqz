import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export const LayoutFeaturesSection = () => {
  const features = [
    {
      title: "Campaign Management",
      description: "Draft, schedule, and send beautiful campaigns with robust delivery tracking.",
    },
    {
      title: "Subscriber Management",
      description: "Import, organize, and engage subscribers with powerful segmentation tools.",
    },
    {
      title: "Analytics & Reporting",
      description: "Gain insights into open, click, bounce, and unsubscribe rates for every campaign.",
    },
    {
      title: "Deliverability",
      description: "Rest easy with industry-compliant sending and one-click unsubscribe links.",
    },
    {
      title: "Multi-Tenant Teams",
      description: "Collaborate with your team and keep data secure and isolated.",
    },
    {
      title: "Responsive UX",
      description: "Intuitive, mobile-optimized dashboards for managing campaigns on the go.",
    },
  ];

  return (
    <section id="features" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Features
        </h2>
        <h2 className="text-3xl md:text-4xl text-center font-bold">
          The Power of InboxPilot
        </h2>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
          Everything you need to manage, send, and measure your email marketing all in one place.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {features.map(({ title, description }) => (
          <Card key={title} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>
                <Check className="text-primary mr-2 inline-block" /> {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};