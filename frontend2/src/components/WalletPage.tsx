import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Wallet, 
  CreditCard, 
  DollarSign, 
  TrendingUp,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar
} from 'lucide-react';

export function WalletPage() {
  const { user } = useAuth();
  const [balance] = useState(1245.67);

  const transactions = [
    {
      id: 1,
      type: 'income',
      description: 'Event registration: Tech Conference 2024',
      amount: 50.00,
      date: '2024-03-10',
      status: 'completed',
      method: 'Credit Card'
    },
    {
      id: 2,
      type: 'expense',
      description: 'Service fee for Music Festival',
      amount: -5.00,
      date: '2024-03-09',
      status: 'completed',
      method: 'Wallet Balance'
    },
    {
      id: 3,
      type: 'income',
      description: 'Vendor payment: Catering Services',
      amount: 2500.00,
      date: '2024-03-08',
      status: 'completed',
      method: 'Bank Transfer'
    },
    {
      id: 4,
      type: 'expense',
      description: 'Event ticket: Career Fair 2024',
      amount: -25.00,
      date: '2024-03-07',
      status: 'pending',
      method: 'Credit Card'
    },
    {
      id: 5,
      type: 'income',
      description: 'Refund: Workshop cancellation',
      amount: 120.00,
      date: '2024-03-06',
      status: 'completed',
      method: 'Original Payment Method'
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      name: 'Visa ending in 4242',
      isDefault: true,
      expiryDate: '12/26'
    },
    {
      id: 2,
      type: 'card',
      name: 'MasterCard ending in 8888',
      isDefault: false,
      expiryDate: '08/25'
    },
    {
      id: 3,
      type: 'bank',
      name: 'Bank Account ending in 1234',
      isDefault: false,
      expiryDate: null
    }
  ];

  const monthlyStats = [
    { month: 'Jan', income: 1200, expenses: 300 },
    { month: 'Feb', income: 1800, expenses: 450 },
    { month: 'Mar', income: 2100, expenses: 380 }
  ];

  const getTransactionIcon = (type: string) => {
    return type === 'income' ? 
      <ArrowDownLeft className="h-4 w-4 text-green-600" /> : 
      <ArrowUpRight className="h-4 w-4 text-red-600" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Wallet & Payments</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            Add Funds
          </Button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wallet className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Current Balance</p>
                <p className="text-2xl font-semibold">${balance.toFixed(2)}</p>
                <p className="text-xs text-green-600">+12.5% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">This Month Income</p>
                <p className="text-2xl font-semibold">$2,100</p>
                <p className="text-xs text-green-600">+16.7% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">This Month Expenses</p>
                <p className="text-2xl font-semibold">$380</p>
                <p className="text-xs text-red-600">-15.6% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getTransactionIcon(transaction.type)}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>{transaction.date}</span>
                        <span>•</span>
                        <span>{transaction.method}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <Badge className={getStatusColor(transaction.status)} variant="secondary">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="outline">View All Transactions</Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{method.name}</p>
                      {method.expiryDate && (
                        <p className="text-sm text-gray-600">Expires {method.expiryDate}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {method.isDefault && (
                      <Badge variant="secondary">Default</Badge>
                    )}
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <Plus size={16} className="mr-2" />
                Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly" className="w-full">
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monthly" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {monthlyStats.map((stat, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">{stat.month} 2024</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Income</span>
                        <span className="font-medium text-green-600">${stat.income}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Expenses</span>
                        <span className="font-medium text-red-600">${stat.expenses}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="font-medium text-gray-900">Net</span>
                        <span className="font-semibold text-blue-600">
                          ${stat.income - stat.expenses}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="yearly" className="mt-6">
              <div className="text-center py-12">
                <TrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Yearly financial data visualization would be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}