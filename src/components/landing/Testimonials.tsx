import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import profile1 from "@/assets/profile-1.jpg";
import profile2 from "@/assets/profile-2.jpg";
import profile3 from "@/assets/profile-3.jpg";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    content: "Scheduly AI saved me 5+ hours per week. The WhatsApp integration is genius - I can schedule meetings while commuting!",
    rating: 5,
    avatar: profile1,
  },
  {
    name: "Michael Chen",
    role: "Sales Director",
    content: "Game changer for our team. The auto-summaries keep everyone aligned, and the conflict resolution is incredibly smart.",
    rating: 5,
    avatar: profile2,
  },
  {
    name: "Emma Williams",
    role: "Consultant",
    content: "I've tried many scheduling tools, but nothing beats the convenience of managing everything through WhatsApp. Highly recommend!",
    rating: 5,
    avatar: profile3,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Professionals
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our users say about Scheduly AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-up bg-gradient-to-br from-card to-card/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
