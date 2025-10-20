import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, Database, FileCheck, Users, AlertCircle, CheckCircle } from "lucide-react";

const Security = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold">Security</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Your trust is our priority. Learn how we protect your data and maintain the highest security standards.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Data Encryption</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We implement industry-standard encryption protocols to protect your data both in transit and at rest.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>TLS 1.3 Encryption:</strong> All data transmitted between your device and our servers is encrypted using the latest Transport Layer Security protocol</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>AES-256 Encryption:</strong> Data stored in our databases is encrypted using Advanced Encryption Standard with 256-bit keys</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Encrypted Backups:</strong> All backup data is encrypted and stored in geographically distributed locations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Access Control</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We implement strict access controls to ensure only authorized personnel can access sensitive systems and data.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Multi-Factor Authentication (MFA):</strong> Required for all employee accounts accessing production systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Role-Based Access Control (RBAC):</strong> Access permissions are granted based on job responsibilities and the principle of least privilege</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Access Logging:</strong> All system access is logged and regularly audited for suspicious activity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Regular Access Reviews:</strong> Quarterly reviews of user permissions to ensure appropriate access levels</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Infrastructure Security</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Our infrastructure is built on industry-leading cloud platforms with multiple layers of security.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Secure Cloud Hosting:</strong> Hosted on enterprise-grade cloud infrastructure with 99.9% uptime SLA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Network Isolation:</strong> Database and application servers are isolated in private networks with strict firewall rules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>DDoS Protection:</strong> Advanced protection against distributed denial-of-service attacks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Automated Backups:</strong> Daily encrypted backups with point-in-time recovery capabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Disaster Recovery:</strong> Comprehensive disaster recovery plan with regular testing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Compliance & Certifications</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We adhere to international security standards and data protection regulations.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>GDPR Compliant:</strong> Full compliance with EU General Data Protection Regulation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Google API Services:</strong> Compliant with Google API Services User Data Policy, including Limited Use requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>ISO 27001 Standards:</strong> Security controls aligned with ISO/IEC 27001 information security management standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>SOC 2 Type II:</strong> Currently pursuing SOC 2 Type II certification for service organization controls</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Application Security</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We follow secure development practices and conduct regular security assessments.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Secure Development Lifecycle:</strong> Security integrated into every phase of software development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Code Reviews:</strong> All code changes undergo peer review with security considerations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Vulnerability Scanning:</strong> Automated security scanning of dependencies and code</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Penetration Testing:</strong> Regular third-party security audits and penetration testing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Bug Bounty Program:</strong> Rewards for responsible disclosure of security vulnerabilities</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Incident Response</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We maintain a comprehensive incident response plan to quickly address any security events.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>24/7 Monitoring:</strong> Continuous monitoring of systems for security threats and anomalies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Rapid Response Team:</strong> Dedicated security team available to respond to incidents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Incident Documentation:</strong> All security incidents are documented and analyzed for improvement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>User Notification:</strong> Commitment to timely notification of users in case of data breaches</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h2 className="text-2xl font-semibold mb-3">Data Privacy Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have full control over your data with Scheduly AI:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Data Access:</strong> Request a copy of all your personal data at any time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Data Portability:</strong> Export your data in a machine-readable format</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Data Deletion:</strong> Request complete deletion of your account and associated data</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Integration Control:</strong> Revoke third-party integrations at any time</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-muted/50">
              <h2 className="text-2xl font-semibold mb-3">Report a Security Issue</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you discover a security vulnerability, please report it to us responsibly. We appreciate your help in keeping Scheduly AI secure.
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Security Email:</strong> security@schedulyai.com</p>
                <p><strong>General Contact:</strong> info@schedulyai.com</p>
                <p className="text-sm pt-2">
                  Please do not publicly disclose security issues until we have had a chance to address them. We commit to responding to all security reports within 48 hours.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Security;
