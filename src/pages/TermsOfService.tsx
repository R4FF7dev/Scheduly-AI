import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last Updated: October 20, 2025</p>
          </div>

          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using Scheduly AI ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Scheduly AI provides an AI-powered meeting scheduling and management platform that integrates with calendar services and communication tools. The Service includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Automated meeting scheduling and coordination</li>
                <li>Calendar integration and synchronization</li>
                <li>WhatsApp notifications and reminders</li>
                <li>AI-powered scheduling assistance</li>
                <li>Meeting analytics and insights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">3.1 Account Creation</h3>
                  <p className="text-muted-foreground">
                    You must create an account to use the Service. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">3.2 Account Security</h3>
                  <p className="text-muted-foreground">
                    You are responsible for safeguarding your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account or any other breach of security.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">3.3 Account Termination</h3>
                  <p className="text-muted-foreground">
                    We reserve the right to suspend or terminate your account if you violate these Terms or engage in fraudulent, abusive, or illegal activities.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
              <p className="text-muted-foreground mb-4">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Use the Service for any illegal purpose or in violation of any laws</li>
                <li>Violate or infringe upon the rights of others</li>
                <li>Transmit any harmful code, viruses, or malicious software</li>
                <li>Attempt to gain unauthorized access to the Service or related systems</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Use automated systems to access the Service without permission</li>
                <li>Resell, duplicate, or exploit the Service without authorization</li>
                <li>Collect or harvest personal information from other users</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Subscription and Payment</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">5.1 Pricing</h3>
                  <p className="text-muted-foreground">
                    Subscription fees are billed in advance on a monthly or annual basis. Pricing is subject to change with 30 days' notice to existing subscribers.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">5.2 Free Trial</h3>
                  <p className="text-muted-foreground">
                    We may offer a free trial period. At the end of the trial, your subscription will automatically convert to a paid plan unless you cancel before the trial ends.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">5.3 Cancellation and Refunds</h3>
                  <p className="text-muted-foreground">
                    You may cancel your subscription at any time through your account settings. Cancellations take effect at the end of the current billing period. We do not provide refunds for partial subscription periods unless required by law.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">5.4 Payment Processing</h3>
                  <p className="text-muted-foreground">
                    Payments are processed through third-party payment processors. By providing payment information, you authorize us to charge your payment method for all fees incurred.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Third-Party Integrations</h2>
              <p className="text-muted-foreground mb-4">
                The Service integrates with third-party services including Google Calendar and WhatsApp. By using these integrations:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>You agree to the terms and policies of those third-party services</li>
                <li>We are not responsible for the availability or functionality of third-party services</li>
                <li>You grant us permission to access your data from these services as necessary to provide the Service</li>
                <li>You can revoke integrations at any time through your account settings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">7.1 Our Rights</h3>
                  <p className="text-muted-foreground">
                    The Service and its original content, features, and functionality are owned by Scheduly AI and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">7.2 Your Rights</h3>
                  <p className="text-muted-foreground">
                    You retain all rights to the content and data you submit to the Service. By using the Service, you grant us a license to use, store, and process your content solely to provide and improve the Service.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">7.3 Feedback</h3>
                  <p className="text-muted-foreground">
                    Any feedback, suggestions, or ideas you provide about the Service may be used by us without obligation or compensation to you.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Data and Privacy</h2>
              <p className="text-muted-foreground">
                Your use of the Service is also governed by our Privacy Policy. By using the Service, you consent to the collection, use, and sharing of your information as described in the Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Service Availability</h2>
              <p className="text-muted-foreground">
                We strive to provide reliable service but do not guarantee that the Service will be uninterrupted, secure, or error-free. We reserve the right to modify, suspend, or discontinue the Service at any time with or without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Disclaimers</h2>
              <p className="text-muted-foreground mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
                <li>Warranties that the Service will meet your requirements or be error-free</li>
                <li>Warranties regarding the accuracy or reliability of any information obtained through the Service</li>
                <li>Warranties that defects will be corrected or that the Service is free of viruses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SCHEDULY AI SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or business opportunities</li>
                <li>Service interruptions or security breaches</li>
                <li>Actions or omissions of third-party services</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify and hold harmless Scheduly AI and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Service, violation of these Terms, or infringement of any rights of another party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Dispute Resolution</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">13.1 Governing Law</h3>
                  <p className="text-muted-foreground">
                    These Terms shall be governed by and construed in accordance with the laws of the Netherlands, without regard to its conflict of law provisions.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">13.2 Arbitration</h3>
                  <p className="text-muted-foreground">
                    Any disputes arising from these Terms or the Service shall be resolved through binding arbitration in Almere, The Netherlands, except where prohibited by law.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of the Service after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">15. Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your account and access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">16. Severability</h2>
              <p className="text-muted-foreground">
                If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">17. Entire Agreement</h2>
              <p className="text-muted-foreground">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Scheduly AI regarding the Service and supersede all prior agreements and understandings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">18. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground ml-4">
                <p><strong>Email:</strong> info@schedulyai.com</p>
                <p><strong>Address:</strong> Bolderweg 20, 1332 AV Almere, The Netherlands</p>
                <p><strong>KVK:</strong> 65204964</p>
              </div>
            </section>

            <section className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                By using Scheduly AI, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </section>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
