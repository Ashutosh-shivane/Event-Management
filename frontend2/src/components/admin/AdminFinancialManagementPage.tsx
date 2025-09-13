import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard,
  Download,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Banknote
} from 'lucide-react';

export function AdminFinancialManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedType, setSelectedType] = useState('all');

  const financialStats = [
    { label: 'Total Revenue', value: '$1,247,890', change: '+18.5%', period: 'This month', color: 'green' },
    { label: 'Platform Fees', value: '$62,395', change: '+15.2%', period: 'This month', color: 'blue' },
    { label: 'Vendor Payouts', value: '$1,098,542', change: '+19.1%', period: 'This month', color: 'purple' },
    { label: 'Pending Payments', value: '$86,953', change: '-5.3%', period: 'This month', color: 'yellow' }
  ];

  const revenueData = [
    { month: 'Jan', registration: 85000, vendor: 25000, commission: 12000, total: 122000 },
    { month: 'Feb', registration: 92000, vendor: 28000, commission: 15000, total: 135000 },
    { month: 'Mar', registration: 108000, vendor: 32000, commission: 18000, total: 158000 },
    { month: 'Apr', registration: 125000, vendor: 38000, commission: 22000, total: 185000 },
    { month: 'May', registration: 142000, vendor: 45000, commission: 28000, total: 215000 },
    { month: 'Jun', registration: 156000, vendor: 52000, commission: 32000, total: 240000 }
  ];

  const transactions = [
    {
      id: 'TXN-001',
      type: 'event_registration',
      event: 'Tech Summit 2024',
      organizer: 'TechCorp Inc.',
      amount: 2500.00,
      fee: 125.00,
      net: 2375.00,
      status: 'completed',
      date: '2024-03-10 14:30:00',
      paymentMethod: 'credit_card'
    },
    {
      id: 'TXN-002',
      type: 'vendor_payout',
      event: 'Digital Marketing Workshop',
      vendor: 'Premium Catering',
      amount: 1800.00,
      fee: 90.00,
      net: 1710.00,
      status: 'pending',
      date: '2024-03-09 10:15:00',
      paymentMethod: 'bank_transfer'
    },
    {
      id: 'TXN-003',
      type: 'refund',
      event: 'Art Festival 2024',
      user: 'John Smith',
      amount: 150.00,
      fee: -7.50,
      net: -142.50,
      status: 'completed',
      date: '2024-03-08 16:45:00',
      paymentMethod: 'credit_card'
    },
    {
      id: 'TXN-004',
      type: 'commission',
      event: 'Healthcare Conference',
      organizer: 'MedTech Solutions',
      amount: 750.00,
      fee: 0.00,
      net: 750.00,
      status: 'completed',
      date: '2024-03-07 12:20:00',
      paymentMethod: 'platform_fee'
    },
    {
      id: 'TXN-005',
      type: 'vendor_payment',
      event: 'Business Summit',
      vendor: 'AV Solutions',
      amount: 3200.00,
      fee: 160.00,
      net: 3040.00,
      status: 'processing',
      date: '2024-03-06 09:30:00',
      paymentMethod: 'bank_transfer'
    }
  ];

  const pendingPayouts = [
    {
      id: 1,
      recipient: 'Premium Catering Solutions',
      type: 'vendor',
      amount: 4250.00,
      events: 3,
      dueDate: '2024-03-15',
      status: 'pending'
    },
    {
      id: 2,
      recipient: 'TechCorp Inc.',
      type: 'organizer',
      amount: 12750.00,
      events: 2,
      dueDate: '2024-03-12',
      status: 'approved'
    },
    {
      id: 3,
      recipient: 'Creative Decorations',
      type: 'vendor',
      amount: 2850.00,
      events: 4,
      dueDate: '2024-03-18',
      status: 'pending'
    },
    {
      id: 4,
      recipient: 'EventPro Management',
      type: 'organizer',
      amount: 8920.00,
      events: 1,
      dueDate: '2024-03-14',
      status: 'processing'
    }
  ];

  const disputedTransactions = [
    {
      id: 'DIS-001',
      transaction: 'TXN-8745',
      event: 'Tech Conference 2024',
      user: 'Sarah Johnson',
      amount: 299.00,
      reason: 'Service not provided',
      date: '2024-03-05',
      status: 'investigating',
      priority: 'high'
    },
    {
      id: 'DIS-002',
      transaction: 'TXN-8723',
      event: 'Marketing Workshop',
      vendor: 'Catering Plus',
      amount: 850.00,
      reason: 'Payment not received',
      date: '2024-03-03',
      status: 'resolved',
      priority: 'medium'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.event?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (transaction.organizer?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (transaction.vendor?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || transaction.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'event_registration': return 'bg-green-100 text-green-800';
      case 'vendor_payout': return 'bg-blue-100 text-blue-800';
      case 'refund': return 'bg-red-100 text-red-800';
      case 'commission': return 'bg-purple-100 text-purple-800';
      case 'vendor_payment': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'investigating': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1>Financial Management</h1>
        <div className="flex space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {financialStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p>{stat.value}</p>
                  <div className="flex items-center mt-1">
                    {stat.change.startsWith('+') ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#10B981" strokeWidth={3} />
                    <Line type="monotone" dataKey="registration" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="vendor" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey="registration" stackId="a" fill="#10B981" />
                    <Bar dataKey="vendor" stackId="a" fill="#3B82F6" />
                    <Bar dataKey="commission" stackId="a" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="event_registration">Event Registration</SelectItem>
                    <SelectItem value="vendor_payout">Vendor Payout</SelectItem>
                    <SelectItem value="refund">Refund</SelectItem>
                    <SelectItem value="commission">Commission</SelectItem>
                    <SelectItem value="vendor_payment">Vendor Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Event/Details</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Net</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono">{transaction.id}</TableCell>
                      <TableCell>
                        <Badge className={getTransactionTypeColor(transaction.type)}>
                          {transaction.type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{transaction.event}</p>
                          <p className="text-sm text-gray-600">
                            {transaction.organizer || transaction.vendor || transaction.user}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                      <TableCell>
                        <span className={transaction.fee >= 0 ? 'text-red-600' : 'text-green-600'}>
                          {formatCurrency(transaction.fee)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={transaction.net >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(transaction.net)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(transaction.date).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payouts Tab */}
        <TabsContent value="payouts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Events</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingPayouts.map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell>
                        <div className="flex items-center">
                          {payout.type === 'vendor' ? (
                            <Banknote className="h-4 w-4 mr-2 text-blue-600" />
                          ) : (
                            <Users className="h-4 w-4 mr-2 text-green-600" />
                          )}
                          {payout.recipient}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{payout.type}</Badge>
                      </TableCell>
                      <TableCell>{formatCurrency(payout.amount)}</TableCell>
                      <TableCell>{payout.events} events</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {payout.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payout.status)}>
                          {payout.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {payout.status === 'pending' && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          )}
                          {payout.status === 'approved' && (
                            <Button size="sm">
                              <Clock className="h-4 w-4 mr-1" />
                              Process
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Disputes Tab */}
        <TabsContent value="disputes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dispute ID</TableHead>
                    <TableHead>Transaction</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Party</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {disputedTransactions.map((dispute) => (
                    <TableRow key={dispute.id}>
                      <TableCell className="font-mono">{dispute.id}</TableCell>
                      <TableCell className="font-mono">{dispute.transaction}</TableCell>
                      <TableCell>{dispute.event}</TableCell>
                      <TableCell>{dispute.user || dispute.vendor}</TableCell>
                      <TableCell>{formatCurrency(dispute.amount)}</TableCell>
                      <TableCell>{dispute.reason}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(dispute.priority)}>
                          {dispute.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(dispute.status)}>
                          {dispute.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{dispute.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Investigate
                          </Button>
                          {dispute.status === 'investigating' && (
                            <Button size="sm">
                              Resolve
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <h3>Revenue Report</h3>
                    <p className="text-sm text-gray-600">Detailed revenue breakdown by period</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <h3>Transaction Report</h3>
                    <p className="text-sm text-gray-600">Complete transaction history and analysis</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Banknote className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <h3>Payout Report</h3>
                    <p className="text-sm text-gray-600">Vendor and organizer payout summary</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <h3>Dispute Report</h3>
                    <p className="text-sm text-gray-600">Payment disputes and resolutions</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <h3>Tax Report</h3>
                    <p className="text-sm text-gray-600">Tax calculations and compliance data</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-indigo-600" />
                  <div className="ml-4">
                    <h3>User Financial Report</h3>
                    <p className="text-sm text-gray-600">User spending patterns and behavior</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}