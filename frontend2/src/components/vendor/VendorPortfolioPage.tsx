import React from 'react';
import { useAuth } from '../AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Image as ImageIcon,
  Upload,
  X
} from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  eventType: string;
  clientName: string;
  eventDate: string;
  location: string;
  guestCount: number;
  budget: number;
  description: string;
  services: string[];
  images: string[];
  rating: number;
  testimonial?: string;
  featured: boolean;
}

export function VendorPortfolioPage() {
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<PortfolioItem | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  // Form state
  const [formData, setFormData] = React.useState({
    title: '',
    eventType: '',
    clientName: '',
    eventDate: '',
    location: '',
    guestCount: '',
    budget: '',
    description: '',
    services: [] as string[],
    images: [] as string[],
    testimonial: ''
  });

  // Mock portfolio data
  const [portfolioItems, setPortfolioItems] = React.useState<PortfolioItem[]>([
    {
      id: '1',
      title: 'Tech Summit 2023 Catering',
      eventType: 'Corporate Conference',
      clientName: 'TechCorp Inc.',
      eventDate: '2023-10-15',
      location: 'San Francisco Convention Center',
      guestCount: 500,
      budget: 15000,
      description: 'Premium catering services for a 3-day tech summit including breakfast, lunch, dinner, and coffee breaks. Featured locally sourced ingredients and dietary accommodations.',
      services: ['Breakfast Catering', 'Lunch Service', 'Dinner Banquet', 'Coffee Stations', 'Dietary Accommodations'],
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
      rating: 5.0,
      testimonial: 'Exceptional service and delicious food! The team was professional and accommodated all our dietary needs perfectly.',
      featured: true
    },
    {
      id: '2',
      title: 'Wedding Reception Photography',
      eventType: 'Wedding',
      clientName: 'Sarah & Mike Johnson',
      eventDate: '2023-08-20',
      location: 'Napa Valley Estate',
      guestCount: 120,
      budget: 3500,
      description: 'Full-day wedding photography coverage including ceremony, reception, and portraits. Delivered 500+ edited photos with same-day preview gallery.',
      services: ['Ceremony Photography', 'Reception Coverage', 'Portrait Sessions', 'Photo Editing', 'Online Gallery'],
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      rating: 4.9,
      testimonial: 'Amazing work! Captured every special moment beautifully. We couldn\'t be happier with our wedding photos.',
      featured: false
    },
    {
      id: '3',
      title: 'Annual Gala Event Planning',
      eventType: 'Corporate Gala',
      clientName: 'Charity Foundation',
      eventDate: '2023-12-01',
      location: 'Grand Ballroom, Downtown',
      guestCount: 300,
      budget: 25000,
      description: 'Complete event planning and coordination for annual charity gala including venue selection, vendor management, entertainment booking, and day-of coordination.',
      services: ['Event Planning', 'Vendor Coordination', 'Entertainment Booking', 'Decor Design', 'Day-of Coordination'],
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
      rating: 4.8,
      featured: true
    }
  ]);

  const eventTypes = [
    'Wedding',
    'Corporate Conference',
    'Corporate Gala',
    'Birthday Party',
    'Anniversary',
    'Graduation',
    'Music Festival',
    'Art Exhibition',
    'Product Launch',
    'Charity Event',
    'Other'
  ];

  const filteredItems = portfolioItems.filter(item => 
    selectedCategory === 'all' || item.eventType.toLowerCase().includes(selectedCategory.toLowerCase())
  );

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.eventType || !formData.clientName) {
      alert('Please fill in all required fields');
      return;
    }

    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      title: formData.title,
      eventType: formData.eventType,
      clientName: formData.clientName,
      eventDate: formData.eventDate,
      location: formData.location,
      guestCount: parseInt(formData.guestCount) || 0,
      budget: parseInt(formData.budget) || 0,
      description: formData.description,
      services: formData.services,
      images: formData.images,
      rating: 0,
      testimonial: formData.testimonial,
      featured: false
    };

    if (editingItem) {
      setPortfolioItems(prev => prev.map(item => 
        item.id === editingItem.id ? { ...newItem, id: editingItem.id } : item
      ));
      setEditingItem(null);
    } else {
      setPortfolioItems(prev => [...prev, newItem]);
    }

    resetForm();
    setShowAddForm(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      eventType: '',
      clientName: '',
      eventDate: '',
      location: '',
      guestCount: '',
      budget: '',
      description: '',
      services: [],
      images: [],
      testimonial: ''
    });
  };

  const handleEdit = (item: PortfolioItem) => {
    setFormData({
      title: item.title,
      eventType: item.eventType,
      clientName: item.clientName,
      eventDate: item.eventDate,
      location: item.location,
      guestCount: item.guestCount.toString(),
      budget: item.budget.toString(),
      description: item.description,
      services: item.services,
      images: item.images,
      testimonial: item.testimonial || ''
    });
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
      setPortfolioItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const toggleFeatured = (id: string) => {
    setPortfolioItems(prev => prev.map(item => 
      item.id === id ? { ...item, featured: !item.featured } : item
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground mt-2">
            Showcase your best work and attract new clients
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Portfolio Item
        </Button>
      </div>

      {/* Category Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All Events ({portfolioItems.length})
            </Button>
            {eventTypes.map(type => {
              const count = portfolioItems.filter(item => item.eventType === type).length;
              return count > 0 ? (
                <Button
                  key={type}
                  variant={selectedCategory === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(type)}
                >
                  {type} ({count})
                </Button>
              ) : null;
            })}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <div className="relative">
              {/* Main Image */}
              <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                {item.images.length > 0 ? (
                  <img 
                    src={item.images[0]} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              
              {/* Featured Badge */}
              {item.featured && (
                <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                  Featured
                </Badge>
              )}
              
              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(item)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <Badge variant="outline" className="text-xs">
                  {item.eventType}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-2" />
                  {new Date(item.eventDate).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-2" />
                  {item.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-2" />
                  {item.guestCount} guests
                </div>
                {item.budget > 0 && (
                  <div className="flex items-center">
                    <DollarSign className="h-3 w-3 mr-2" />
                    ${item.budget.toLocaleString()}
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2">
                {item.description}
              </p>
              
              {item.services.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.services.slice(0, 2).map(service => (
                    <Badge key={service} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {item.services.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{item.services.length - 2} more
                    </Badge>
                  )}
                </div>
              )}
              
              {item.rating > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{item.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{item.clientName}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleFeatured(item.id)}
                >
                  {item.featured ? 'Unfeature' : 'Feature'}
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {editingItem ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Corporate Gala Catering"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type *</Label>
                  <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                    placeholder="Client or company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Event Date</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => handleInputChange('eventDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Event venue or location"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guestCount">Guest Count</Label>
                  <Input
                    id="guestCount"
                    type="number"
                    value={formData.guestCount}
                    onChange={(e) => handleInputChange('guestCount', e.target.value)}
                    placeholder="Number of guests"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Project Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    placeholder="Project value"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the project, challenges, and results..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonial">Client Testimonial</Label>
                <Textarea
                  id="testimonial"
                  value={formData.testimonial}
                  onChange={(e) => handleInputChange('testimonial', e.target.value)}
                  placeholder="What did the client say about your work?"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  {editingItem ? 'Update' : 'Add'} Portfolio Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No portfolio items found</h3>
            <p className="text-muted-foreground mb-4">
              Start building your portfolio by adding your best work.
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}