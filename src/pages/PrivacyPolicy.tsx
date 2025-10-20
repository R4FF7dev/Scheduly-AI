import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last Updated: October 20, 2025</p>
          </div>

          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Scheduly AI ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered scheduling platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">2.1 Information You Provide</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Account information (name, email address, password)</li>
                    <li>Profile information (phone number, time zone, preferences)</li>
                    <li>Calendar and scheduling data</li>
                    <li>Meeting details and participant information</li>
                    <li>Communication preferences and settings</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">2.2 Information Collected Automatically</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Usage data (pages visited, features used, time spent)</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Log data and error reports</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">2.3 Information from Third Parties</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Google Account information (when you sign in with Google)</li>
                    <li>Calendar data from connected calendar services</li>
                    <li>WhatsApp contact information (when integrated)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Provide, operate, and maintain our scheduling services</li>
                <li>Process and manage your appointments and meetings</li>
                <li>Send scheduling reminders and notifications via WhatsApp</li>
                <li>Improve and personalize your experience using AI technology</li>
                <li>Communicate with you about service updates and support</li>
                <li>Analyze usage patterns and optimize our platform</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Google API Services</h2>
              <p className="text-muted-foreground mb-4">
                Scheduly AI's use and transfer of information received from Google APIs adheres to the{" "}
                <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Google API Services User Data Policy
                </a>, including the Limited Use requirements.
              </p>
              <p className="text-muted-foreground">
                When you connect your Google account, we access your Google Calendar data solely to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-2">
                <li>Check your availability for scheduling meetings</li>
                <li>Create calendar events when meetings are booked</li>
                <li>Sync meeting updates and cancellations</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We do not use this data for advertising purposes or share it with third parties except as necessary to provide our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. How We Share Your Information</h2>
              <p className="text-muted-foreground mb-4">We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Meeting Participants:</strong> Information necessary for scheduling (name, email, meeting time)</li>
                <li><strong>Service Providers:</strong> Third-party vendors who help us operate our platform (cloud hosting, analytics, communication services)</li>
                <li><strong>WhatsApp:</strong> For sending meeting reminders and notifications</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
              <p className="text-muted-foreground">
                We implement industry-standard security measures to protect your data, including encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your account and associated data at any time through your account settings or by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Your Rights and Choices</h2>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Revoke calendar and WhatsApp integration permissions</li>
                <li>Export your data</li>
                <li>Object to automated decision-making</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise these rights, please contact us at privacy@schedulyai.com or through your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Cookies and Tracking</h2>
              <p className="text-muted-foreground">
                We use cookies and similar technologies to enhance your experience, analyze usage, and remember your preferences. You can control cookie settings through your browser, though this may affect platform functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
              <p className="text-muted-foreground">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy and applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our services are not intended for users under 16 years of age. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal data, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Third-Party Links</h2>
              <p className="text-muted-foreground">
                Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions or concerns about this privacy policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground ml-4">
                <p><strong>Email:</strong> info@schedulyai.com</p>
                <p><strong>Support:</strong> info@schedulyai.com</p>
                <p><strong>Address:</strong> Bolderweg 20, 1332 AV Almere, The Netherlands</p>
                <p><strong>KVK:</strong> 65204964</p>
              </div>
            </section>

            <section className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                By using Scheduly AI, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
              </p>
            </section>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;