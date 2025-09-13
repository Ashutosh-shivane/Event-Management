import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { 
  Search, 
  Filter,
  Download,
  Eye,
  Shield,
  User,
  Settings,
  Database,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Calendar as CalendarIcon,
  Activity
} from 'lucide-react';

export function AdminAuditLogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-03-10 14:30:25',
      user: 'admin@eventhub.com',
      userName: 'System Admin',
      action: 'user_login',
      category: 'authentication',
      resource: 'Admin Panel',
      details: 'Successful admin login from IP 192.168.1.100',
      severity: 'info',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      result: 'success'
    },
    {
      id: 2,
      timestamp: '2024-03-10 14:25:15',
      user: 'john.smith@email.com',
      userName: 'John Smith',
      action: 'event_approved',
      category: 'event_management',
      resource: 'Event ID: 156',
      details: 'Event "Tech Summit 2024" approved by admin',
      severity: 'medium',
      ip: '192.168.1.100',
      changes: {
        status: { from: 'pending', to: 'approved' },
        approvedBy: { from: null, to: 'admin@eventhub.com' },
        approvalDate: { from: null, to: '2024-03-10' }
      },
      result: 'success'
    },
    {
      id: 3,
      timestamp: '2024-03-10 14:20:45',
      user: 'sarah.johnson@techcorp.com',
      userName: 'Sarah Johnson',
      action: 'user_role_changed',
      category: 'user_management',
      resource: 'User ID: 234',
      details: 'User role changed from Student to Organizer',
      severity: 'high',
      ip: '10.0.0.50',
      changes: {
        role: { from: 'student', to: 'organizer' },
        permissions: { from: 'basic', to: 'event_creation' }
      },
      result: 'success'
    },
    {
      id: 4,
      timestamp: '2024-03-10 14:15:32',
      user: 'system',
      userName: 'System Process',
      action: 'backup_completed',
      category: 'system',
      resource: 'Database Backup',
      details: 'Automated daily backup completed successfully',
      severity: 'info',
      ip: 'localhost',
      result: 'success'
    },
    {
      id: 5,
      timestamp: '2024-03-10 14:10:18',
      user: 'mike.wilson@vendor.com',
      userName: 'Mike Wilson',
      action: 'login_failed',
      category: 'authentication',
      resource: 'Vendor Portal',
      details: 'Failed login attempt - invalid password',
      severity: 'warning',
      ip: '203.0.113.45',
      result: 'failure'
    },
    {
      id: 6,
      timestamp: '2024-03-10 14:05:55',
      user: 'admin@eventhub.com',
      userName: 'System Admin',
      action: 'settings_changed',
      category: 'configuration',
      resource: 'System Settings',
      details: 'Payment gateway configuration updated',
      severity: 'high',
      ip: '192.168.1.100',
      changes: {
        stripeEnabled: { from: false, to: true },
        commissionRate: { from: 3.5, to: 5.0 }
      },
      result: 'success'
    },
    {
      id: 7,
      timestamp: '2024-03-10 14:00:42',
      user: 'emily.davis@events.com',
      userName: 'Emily Davis',
      action: 'event_created',
      category: 'event_management',
      resource: 'Event ID: 157',
      details: 'New event "Digital Marketing Workshop" created',
      severity: 'medium',
      ip: '172.16.0.25',
      result: 'success'
    },
    {
      id: 8,
      timestamp: '2024-03-10 13:55:30',
      user: 'admin@eventhub.com',
      userName: 'System Admin',
      action: 'vendor_rejected',
      category: 'vendor_management',
      resource: 'Vendor ID: 89',
      details: 'Vendor application rejected - insufficient documentation',
      severity: 'medium',
      ip: '192.168.1.100',
      changes: {
        status: { from: 'pending', to: 'rejected' },
        rejectionReason: { from: null, to: 'insufficient documentation' }
      },
      result: 'success'
    }
  ];

  const activityStats = [
    { label: 'Total Logs Today', value: '1,247', change: '+8.2%', color: 'blue' },
    { label: 'Security Events', value: '23', change: '-12.5%', color: 'red' },
    { label: 'System Changes', value: '45', change: '+15.3%', color: 'yellow' },
    { label: 'User Actions', value: '1,179', change: '+9.1%', color: 'green' }
  ];

  const topUsers = [
    { user: 'admin@eventhub.com', name: 'System Admin', actions: 45, lastActivity: '2024-03-10 14:30:25' },
    { user: 'sarah.johnson@techcorp.com', name: 'Sarah Johnson', actions: 23, lastActivity: '2024-03-10 14:20:45' },
    { user: 'mike.wilson@vendor.com', name: 'Mike Wilson', actions: 18, lastActivity: '2024-03-10 14:10:18' },
    { user: 'emily.davis@events.com', name: 'Emily Davis', actions: 15, lastActivity: '2024-03-10 14:00:42' }
  ];

  const securityAlerts = [
    {
      id: 1,
      type: 'multiple_failed_logins',
      severity: 'high',
      user: 'unknown@suspicious.com',
      count: 5,
      timespan: '10 minutes',
      ip: '203.0.113.45',
      timestamp: '2024-03-10 13:45:00'
    },
    {
      id: 2,
      type: 'unusual_admin_activity',
      severity: 'medium',
      user: 'admin@eventhub.com',
      description: 'Mass user role changes detected',
      count: 8,
      timespan: '5 minutes',
      ip: '192.168.1.100',
      timestamp: '2024-03-10 12:30:00'
    },
    {
      id: 3,
      type: 'suspicious_api_calls',
      severity: 'medium',
      user: 'api_user_123',
      description: 'High volume of API requests',
      count: 150,
      timespan: '1 hour',
      ip: '198.51.100.25',
      timestamp: '2024-03-10 11:00:00'
    }
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    const matchesUser = selectedUser === 'all' || log.user === selectedUser;
    const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;
    
    return matchesSearch && matchesAction && matchesUser && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      authentication: 'bg-green-100 text-green-800',
      user_management: 'bg-blue-100 text-blue-800',
      event_management: 'bg-purple-100 text-purple-800',
      vendor_management: 'bg-orange-100 text-orange-800',
      system: 'bg-gray-100 text-gray-800',
      configuration: 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failure': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const ActionDetailsModal = ({ log }: { log: any }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">User</label>
          <p>{log.userName} ({log.user})</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">IP Address</label>
          <p>{log.ip}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Timestamp</label>
          <p>{log.timestamp}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Result</label>
          <div className="flex items-center">
            {getResultIcon(log.result)}
            <span className="ml-2">{log.result}</span>
          </div>
        </div>
      </div>
      
      <div>
        <label className="text-sm text-gray-600">Details</label>
        <p>{log.details}</p>
      </div>

      {log.changes && (
        <div>
          <label className="text-sm text-gray-600">Changes Made</label>
          <div className="bg-gray-50 p-3 rounded-lg mt-1">
            {Object.entries(log.changes).map(([key, change]: [string, any]) => (
              <div key={key} className="mb-2">
                <span className="font-medium">{key}:</span>
                <span className="text-red-600 ml-2">{change.from || 'null'}</span>
                <span className="mx-2">→</span>
                <span className="text-green-600">{change.to}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {log.userAgent && (
        <div>
          <label className="text-sm text-gray-600">User Agent</label>
          <p className="text-sm break-all">{log.userAgent}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1>Audit Log</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {activityStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p>{stat.value}</p>
                  <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} today
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="logs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="security">Security Alerts</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
          <TabsTrigger value="system">System Events</TabsTrigger>
        </TabsList>

        {/* Audit Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Audit Trail</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search logs by user, action, or details..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedAction} onValueChange={setSelectedAction}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="user_login">User Login</SelectItem>
                    <SelectItem value="event_approved">Event Approved</SelectItem>
                    <SelectItem value="user_role_changed">Role Changed</SelectItem>
                    <SelectItem value="settings_changed">Settings Changed</SelectItem>
                    <SelectItem value="event_created">Event Created</SelectItem>
                    <SelectItem value="vendor_rejected">Vendor Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Date Range
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Logs Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          <div>
                            <p className="text-sm">{log.userName}</p>
                            <p className="text-xs text-gray-600">{log.user}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.action.replace('_', ' ')}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(log.category)}>
                          {log.category.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{log.resource}</TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(log.severity)}>
                          {log.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getResultIcon(log.result)}
                          <span className="ml-2 text-sm">{log.result}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Alerts Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityAlerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-red-600" />
                        <div>
                          <h3>{alert.type.replace('_', ' ')}</h3>
                          <p className="text-sm text-gray-600">{alert.description}</p>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                      <div>
                        <span className="text-gray-600">User:</span>
                        <p>{alert.user}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">IP Address:</span>
                        <p>{alert.ip}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Count:</span>
                        <p>{alert.count} in {alert.timespan}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Time:</span>
                        <p>{alert.timestamp}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button size="sm">Investigate</Button>
                      <Button variant="outline" size="sm">Block IP</Button>
                      <Button variant="outline" size="sm">Dismiss</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Activity Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Actions Today</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topUsers.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.actions}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{user.lastActivity}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Events Tab */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Events</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Component</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs
                    .filter(log => log.category === 'system')
                    .map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Database className="h-4 w-4 mr-2 text-blue-500" />
                          {log.action.replace('_', ' ')}
                        </div>
                      </TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getResultIcon(log.result)}
                          <span className="ml-2 text-sm">{log.result}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{log.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}