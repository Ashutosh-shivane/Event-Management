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
  User,
  Plus,
  AlertCircle,
} from 'lucide-react';

interface EventOutDto {
  id: number;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  location: string;
  status: string;
  cost: string;
  requiredVolunteer: string;
  category: string;
}

interface UpcomingEventStat {
  eventId: number;
  title: string;
  location: string;
  startAt: string;
  totalStudents: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  required_volunteer: string;
}

interface DashboardResponse {
  past_event_count: string;
  upcoming_event_count: string;
  approved_upcoming_event_count: string;
  assigned_events: EventOutDto[];
  upcoming_event_stats: UpcomingEventStat[];
}

export function ManagerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🧩 Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<DashboardResponse>(
          `http://localhost:8080/Dashboard/manager/${user?.id}`
        );
        setData(res.data);
      } catch (err: any) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchData();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
      case 'Event Completed':
        return 'bg-green-100 text-green-800';
      case 'Event Created':
      case 'UPCOMING':
        return 'bg-blue-100 text-blue-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading dashboard...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!data)
    return <p className="text-center text-gray-600 mt-10">No data available.</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
        <div className="flex space-x-3">
          <Button
            onClick={() => navigate('/manager/add-event')}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Event</span>
          </Button>
          <Button variant="outline" onClick={() => navigate('/events')}>
            View All Events
          </Button>
        </div>
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
                <p className="text-2xl font-semibold">{data.upcoming_event_count}</p>
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
                <p className="text-sm text-gray-600">Approved Upcoming Events</p>
                <p className="text-2xl font-semibold">{data.approved_upcoming_event_count}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Clock className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Past Events</p>
                <p className="text-2xl font-semibold">{data.past_event_count}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Events */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Events</CardTitle>
        </CardHeader>
        <CardContent>
          {data.assigned_events.length > 0 ? (
            <div className="space-y-4">
              {data.assigned_events.map((event) => (
                <div key={event.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.location}</p>
                    </div>
                    <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{event.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Start: {new Date(event.startAt).toLocaleString()}</span>
                    <span>End: {new Date(event.endAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No assigned events.</p>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Event Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Event Stats</CardTitle>
        </CardHeader>
        <CardContent>
          {data.upcoming_event_stats.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Location</th>
                    <th className="px-4 py-2">Total</th>
                    <th className="px-4 py-2 text-green-600">Approved</th>
                    <th className="px-4 py-2 text-yellow-600">Pending</th>
                    <th className="px-4 py-2 text-red-600">Rejected</th>
                    <th className="px-4 py-2">Volunteers</th>
                    <th className="px-4 py-2">Start Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.upcoming_event_stats.map((stat) => (
                    <tr key={stat.eventId} className="border-t">
                      <td className="px-4 py-2">{stat.title}</td>
                      <td className="px-4 py-2">{stat.location}</td>
                      <td className="px-4 py-2 text-center">{stat.totalStudents}</td>
                      <td className="px-4 py-2 text-center text-green-600">
                        {stat.approvedCount}
                      </td>
                      <td className="px-4 py-2 text-center text-yellow-600">
                        {stat.pendingCount}
                      </td>
                      <td className="px-4 py-2 text-center text-red-600">
                        {stat.rejectedCount}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {stat.required_volunteer}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(stat.startAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No upcoming event stats.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
