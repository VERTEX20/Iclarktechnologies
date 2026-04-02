'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Send,
  CheckCircle2,
  HeadphonesIcon,
  MessageSquare,
  Sun,
  Zap,
} from 'lucide-react';

const topicOptions = [
  'Product Recommendation',
  'Installation',
  'System Design',
  'Pricing',
  'Other',
];

const experts = [
  {
    name: 'Dr. Olumide Adeyemi',
    specialty: 'Solar System Design',
    rating: 4.9,
    experience: '12 years',
    consultations: 450,
    icon: Zap,
  },
  {
    name: 'Eng. Chioma Okafor',
    specialty: 'Installation & Maintenance',
    rating: 4.8,
    experience: '8 years',
    consultations: 320,
    icon: Sun,
  },
  {
    name: 'Mr. Ibrahim Musa',
    specialty: 'Product Recommendations',
    rating: 4.7,
    experience: '10 years',
    consultations: 280,
    icon: HeadphonesIcon,
  },
];

export default function ConsultationPage() {
  const { addConsultation } = useAppStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.topic || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    addConsultation({
      id: `c-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      topic: formData.topic,
      message: formData.message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    setSubmitted(true);
    toast.success('Consultation request submitted successfully!');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <MessageSquare className="size-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">
            Talk to Our <span className="text-primary">Solar Experts</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Get personalized advice on solar panels, batteries, inverters, and complete system design.
            Our experts are ready to help you make the right choice.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              Response within 24 hours
            </span>
            <span className="flex items-center gap-2">
              <Phone className="size-4 text-primary" />
              +234 801 234 5678
            </span>
            <span className="flex items-center gap-2">
              <Mail className="size-4 text-primary" />
              info@iclarke.com
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <Card className="border-green-200 bg-green-50/50">
                <CardContent className="flex flex-col items-center py-12 text-center">
                  <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="size-8 text-green-600" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-green-800">Request Submitted!</h2>
                  <p className="max-w-md text-muted-foreground">
                    Thank you, {formData.name}! Our expert team will review your request and get back to you
                    within 24 hours. Check your email at {formData.email} for confirmation.
                  </p>
                  <Button
                    className="mt-6"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', topic: '', message: '' });
                    }}
                  >
                    Submit Another Request
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Request a Consultation</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Fill in the form below and our team will get back to you.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+234 800 000 0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="topic">Topic *</Label>
                        <Select
                          value={formData.topic}
                          onValueChange={(val) => setFormData({ ...formData, topic: val })}
                        >
                          <SelectTrigger id="topic">
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                          <SelectContent>
                            {topicOptions.map((topic) => (
                              <SelectItem key={topic} value={topic}>
                                {topic}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Describe your needs, questions, or project details..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <Button type="submit" className="w-full gap-2 sm:w-auto">
                      <Send className="size-4" />
                      Request Consultation
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-6 lg:col-span-2">
            {/* Expert Profiles */}
            <Card>
              <CardHeader>
                <CardTitle>Our Solar Experts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experts.map((expert, idx) => (
                  <div key={idx}>
                    <div className="flex items-start gap-3">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <expert.icon className="size-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold">{expert.name}</h4>
                        <p className="text-sm text-muted-foreground">{expert.specialty}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="size-3 text-yellow-500" /> {expert.rating}
                          </span>
                          <span>{expert.experience}</span>
                          <span>{expert.consultations} consultations</span>
                        </div>
                      </div>
                    </div>
                    {idx < experts.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-5">
                <h3 className="mb-4 font-semibold">Other Ways to Reach Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                      <Phone className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+234 801 234 5678</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">info@iclarke.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Office</p>
                      <p className="text-muted-foreground">Lagos, Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-muted-foreground">Mon - Fri: 9AM - 6PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
