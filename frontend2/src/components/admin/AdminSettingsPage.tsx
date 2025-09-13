import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { 
  Settings,
  Shield,
  Mail,
  Bell,
  Database,
  CreditCard,
  Users,
  Calendar,
  Globe,
  Lock,
  Key,
  Save,
  RotateCcw,
  AlertTriangle,
  Server
} from 'lucide-react';

export function AdminSettingsPage() {
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'EventHub Pro',
    siteDescription: 'Professional Event Management Platform',
    maintenanceMode: false,
    registrationEnabled: true,
    eventApprovalRequired: true,
    vendorVerificationRequired: true,
    maxFileUploadSize: 10,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireTwoFactor: false
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: 'admin@eventhub.com',
    smtpPassword: '',
    fromEmail: 'noreply@eventhub.com',
    fromName: 'EventHub Pro',
    enableEmailNotifications: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newUserRegistration: true,
    eventCreated: true,
    eventApproved: true,
    eventCancelled: true,
    paymentReceived: true,
    systemAlerts: true,
    dailyReports: true,
    weeklyReports: false
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripePublishableKey: 'pk_test_...',
    stripeSecretKey: 'sk_test_...',
    paypalClientId: 'AY...',
    enableStripe: true,
    enablePayPal: false,
    currency: 'USD',
    commissionRate: 5.0,
    minimumPayout: 100
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackupEnabled: true,
    backupFrequency: 'daily',
    retentionDays: 30,
    backupLocation: 's3',
    lastBackup: '2024-03-10 02:00:00'
  });

  const systemStats = [
    { label: 'Database Size', value: '2.4 GB', status: 'normal' },
    { label: 'Active Sessions', value: '234', status: 'normal' },
    { label: 'Server Load', value: '34%', status: 'normal' },
    { label: 'Memory Usage', value: '67%', status: 'warning' },
    { label: 'Disk Space', value: '78%', status: 'warning' },
    { label: 'Last Backup', value: '2 hours ago', status: 'normal' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleSaveSettings = (settingType: string) => {
    // Here you would typically save to your backend
    console.log(`Saving ${settingType} settings`);
    // Show success notification
  };

  const handleSystemBackup = () => {
    // Trigger manual backup
    console.log('Starting manual backup...');
  };

  const handleClearCache = () => {
    // Clear system cache
    console.log('Clearing system cache...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1>System Settings</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleClearCache}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear Cache
          </Button>
          <Button onClick={handleSystemBackup}>
            <Database className="h-4 w-4 mr-2" />
            Backup Now
          </Button>
        </div>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Server className="h-5 w-5 mr-2" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {systemStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className={`${getStatusColor(stat.status)}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={systemSettings.siteName}
                    onChange={(e) => setSystemSettings({...systemSettings, siteName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Max File Upload Size (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={systemSettings.maxFileUploadSize}
                    onChange={(e) => setSystemSettings({...systemSettings, maxFileUploadSize: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={systemSettings.siteDescription}
                  onChange={(e) => setSystemSettings({...systemSettings, siteDescription: e.target.value})}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-gray-600">Put the site in maintenance mode</p>
                  </div>
                  <Switch
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, maintenanceMode: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>User Registration</Label>
                    <p className="text-sm text-gray-600">Allow new user registrations</p>
                  </div>
                  <Switch
                    checked={systemSettings.registrationEnabled}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, registrationEnabled: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Event Approval Required</Label>
                    <p className="text-sm text-gray-600">Require admin approval for events</p>
                  </div>
                  <Switch
                    checked={systemSettings.eventApprovalRequired}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, eventApprovalRequired: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Vendor Verification Required</Label>
                    <p className="text-sm text-gray-600">Require verification for vendors</p>
                  </div>
                  <Switch
                    checked={systemSettings.vendorVerificationRequired}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, vendorVerificationRequired: checked})}
                  />
                </div>
              </div>

              <Button onClick={() => handleSaveSettings('general')}>
                <Save className="h-4 w-4 mr-2" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpServer: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPort: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={emailSettings.fromName}
                    onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Email Notifications</Label>
                  <p className="text-sm text-gray-600">Send automated email notifications</p>
                </div>
                <Switch
                  checked={emailSettings.enableEmailNotifications}
                  onCheckedChange={(checked) => setEmailSettings({...emailSettings, enableEmailNotifications: checked})}
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={() => handleSaveSettings('email')}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Email Settings
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Test Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                    <p className="text-sm text-gray-600">
                      {key.includes('Registration') && 'Notify when new users register'}
                      {key.includes('eventCreated') && 'Notify when events are created'}
                      {key.includes('eventApproved') && 'Notify when events are approved'}
                      {key.includes('eventCancelled') && 'Notify when events are cancelled'}
                      {key.includes('paymentReceived') && 'Notify when payments are received'}
                      {key.includes('systemAlerts') && 'Notify about system alerts'}
                      {key.includes('dailyReports') && 'Send daily activity reports'}
                      {key.includes('weeklyReports') && 'Send weekly summary reports'}
                    </p>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, [key]: checked})
                    }
                  />
                </div>
              ))}

              <Button onClick={() => handleSaveSettings('notifications')}>
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select value={paymentSettings.currency} onValueChange={(value) => setPaymentSettings({...paymentSettings, currency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                  <Input
                    id="commissionRate"
                    type="number"
                    step="0.1"
                    value={paymentSettings.commissionRate}
                    onChange={(e) => setPaymentSettings({...paymentSettings, commissionRate: parseFloat(e.target.value)})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Stripe Integration
                      </h3>
                      <p className="text-sm text-gray-600">Accept credit card payments</p>
                    </div>
                    <Switch
                      checked={paymentSettings.enableStripe}
                      onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enableStripe: checked})}
                    />
                  </div>
                  {paymentSettings.enableStripe && (
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="stripePublishableKey">Stripe Publishable Key</Label>
                        <Input
                          id="stripePublishableKey"
                          value={paymentSettings.stripePublishableKey}
                          onChange={(e) => setPaymentSettings({...paymentSettings, stripePublishableKey: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
                        <Input
                          id="stripeSecretKey"
                          type="password"
                          value={paymentSettings.stripeSecretKey}
                          onChange={(e) => setPaymentSettings({...paymentSettings, stripeSecretKey: e.target.value})}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3>PayPal Integration</h3>
                      <p className="text-sm text-gray-600">Accept PayPal payments</p>
                    </div>
                    <Switch
                      checked={paymentSettings.enablePayPal}
                      onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enablePayPal: checked})}
                    />
                  </div>
                  {paymentSettings.enablePayPal && (
                    <div className="space-y-2">
                      <Label htmlFor="paypalClientId">PayPal Client ID</Label>
                      <Input
                        id="paypalClientId"
                        value={paymentSettings.paypalClientId}
                        onChange={(e) => setPaymentSettings({...paymentSettings, paypalClientId: e.target.value})}
                      />
                    </div>
                  )}
                </div>
              </div>

              <Button onClick={() => handleSaveSettings('payments')}>
                <Save className="h-4 w-4 mr-2" />
                Save Payment Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={systemSettings.passwordMinLength}
                    onChange={(e) => setSystemSettings({...systemSettings, passwordMinLength: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">Force 2FA for all admin users</p>
                </div>
                <Switch
                  checked={systemSettings.requireTwoFactor}
                  onCheckedChange={(checked) => setSystemSettings({...systemSettings, requireTwoFactor: checked})}
                />
              </div>

              <div className="border rounded-lg p-4 bg-yellow-50">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-yellow-800">Security Recommendations</h3>
                    <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                      <li>• Enable two-factor authentication for admin accounts</li>
                      <li>• Use strong passwords with at least 12 characters</li>
                      <li>• Regularly update API keys and secrets</li>
                      <li>• Monitor login attempts and suspicious activities</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={() => handleSaveSettings('security')}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Security Settings
                </Button>
                <Button variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  Generate New API Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Backup Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select value={backupSettings.backupFrequency} onValueChange={(value) => setBackupSettings({...backupSettings, backupFrequency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retentionDays">Retention Period (days)</Label>
                  <Input
                    id="retentionDays"
                    type="number"
                    value={backupSettings.retentionDays}
                    onChange={(e) => setBackupSettings({...backupSettings, retentionDays: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Backups</Label>
                  <p className="text-sm text-gray-600">Enable scheduled automatic backups</p>
                </div>
                <Switch
                  checked={backupSettings.autoBackupEnabled}
                  onCheckedChange={(checked) => setBackupSettings({...backupSettings, autoBackupEnabled: checked})}
                />
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="mb-3">Last Backup Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Last Backup</p>
                    <p>{backupSettings.lastBackup}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge className="bg-green-100 text-green-800">Successful</Badge>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={() => handleSaveSettings('backup')}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Backup Settings
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Manual Backup
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Create Manual Backup</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will create a full system backup. This process may take several minutes and could affect system performance.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSystemBackup}>
                        Start Backup
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}