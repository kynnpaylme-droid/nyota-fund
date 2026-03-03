import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "James Mwangi",
    location: "Nairobi",
    initials: "JM",
    text: "I needed emergency cash for my son's school fees. Got KSh 5,000 in less than 10 minutes — no paperwork, no stress!",
  },
  {
    name: "Faith Akinyi",
    location: "Kisumu",
    initials: "FA",
    text: "I've tried many loan apps but this is the only one that actually works without CRB checks. Truly chapchap!",
  },
  {
    name: "Peter Njoroge",
    location: "Nakuru",
    initials: "PN",
    text: "The M-Pesa integration is seamless. Applied, got approved instantly, and money was in my phone within minutes.",
  },
];

export function Testimonials() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center text-foreground mb-2">
        What Our Customers Say
      </h2>
      <p className="text-center text-muted-foreground mb-8">
        Trusted by thousands of Kenyans across the country
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <Card key={t.name} className="gradient-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10 bg-primary/10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">"{t.text}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
