import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          background: "var(--gradient-hero)",
        }}
      />
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Transform Your Meetings?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join 500+ professionals who've already saved 5+ hours per week with Scheduly AI
          </p>
          
          <div className="flex justify-center">
            <Link to="/auth">
              <Button size="xl" variant="hero" className="bg-white text-primary hover:bg-white/90 shadow-2xl group">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <p className="text-white/80 mt-8">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};
