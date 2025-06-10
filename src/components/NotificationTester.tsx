
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send, TestTube, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

  const [emailLoading, setEmailLoading] = useState(false);
  const [smsLoading, setSmsLoading] = useState(false);

  const sendTestEmail = async () => {
    try {
      setEmailLoading(true);
      console.log('Sending test email:', emailData);
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: emailData.to,
          subject: emailData.subject,
          message: emailData.message
        }
      });

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error);
      }

      toast({
        title: "Email Sent Successfully",
        description: `Test email sent to ${emailData.to}`,
      });
    } catch (error: any) {
      console.error('Email error:', error);
      toast({
        title: "Email Failed",
        description: error.message || "Failed to send test email",
        variant: "destructive",
      });
    } finally {
      setEmailLoading(false);
    }
  };

  const sendTestSMS = async () => {
    try {
      setSmsLoading(true);
      console.log('Sending test SMS:', smsData);
      
      const { data, error } = await supabase.functions.invoke('send-sms', {
        body: {
          to: smsData.to,
          message: smsData.message
        }
      });

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error);
      }

      toast({
        title: "SMS Sent Successfully",
        description: `Test SMS sent to ${smsData.to}`,
      });
    } catch (error: any) {
      console.error('SMS error:', error);
      toast({
        title: "SMS Failed",
        description: error.message || "Failed to send test SMS",
        variant: "destructive",
      });
    } finally {
      setSmsLoading(false);
    }
  };

  const sendCriticalAlert = async () => {
    const alertData = {
      generatorId: "G001",
      alertType: "CRITICAL",
      message: "Fuel level below 15% - Immediate attention required",
      location: "Mumbai Financial District"
    };

    console.log('Critical Alert Triggered:', alertData);
    
    // Send both email and SMS for critical alerts
    try {
      const emailPromise = supabase.functions.invoke('send-email', {
        body: {
          to: emailData.to,
          subject: `CRITICAL ALERT: Generator ${alertData.generatorId}`,
          message: `Critical alert for Generator ${alertData.generatorId} at ${alertData.location}: ${alertData.message}`
        }
      });

      const smsPromise = supabase.functions.invoke('send-sms', {
        body: {
          to: smsData.to,
          message: `CRITICAL: Generator ${alertData.generatorId} - ${alertData.message}`
        }
      });

      await Promise.all([emailPromise, smsPromise]);

      toast({
        title: "Critical Alert Triggered",
        description: "Email and SMS notifications sent to all administrators",
      });
    } catch (error: any) {
      console.error('Critical alert error:', error);
      toast({
        title: "Alert Failed",
        description: "Failed to send critical alert notifications",
        variant: "destructive",
      });
    }
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

            <Button onClick={sendTestEmail} className="w-full" disabled={emailLoading}>
              {emailLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              {emailLoading ? "Sending..." : "Send Test Email"}
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
                placeholder="+91 9876543210"
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

            <Button onClick={sendTestSMS} className="w-full" disabled={smsLoading}>
              {smsLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              {smsLoading ? "Sending..." : "Send Test SMS"}
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
