import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (sectionId: string) => {
    if (isHomePage) {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent whitespace-nowrap">
              Scheduly AI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#features" 
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('features');
              }}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('how-it-works');
              }}
            >
              How It Works
            </a>
            <a 
              href="#pricing" 
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('pricing');
              }}
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('faq');
              }}
            >
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link to="/auth?tab=signup">
              <Button size="sm" variant="hero">
                Try it free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
