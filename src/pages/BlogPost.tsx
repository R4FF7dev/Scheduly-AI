import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, TrendingUp, Clock3, FileText, Bell } from "lucide-react";

const blogContent = {
  "introduction-to-scheduly-ai": {
    title: "Introducing Scheduly AI: Your Smart Meeting Assistant",
    author: "Scheduly AI Team",
    date: "2025-01-15",
    readTime: "5 min read",
    category: "Product",
    image: "/placeholder.svg",
    content: `
      <p>In today's fast-paced business world, managing meetings efficiently can be the difference between closing deals and missing opportunities. We're excited to introduce Scheduly AI, your intelligent meeting assistant that transforms how you schedule, manage, and follow up on meetings.</p>

      <h2>What is Scheduly AI?</h2>
      <p>Scheduly AI is an AI-powered meeting assistant that seamlessly integrates with your WhatsApp and calendar to automate scheduling, provide real-time summaries, and help you stay on top of your commitments. No more back-and-forth messages, no more missed meetings, and no more manual note-taking.</p>

      <h2>Key Benefits of Using Scheduly AI</h2>

      <h3>1. Boost Your Sales</h3>
      <p>Time is money, especially in sales. With Scheduly AI, you can:</p>
      <ul>
        <li>Schedule more meetings in less time</li>
        <li>Never miss a follow-up opportunity</li>
        <li>Get instant meeting summaries to prepare for next steps</li>
        <li>Focus on building relationships instead of administrative tasks</li>
      </ul>
      <p>Our users report closing 30% more deals simply by being more responsive and organized with their meeting schedules.</p>

      <h3>2. Save Valuable Time</h3>
      <p>The average professional spends 4-5 hours per week just scheduling meetings. Scheduly AI eliminates this waste by:</p>
      <ul>
        <li>Automating the entire scheduling process through WhatsApp</li>
        <li>Intelligently suggesting meeting times based on your availability</li>
        <li>Handling timezone conversions automatically</li>
        <li>Syncing instantly with your calendar</li>
      </ul>
      <p>Imagine getting back 4-5 hours every week to focus on what really matters – growing your business and serving your clients.</p>

      <h3>3. Direct Meeting Summaries</h3>
      <p>After each meeting, Scheduly AI provides you with:</p>
      <ul>
        <li>Key discussion points</li>
        <li>Action items and follow-ups</li>
        <li>Important decisions made</li>
        <li>Next steps and deadlines</li>
      </ul>
      <p>These summaries are automatically generated and sent to you, ensuring nothing falls through the cracks. Share them with your team or clients to maintain perfect alignment.</p>

      <h3>4. Smart Notifications</h3>
      <p>Never miss a meeting again with intelligent notifications that:</p>
      <ul>
        <li>Remind you before meetings start</li>
        <li>Alert you to scheduling conflicts</li>
        <li>Notify you of meeting updates or cancellations</li>
        <li>Send follow-up reminders for action items</li>
      </ul>
      <p>All notifications come through WhatsApp, so you stay informed wherever you are.</p>

      <h2>How It Works</h2>
      <p>Getting started with Scheduly AI is incredibly simple:</p>
      <ol>
        <li><strong>Connect WhatsApp:</strong> Link your WhatsApp account in just a few clicks</li>
        <li><strong>Sync Calendar:</strong> Connect your Google Calendar or other calendar service</li>
        <li><strong>Start Scheduling:</strong> Let AI handle your meeting requests via WhatsApp</li>
        <li><strong>Get Summaries:</strong> Receive automatic meeting summaries and action items</li>
      </ol>

      <h2>Who Can Benefit?</h2>
      <p>Scheduly AI is perfect for:</p>
      <ul>
        <li><strong>Sales Teams:</strong> Close more deals with efficient scheduling and follow-ups</li>
        <li><strong>Consultants:</strong> Manage client meetings and billable hours effortlessly</li>
        <li><strong>Entrepreneurs:</strong> Stay organized while juggling multiple priorities</li>
        <li><strong>Recruiters:</strong> Schedule interviews quickly and keep candidates engaged</li>
        <li><strong>Customer Success Teams:</strong> Maintain strong client relationships with timely meetings</li>
      </ul>

      <h2>Real Results</h2>
      <p>Our beta users have experienced remarkable improvements:</p>
      <ul>
        <li>75% reduction in scheduling time</li>
        <li>40% increase in meeting attendance rates</li>
        <li>90% of users report better meeting preparation</li>
        <li>100% of action items tracked and followed up</li>
      </ul>

      <h2>Get Started Today</h2>
      <p>Ready to transform how you manage meetings? Start your free trial today and experience the power of AI-driven scheduling. No credit card required for the trial period.</p>

      <p>Join thousands of professionals who have already made the switch to smarter meeting management with Scheduly AI.</p>
    `
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <article className="container px-4 mx-auto max-w-4xl">
          <Link to="/blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <Badge className="mb-4">{post.category}</Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
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
            className="w-full h-96 object-cover rounded-lg mb-8"
          />

          <div 
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t">
            <Link to="/blog">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
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
