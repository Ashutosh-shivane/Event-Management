import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  Plus,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react';
import axios from 'axios';

export function OrganizerDashboard() {
  const navigate = useNavigate();

  // ---- State ----
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ---- Fetch Data ----

  var userid=localStorage.getItem("id");
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Replace with your actual endpoint
        const res = await axios.get(`http://localhost:8080/Dashboard/organizer/${userid}`);
        setDashboardData(res.data);
      } catch (err) {
        console.error('Error fetching dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading dashboard...</div>;
  }

  if (!dashboardData) {
    return <div className="p-8 text-center text-red-500">No data available</div>;
  }

  const {
    total_event_count,
    past_event_count,
    upcoming_event_count,
    total_past_event_cost,
    event_details
  } = dashboardData;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'event created': return 'bg-yellow-100 text-yellow-800';
      case 'event updated': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (val: string | number) => {
    const num = Number(val) || 0;
    return num.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  // ---- Derived Stats ----
  const totalUsedBudget = event_details.reduce((sum: number, e: any) => sum + Number(e.usedBudget || 0), 0);
  const totalBudget = event_details.reduce((sum: number, e: any) => sum + Number(e.totalBudget || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Organizer Dashboard</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => navigate('/organizer/manage-events')}
          >
            <Users size={16} />
            <span>Manage Events</span>
          </Button>
          <Button 
            className="flex items-center space-x-2"
            onClick={() => navigate('/organizer/create-event')}
          >
            <Plus size={16} />
            <span>Create Event</span>
          </Button>
        </div>
      </div>

      {/* ---- Stats Overview ---- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-semibold">{total_event_count}</p>
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
                <p className="text-sm text-gray-600">Upcoming Events</p>
                <p className="text-2xl font-semibold">{upcoming_event_count}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Past Events</p>
                <p className="text-2xl font-semibold">{past_event_count}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-semibold">{formatCurrency(total_past_event_cost)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ---- Event List ---- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>My Events</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/organizer/manage-events')}
            >
              View All
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {event_details.map((event: any) => {
              const volunteers = Number(event.totalRegisteredStudents || 0);
              const maxVolunteers = Number(event.requiredVolunteer || 0);
              const usedBudget = Number(event.usedBudget || 0);
              const totalBudget = Number(event.totalBudget || 0);

              const volunteerProgress = maxVolunteers ? (volunteers / maxVolunteers) * 100 : 0;
              const budgetProgress = totalBudget ? (usedBudget / totalBudget) * 100 : 0;

              return (
                <div key={event.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600">
                        {event.startAt ? new Date(event.startAt).toLocaleString() : '—'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Volunteers</p>
                      <p className="font-semibold">{volunteers}/{maxVolunteers}</p>
                      <Progress value={volunteerProgress} className="h-1 mt-1" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Budget Used</p>
                      <p className="font-semibold">
                        {formatCurrency(usedBudget)} / {formatCurrency(totalBudget)}
                      </p>
                      <Progress value={budgetProgress} className="h-1 mt-1" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-semibold">{event.category}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/organizer/events/${event.id}/edit`)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/organizer/events/${event.id}/add-manager`)}
                    >
                      <Users className="h-4 w-4 mr-1" />
                      Add Manager
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
