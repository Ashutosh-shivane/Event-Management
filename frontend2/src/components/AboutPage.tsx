import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Calendar, 
  Users, 
  Target, 
  Award,
  ArrowLeft,
  Globe,
  Heart,
  Lightbulb
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutPage() {
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
              <button className="text-muted-foreground hover:text-foreground transition-colors">
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
                  About EventHub
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
                  Revolutionizing
                  <span className="text-primary"> Event Management </span>
                  Worldwide
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Founded in 2025, EventHub has grown from a simple idea to a comprehensive platform serving thousands of event professionals worldwide. Our mission is to make event management accessible, efficient, and enjoyable for everyone.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya2luZ3xlbnwxfHx8fDE3NTcyMzQ4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="EventHub Team"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      To democratize event management by providing a comprehensive platform that connects all stakeholders in the event ecosystem. We believe that great events happen when everyone - students, organizers, managers, vendors, and administrators - can collaborate seamlessly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      To become the global standard for event management, empowering millions of event creators to deliver exceptional experiences. We envision a world where technology enables human connections and memorable moments at every scale.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Our Values</Badge>
            <h2 className="text-4xl font-bold">What Drives Us</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Community First",
                description: "We put our users and their communities at the center of everything we build",
                color: "text-blue-500"
              },
              {
                icon: Heart,
                title: "Passion for Excellence",
                description: "We're committed to delivering exceptional experiences in every interaction",
                color: "text-red-500"
              },
              {
                icon: Globe,
                title: "Global Impact",
                description: "We strive to make a positive difference in events and communities worldwide",
                color: "text-green-500"
              }
            ].map((value, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="space-y-6">
                    <div className={`h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto ${value.color}`}>
                      <value.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Our Impact</Badge>
            <h2 className="text-4xl font-bold">EventHub by the Numbers</h2>
            <p className="text-xl text-muted-foreground">
              Growing every day with our amazing community
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Events Created" },
              { number: "500K+", label: "Users Worldwide" },
              { number: "25+", label: "Countries" },
              { number: "99.9%", label: "Uptime" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">Ready to Join Our Mission?</h2>
            <p className="text-xl opacity-90">
              Whether you're organizing your first event or your thousandth, we're here to help you succeed.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/signup')}
              >
                Start Your Journey
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={() => navigate('/')}
              >
                Learn More
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
                <div>About</div>
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