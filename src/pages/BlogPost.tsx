import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  TrendingUp, 
  Timer, 
  FileText, 
  Bell,
  MessageSquare,
  CalendarCheck,
  Zap,
  Users,
  Target,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import heroImage from "@/assets/blog-hero-scheduling.jpg";
import boostSalesImage from "@/assets/blog-boost-sales.jpg";
import saveTimeImage from "@/assets/blog-save-time.jpg";
import aiSummariesImage from "@/assets/blog-ai-summaries.jpg";

const IntroductionPost = () => {
  return (
    <div className="space-y-16">
      {/* Introduction */}
      <section className="space-y-6">
        <p className="text-xl text-muted-foreground leading-relaxed">
          In today's fast-paced business world, managing meetings efficiently can be the difference between closing deals and missing opportunities. We're excited to introduce <span className="text-primary font-semibold">Scheduly AI</span>, your intelligent meeting assistant that transforms how you schedule, manage, and follow up on meetings.
        </p>

        <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">What is Scheduly AI?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Scheduly AI is an AI-powered meeting assistant that seamlessly integrates with your WhatsApp and calendar to automate scheduling, provide real-time summaries, and help you stay on top of your commitments. No more back-and-forth messages, no more missed meetings, and no more manual note-taking.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Key Benefits Section Header */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Key Benefits of Using Scheduly AI
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how Scheduly AI can transform your workflow and boost productivity
          </p>
        </div>

        {/* Benefit 1: Boost Sales */}
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-8">
            <img 
              src={boostSalesImage} 
              alt="Boost your sales with Scheduly AI"
              className="w-full h-full object-cover"
            />
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <h3 className="text-3xl font-bold">1. Boost Your Sales</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Time is money, especially in sales. With Scheduly AI, you can maximize every opportunity and never miss a potential deal.
              </p>
              <ul className="space-y-3">
                {[
                  "Schedule more meetings in less time",
                  "Never miss a follow-up opportunity",
                  "Get instant meeting summaries to prepare for next steps",
                  "Focus on building relationships instead of administrative tasks"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-success/5 rounded-lg border border-success/20">
                <p className="text-sm font-semibold text-success">
                  Our users report closing 30% more deals simply by being more responsive and organized.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Benefit 2: Save Time */}
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 flex flex-col justify-center order-2 md:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Timer className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-3xl font-bold">2. Save Valuable Time</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                The average professional spends 4-5 hours per week just scheduling meetings. Scheduly AI eliminates this waste completely.
              </p>
              <ul className="space-y-3">
                {[
                  "Automating the entire scheduling process through WhatsApp",
                  "Intelligently suggesting meeting times based on your availability",
                  "Handling timezone conversions automatically",
                  "Syncing instantly with your calendar"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
                <p className="text-sm font-semibold text-accent">
                  Get back 4-5 hours every week to focus on growing your business and serving clients.
                </p>
              </div>
            </div>
            <img 
              src={saveTimeImage} 
              alt="Save time with automated scheduling"
              className="w-full h-full object-cover order-1 md:order-2"
            />
          </div>
        </Card>

        {/* Benefit 3: AI Summaries */}
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-8">
            <img 
              src={aiSummariesImage} 
              alt="AI-powered meeting summaries"
              className="w-full h-full object-cover"
            />
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">3. Direct Meeting Summaries</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                After each meeting, Scheduly AI provides comprehensive summaries automatically, ensuring nothing falls through the cracks.
              </p>
              <ul className="space-y-3">
                {[
                  "Key discussion points",
                  "Action items and follow-ups",
                  "Important decisions made",
                  "Next steps and deadlines"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm font-semibold text-primary">
                  Share summaries with your team or clients to maintain perfect alignment.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Benefit 4: Smart Notifications */}
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-3">4. Smart Notifications</h3>
              <p className="text-muted-foreground mb-6">
                Never miss a meeting again with intelligent notifications delivered directly to WhatsApp, keeping you informed wherever you are.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Bell, text: "Remind you before meetings start" },
              { icon: Zap, text: "Alert you to scheduling conflicts" },
              { icon: MessageSquare, text: "Notify you of meeting updates" },
              { icon: CheckCircle2, text: "Send follow-up reminders for action items" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-background rounded-lg">
                <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* How It Works */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">How It Works</h2>
          <p className="text-lg text-muted-foreground">Getting started is incredibly simple</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: MessageSquare, title: "Connect WhatsApp", desc: "Link your WhatsApp account in just a few clicks" },
            { icon: CalendarCheck, title: "Sync Calendar", desc: "Connect your Google Calendar or other calendar service" },
            { icon: Zap, title: "Start Scheduling", desc: "Let AI handle your meeting requests via WhatsApp" },
            { icon: FileText, title: "Get Summaries", desc: "Receive automatic meeting summaries and action items" }
          ].map((step, idx) => (
            <Card key={idx} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold mb-2 text-primary">{idx + 1}</div>
              <h4 className="font-semibold mb-2">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Who Can Benefit */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Who Can Benefit?</h2>
          <p className="text-lg text-muted-foreground">Scheduly AI is perfect for professionals across industries</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: TrendingUp, title: "Sales Teams", desc: "Close more deals with efficient scheduling and follow-ups" },
            { icon: Users, title: "Consultants", desc: "Manage client meetings and billable hours effortlessly" },
            { icon: Target, title: "Entrepreneurs", desc: "Stay organized while juggling multiple priorities" },
            { icon: Users, title: "Recruiters", desc: "Schedule interviews quickly and keep candidates engaged" },
            { icon: Users, title: "Customer Success Teams", desc: "Maintain strong client relationships with timely meetings" },
            { icon: Sparkles, title: "And More", desc: "Any professional who values their time and relationships" }
          ].map((user, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                <user.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">{user.title}</h4>
              <p className="text-sm text-muted-foreground">{user.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Real Results Stats */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Real Results</h2>
          <p className="text-lg text-muted-foreground">Our beta users have experienced remarkable improvements</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { value: "75%", label: "Reduction in scheduling time" },
            { value: "40%", label: "Increase in meeting attendance" },
            { value: "90%", label: "Better meeting preparation" },
            { value: "100%", label: "Action items tracked" }
          ].map((stat, idx) => (
            <Card key={idx} className="p-8 text-center bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-lg transition-all duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <h2 className="text-4xl font-bold mb-4">Get Started Today</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ready to transform how you manage meetings? Start your free trial today and experience the power of AI-driven scheduling. No credit card required for the trial period.
          </p>
          <Link to="/#pricing">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Free Trial
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-6">
            Join thousands of professionals who have already made the switch to smarter meeting management with Scheduly AI.
          </p>
        </Card>
      </section>
    </div>
  );
};

const blogContent = {
  "introduction-to-scheduly-ai": {
    title: "Introducing Scheduly AI: Your Smart Meeting Assistant",
    author: "Scheduly AI Team",
    date: "2025-01-15",
    readTime: "5 min read",
    category: "Product",
    image: heroImage,
    component: IntroductionPost
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogContent[slug as keyof typeof blogContent] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <Link to="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const PostContent = post.component;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <article className="container px-4 mx-auto max-w-5xl">
          <Link to="/blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <Badge className="mb-4">{post.category}</Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12 pb-8 border-b">
            <span className="font-medium">{post.author}</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-[500px] object-cover rounded-xl mb-12 shadow-lg"
          />

          <PostContent />

          <div className="mt-16 pt-8 border-t">
            <Link to="/blog">
              <Button variant="outline" size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Posts
              </Button>
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
