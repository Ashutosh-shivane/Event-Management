import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft, 
  Star, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  capacity: number;
  registeredCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  category: string;
}

interface FeedbackData {
  eventId: string;
  overallRating: number;
  organizationRating: number;
  contentRating: number;
  venueRating: number;
  positiveAspects: string;
  improvements: string;
  wouldRecommend: boolean;
  additionalComments: string;
}

// Mock event data (same as in StudentFeedbackPage)
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Innovation Summit 2024',
    description: 'A comprehensive summit covering latest trends in technology and innovation.',
    date: '2024-03-15',
    time: '09:00 AM',
    location: 'Main Auditorium',
    organizer: 'Tech Club',
    capacity: 200,
    registeredCount: 185,
    status: 'completed',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Cultural Festival 2024',
    description: 'Annual cultural celebration featuring performances, food, and exhibitions.',
    date: '2024-02-28',
    time: '06:00 PM',
    location: 'Campus Grounds',
    organizer: 'Cultural Committee',
    capacity: 500,
    registeredCount: 423,
    status: 'completed',
    category: 'Cultural'
  },
  {
    id: '3',
    title: 'Career Development Workshop',
    description: 'Professional workshop on career planning and interview preparation.',
    date: '2024-02-20',
    time: '02:00 PM',
    location: 'Conference Room A',
    organizer: 'Career Services',
    capacity: 50,
    registeredCount: 48,
    status: 'completed',
    category: 'Professional Development'
  },
  {
    id: '5',
    title: 'Science Exhibition',
    description: 'Student science projects showcase and competition.',
    date: '2024-01-15',
    time: '10:00 AM',
    location: 'Science Building',
    organizer: 'Science Department',
    capacity: 150,
    registeredCount: 134,
    status: 'completed',
    category: 'Academic'
  }
];

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  label: string;
}

function StarRating({ rating, onRatingChange, label }: StarRatingProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="p-1 hover:scale-110 transition-transform"
          >
            <Star
              className={`h-6 w-6 ${
                star <= rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 hover:text-yellow-400'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {rating > 0 ? `${rating}/5` : 'Not rated'}
        </span>
      </div>
    </div>
  );
}

export function StudentFeedbackForm() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData>({
    eventId: eventId || '',
    overallRating: 0,
    organizationRating: 0,
    contentRating: 0,
    venueRating: 0,
    positiveAspects: '',
    improvements: '',
    wouldRecommend: false,
    additionalComments: ''
  });

  useEffect(() => {
    if (eventId) {
      const foundEvent = mockEvents.find(e => e.id === eventId);
      if (foundEvent) {
        setEvent(foundEvent);
        setFeedback(prev => ({ ...prev, eventId }));
      }
    }
  }, [eventId]);

  const handleBack = () => {
    navigate('/student/feedback');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (feedback.overallRating === 0) {
      toast.error('Please provide an overall rating');
      return;
    }

    if (!feedback.positiveAspects.trim()) {
      toast.error('Please share what you liked about the event');
      return;
    }

    if (!feedback.improvements.trim()) {
      toast.error('Please provide suggestions for improvement');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the feedback to your backend
      console.log('Feedback submitted:', feedback);
      
      toast.success('Feedback submitted successfully!');
      navigate('/student/feedback');
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!event) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Event Not Found</h3>
            <p className="text-gray-600 mb-4">
              The event you're trying to provide feedback for could not be found.
            </p>
            <Button onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Feedback
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Event Feedback</h1>
          <p className="text-gray-600">Share your experience and help us improve</p>
        </div>
      </div>

      {/* Event Information */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl">{event.title}</CardTitle>
            <Badge variant="secondary" className="capitalize">
              {event.status}
            </Badge>
          </div>
          <p className="text-gray-600">{event.description}</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(event.date).toLocaleDateString()} at {event.time}
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              {event.location}
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              {event.registeredCount}/{event.capacity} participants
            </div>
          </div>
          <div className="mt-4">
            <Badge variant="outline">{event.category}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Form */}
      <Card>
        <CardHeader>
          <CardTitle>Your Feedback</CardTitle>
          <p className="text-gray-600">
            Your honest feedback helps us organize better events in the future.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ratings Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <StarRating
                rating={feedback.overallRating}
                onRatingChange={(rating) => setFeedback(prev => ({ ...prev, overallRating: rating }))}
                label="Overall Experience *"
              />
              <StarRating
                rating={feedback.organizationRating}
                onRatingChange={(rating) => setFeedback(prev => ({ ...prev, organizationRating: rating }))}
                label="Event Organization"
              />
              <StarRating
                rating={feedback.contentRating}
                onRatingChange={(rating) => setFeedback(prev => ({ ...prev, contentRating: rating }))}
                label="Content Quality"
              />
              <StarRating
                rating={feedback.venueRating}
                onRatingChange={(rating) => setFeedback(prev => ({ ...prev, venueRating: rating }))}
                label="Venue & Facilities"
              />
            </div>

            {/* Text Feedback */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="positiveAspects" className="text-sm font-medium">
                  What did you like most about this event? *
                </Label>
                <Textarea
                  id="positiveAspects"
                  placeholder="Share the positive aspects of the event..."
                  value={feedback.positiveAspects}
                  onChange={(e) => setFeedback(prev => ({ ...prev, positiveAspects: e.target.value }))}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="improvements" className="text-sm font-medium">
                  What could be improved? *
                </Label>
                <Textarea
                  id="improvements"
                  placeholder="Suggest areas for improvement..."
                  value={feedback.improvements}
                  onChange={(e) => setFeedback(prev => ({ ...prev, improvements: e.target.value }))}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="additionalComments" className="text-sm font-medium">
                  Additional Comments
                </Label>
                <Textarea
                  id="additionalComments"
                  placeholder="Any other feedback or suggestions..."
                  value={feedback.additionalComments}
                  onChange={(e) => setFeedback(prev => ({ ...prev, additionalComments: e.target.value }))}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>

            {/* Recommendation */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Would you recommend this event to others?</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="recommend"
                    checked={feedback.wouldRecommend === true}
                    onChange={() => setFeedback(prev => ({ ...prev, wouldRecommend: true }))}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="recommend"
                    checked={feedback.wouldRecommend === false}
                    onChange={() => setFeedback(prev => ({ ...prev, wouldRecommend: false }))}
                    className="text-blue-600"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={handleBack}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}