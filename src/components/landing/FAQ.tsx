import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the WhatsApp integration work?",
    answer: "Simply connect your WhatsApp Business number during setup. You'll be able to text meeting requests like 'Schedule a meeting with John tomorrow at 3pm' and our AI will handle the rest, creating calendar events and sending confirmations.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use enterprise-grade encryption for all data transmission and storage. Your calendar information and messages are never shared with third parties and comply with GDPR and SOC 2 standards.",
  },
  {
    question: "Can I use it with my existing calendar?",
    answer: "Yes! Scheduly AI integrates seamlessly with Google Calendar, Microsoft Outlook, and Apple Calendar. All your existing meetings sync automatically.",
  },
  {
    question: "What if I need to cancel my subscription?",
    answer: "You can cancel anytime from your dashboard. No questions asked, no cancellation fees. Your data remains accessible for 30 days after cancellation.",
  },
  {
    question: "How accurate are the AI-generated summaries?",
    answer: "Our AI achieves 95%+ accuracy in summarizing meeting outcomes, action items, and key decisions. You can always edit summaries before they're sent to participants.",
  },
  {
    question: "Do I need WhatsApp Business?",
    answer: "No, regular WhatsApp works perfectly. WhatsApp Business is optional and provides some additional features like automated away messages.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Scheduly AI
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border rounded-lg px-6 bg-card shadow-sm hover:shadow-md transition-shadow animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold text-lg">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
