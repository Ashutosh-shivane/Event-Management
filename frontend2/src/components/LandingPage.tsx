import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Calendar, 
  Users, 
  Wallet, 
  BarChart3, 
  Shield, 
  Star, 
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Bell
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">EventHub</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm">
                  🎉 New: Advanced Analytics Dashboard
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
                  The Complete
                  <span className="text-primary"> Event Management </span>
                  Platform
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Streamline your events from planning to execution. Connect students, organizers, managers, vendors, and admins on one powerful platform.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate('/signup')}>
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1712971404080-87271ce2e473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMG1hbmFnZW1lbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc1NzIzNDc4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Event Management Dashboard"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">2,500+</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-card border border-border rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">98.5%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Features</Badge>
            <h2 className="text-4xl font-bold">Everything you need to manage events</h2>
            <p className="text-xl text-muted-foreground">
              Five specialized dashboards for every role in your event ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Student Dashboard",
                description: "Browse events, join activities, track participation, and connect with peers",
                color: "text-blue-500"
              },
              {
                icon: Calendar,
                title: "Organizer Tools",
                description: "Create events, manage registrations, coordinate with vendors and volunteers",
                color: "text-green-500"
              },
              {
                icon: Shield,
                title: "Manager Oversight",
                description: "Oversee multiple events, assign resources, approve budgets and monitor progress",
                color: "text-purple-500"
              },
              {
                icon: Wallet,
                title: "Vendor Platform",
                description: "Bid on projects, manage contracts, track payments and build reputation",
                color: "text-orange-500"
              },
              {
                icon: BarChart3,
                title: "Admin Control",
                description: "System administration, user management, analytics and platform oversight",
                color: "text-red-500"
              },
              {
                icon: MessageCircle,
                title: "Communication Hub",
                description: "Built-in chat, notifications, and collaboration tools for seamless coordination",
                color: "text-indigo-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className={`h-12 w-12 rounded-lg bg-muted flex items-center justify-center ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">How It Works</Badge>
            <h2 className="text-4xl font-bold">Simple, powerful event management</h2>
            <p className="text-xl text-muted-foreground">
              Get started in minutes with our intuitive platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Account",
                description: "Choose your role and set up your profile in under 2 minutes"
              },
              {
                step: "02", 
                title: "Build Your Event",
                description: "Use our intuitive tools to create, customize and publish your events"
              },
              {
                step: "03",
                title: "Manage & Scale",
                description: "Track progress, communicate with stakeholders, and grow your events"
              }
            ].map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="h-16 w-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Testimonials</Badge>
            <h2 className="text-4xl font-bold">Trusted by event professionals</h2>
            <p className="text-xl text-muted-foreground">
              See what our customers are saying about EventHub
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "EventHub transformed how we manage our university events. The coordination between students, organizers, and vendors is seamless.",
                author: "Sarah Johnson",
                title: "Event Manager, State University",
                rating: 5
              },
              {
                quote: "As a vendor, the bidding system and payment tracking features have streamlined our entire business process.",
                author: "Mike Chen",
                title: "CEO, Premier Catering",
                rating: 5
              },
              {
                quote: "The admin dashboard gives me complete visibility across all our events. The analytics are incredibly detailed.",
                author: "Lisa Rodriguez",
                title: "Operations Director, EventCorp",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Pricing</Badge>
            <h2 className="text-4xl font-bold">Simple, transparent pricing</h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your event management needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/month",
                description: "Perfect for small events and organizations",
                features: [
                  "Up to 5 events per month",
                  "Basic dashboard",
                  "Email support",
                  "Standard analytics"
                ],
                popular: false
              },
              {
                name: "Professional",
                price: "$79",
                period: "/month",
                description: "Ideal for growing event management companies",
                features: [
                  "Unlimited events",
                  "Advanced dashboards",
                  "Priority support",
                  "Advanced analytics",
                  "Vendor marketplace",
                  "Custom branding"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For large organizations with complex needs",
                features: [
                  "Everything in Professional",
                  "Custom integrations",
                  "Dedicated account manager",
                  "SLA guarantee",
                  "Advanced security",
                  "Custom reporting"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                    
                    <div>
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => navigate('/signup')}
                    >
                      Get Started
                    </Button>
                    
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">Ready to transform your events?</h2>
            <p className="text-xl opacity-90">
              Join thousands of event professionals who trust EventHub to manage their events successfully.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/signup')}
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-primary" />
                <span className="font-bold">EventHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The complete event management platform for modern organizations.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Features</div>
                <div>Pricing</div>
                <div>API</div>
                <div>Integrations</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <button onClick={() => navigate('/about')}>About</button>
                <div>Careers</div>
                <div>Blog</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Help Center</div>
                <div>Documentation</div>
                <div>Status</div>
                <div>Community</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <div>© 2025 EventHub. All rights reserved.</div>
            <div className="flex items-center space-x-6">
              <div>Privacy Policy</div>
              <div>Terms of Service</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}