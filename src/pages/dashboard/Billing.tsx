import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, TrendingUp } from "lucide-react";

const invoices = [
  { id: "INV-001", date: "Jan 1, 2024", amount: "$49.00", status: "paid" },
  { id: "INV-002", date: "Dec 1, 2023", amount: "$49.00", status: "paid" },
  { id: "INV-003", date: "Nov 1, 2023", amount: "$49.00", status: "paid" },
];

const Billing = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-bold mb-2">Billing</h1>
          <p className="text-muted-foreground">Manage your subscription and billing</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 shadow-lg animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Professional Plan</CardTitle>
                  <CardDescription>100 meetings per month</CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  $49
                </span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next billing date</span>
                  <span className="font-medium">February 1, 2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Meetings used</span>
                  <span className="font-medium">24 / 100</span>
                </div>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full w-[24%] bg-gradient-to-r from-primary to-accent" />
              </div>
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button variant="outline">Change Plan</Button>
              <Button variant="ghost">Cancel Subscription</Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle>Usage Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Average per day</span>
                  <span className="font-medium">1.7</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Peak day</span>
                  <span className="font-medium">5 meetings</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                </div>
              </div>
              <Button variant="outline">Update</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 shadow-lg animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>Download your past invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice, index) => (
                <div 
                  key={invoice.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">{invoice.amount}</span>
                    <Badge variant="outline" className="border-green-500 text-green-600">
                      {invoice.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
