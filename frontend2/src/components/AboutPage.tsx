import React from 'react';
import { PageType } from '../App';
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

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('landing')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl">EventHub</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('login')}
              >
                Login
              </Button>
              <Button 
                onClick={() => onNavigate('signup')}
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
                  We're on a mission to make event management accessible, efficient, and enjoyable for everyone involved - from students to enterprises.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1557425631-f132f06f4aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTcxNjY3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Team collaboration"
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
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      To become the world's leading event management platform, empowering millions of event professionals to create memorable experiences. We envision a future where organizing events is as simple as a few clicks, and every participant feels valued and engaged.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Our Story</Badge>
            <h2 className="text-4xl font-bold">How EventHub Came to Life</h2>
          </div>

          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">The Problem We Solved</h3>
                <p className="text-muted-foreground leading-relaxed">
                  In 2022, our founders experienced firsthand the chaos of managing university events with disconnected tools, endless email chains, and manual processes. Students couldn't find events, organizers struggled to coordinate vendors, and administrators had no visibility into what was happening.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden border border-border">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU3MTYwMTc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Business meeting"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-xl overflow-hidden border border-border md:order-first">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1712971404080-87271ce2e473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMG1hbmFnZW1lbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc1NzIzNDc4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Event management solution"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">The Solution We Built</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We created EventHub - a unified platform where every role has its own specialized dashboard, but everyone stays connected. From the first line of code to today's advanced analytics and AI-powered recommendations, we've built something truly special.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Our Values</Badge>
            <h2 className="text-4xl font-bold">What Drives Us Every Day</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "User-Centric Design",
                description: "Every feature we build starts with understanding our users' real needs and pain points.",
                color: "text-blue-500"
              },
              {
                icon: Heart,
                title: "Passion for Events",
                description: "We love events as much as you do. That passion drives us to create tools that make events amazing.",
                color: "text-red-500"
              },
              {
                icon: Globe,
                title: "Inclusive Innovation",
                description: "We build for everyone - from small community gatherings to large corporate conferences.",
                color: "text-green-500"
              },
              {
                icon: Award,
                title: "Excellence",
                description: "We don't just aim to meet expectations - we strive to exceed them in everything we do.",
                color: "text-purple-500"
              },
              {
                icon: Lightbulb,
                title: "Continuous Learning",
                description: "The event industry evolves constantly, and so do we. We're always learning and improving.",
                color: "text-yellow-500"
              },
              {
                icon: Target,
                title: "Results-Driven",
                description: "Success is measured by your success. Every feature is designed to deliver real value.",
                color: "text-indigo-500"
              }
            ].map((value, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className={`h-12 w-12 rounded-lg bg-muted flex items-center justify-center ${value.color}`}>
                      <value.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
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
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">By The Numbers</Badge>
            <h2 className="text-4xl font-bold">EventHub Today</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: "50K+",
                label: "Events Managed",
                description: "Successfully organized through our platform"
              },
              {
                number: "100K+",
                label: "Active Users",
                description: "Across all five user roles worldwide"
              },
              {
                number: "500+",
                label: "Organizations",
                description: "Trust EventHub for their event management"
              },
              {
                number: "99.9%",
                label: "Uptime",
                description: "Reliable platform you can count on"
              }
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl font-bold text-primary">{stat.number}</div>
                <div className="font-semibold">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
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
                onClick={() => onNavigate('signup')}
              >
                Start Your Journey
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={() => onNavigate('landing')}
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
                <button onClick={() => onNavigate('about')}>About</button>
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