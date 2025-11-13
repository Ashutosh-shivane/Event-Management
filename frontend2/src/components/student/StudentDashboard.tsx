import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  UserCheck,
  Building,
  User
} from 'lucide-react';

export function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // ✅ Backend data state
  const [dashboardData, setDashboardData] = useState({
    past_event_count: "0",
    upcoming_event_count: "0",
    total_hours: "0",
    active_events: [],
    register_events: []
  });

  const [loading, setLoading] = useState(true);

  const userid=localStorage.getItem('id');

  // ✅ Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/Dashboard/student/${userid}`);
        setDashboardData(res.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  const { 
    past_event_count, 
    upcoming_event_count, 
    total_hours, 
    active_events, 
    register_events 
  } = dashboardData;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name}!</p>
        </div>
        <Button onClick={() => navigate('/events')}>
          <Calendar className="h-4 w-4 mr-2" />
          Browse Events
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Upcoming Events</p>
                <p className="text-2xl font-semibold">{upcoming_event_count}</p>
                <p className="text-xs text-blue-600">In the future</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Past Events</p>
                <p className="text-2xl font-semibold">{past_event_count}</p>
                <p className="text-xs text-green-600">Already completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Volunteer Hours</p>
                <p className="text-2xl font-semibold">{total_hours}</p>
                <p className="text-xs text-purple-600">Total earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2" />
              Approved Future Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {active_events.length === 0 ? (
                <p className="text-gray-500 text-sm">No active events available.</p>
              ) : (
                active_events.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.category}</p>
                      </div>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>📅 {new Date(event.startAt).toLocaleString()}</span>
                      <span>📍 {event.location}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Registered Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Register Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {register_events.length === 0 ? (
                <p className="text-gray-500 text-sm">You haven’t registered for any events yet.</p>
              ) : (
                register_events.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.category}</p>
                      </div>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>📅 {new Date(event.startAt).toLocaleString()}</span>
                      <span>📍 {event.location}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/events/${event.id}`)}
                      className="mt-2"
                    >
                      View Details
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
