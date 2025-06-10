
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send, TestTube } from "lucide-react";

const NotificationTester = () => {
  const { toast } = useToast();
  const [emailData, setEmailData] = useState({
    to: "admin@perennial.co.in",
    subject: "Generator Alert Test",
    message: "This is a test email notification from the Generator Monitoring System."
  });

  const [smsData, setSmsData] = useState({
    to: "+91 9876543210",
    message: "ALERT: Generator G001 fuel level critical (15%). Immediate attention required."
  });

  const sendTestEmail = async () => {
    try {
      // Simulate email sending
      console.log('Sending test email:', emailData);
      
      toast({
        title: "Email Sent Successfully",
        description: `Test email sent to ${emailData.to}`,
      });

      // In a real implementation, you would call your email service here
      // For example, using a Supabase edge function with Resend
    } catch (error) {
      toast({
        title: "Email Failed",
        description: "Failed to send test email",
        variant: "destructive",
      });
    }
  };

  const sendTestSMS = async () => {
    try {
      // Simulate SMS sending
      console.log('Sending test SMS:', smsData);
      
      toast({
        title: "SMS Sent Successfully",
        description: `Test SMS sent to ${smsData.to}`,
      });

      // In a real implementation, you would call your SMS service here
      // For example, using Twilio via a Supabase edge function
    } catch (error) {
      toast({
        title: "SMS Failed",
        description: "Failed to send test SMS",
        variant: "destructive",
      });
    }
  };

  const sendCriticalAlert = () => {
    // Simulate a critical alert that triggers both email and SMS
    const alertData = {
      generatorId: "G001",
      alertType: "CRITICAL",
      message: "Fuel level below 15% - Immediate attention required",
      location: "Mumbai Financial District"
    };

    console.log('Critical Alert Triggered:', alertData);
    
    toast({
      title: "Critical Alert Triggered",
      description: "Email and SMS notifications sent to all administrators",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notification Testing</h2>
        <Button onClick={sendCriticalAlert} variant="destructive">
          <TestTube className="h-4 w-4 mr-2" />
          Trigger Critical Alert
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Testing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Notification Test
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-to">To Email</Label>
              <Input
                id="email-to"
                type="email"
                value={emailData.to}
                onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                value={emailData.subject}
                onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-message">Message</Label>
              <Textarea
                id="email-message"
                rows={4}
                value={emailData.message}
                onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>

            <Button onClick={sendTestEmail} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Send Test Email
            </Button>
          </CardContent>
        </Card>

        {/* SMS Testing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              SMS Notification Test
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sms-to">To Phone Number</Label>
              <Input
                id="sms-to"
                type="tel"
                value={smsData.to}
                onChange={(e) => setSmsData(prev => ({ ...prev, to: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sms-message">Message</Label>
              <Textarea
                id="sms-message"
                rows={4}
                value={smsData.message}
                onChange={(e) => setSmsData(prev => ({ ...prev, message: e.target.value }))}
                maxLength={160}
              />
              <p className="text-sm text-gray-500">
                {smsData.message.length}/160 characters
              </p>
            </div>

            <Button onClick={sendTestSMS} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Send Test SMS
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notification History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Critical Alert - Low Fuel</p>
                <p className="text-sm text-gray-600">Sent to 5 administrators via Email & SMS</p>
              </div>
              <span className="text-sm text-gray-500">2 minutes ago</span>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Maintenance Reminder</p>
                <p className="text-sm text-gray-600">Sent to maintenance team via Email</p>
              </div>
              <span className="text-sm text-gray-500">1 hour ago</span>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Generator Status Update</p>
                <p className="text-sm text-gray-600">Sent to operations team via Email</p>
              </div>
              <span className="text-sm text-gray-500">3 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationTester;
