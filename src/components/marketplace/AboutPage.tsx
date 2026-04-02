'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sun,
  Target,
  Eye,
  Users,
  Package,
  Store,
  ShieldCheck,
  ArrowRight,
  Leaf,
  Zap,
  Award,
} from 'lucide-react';

const teamMembers = [
  {
    name: 'Clark Ibeh',
    role: 'Founder & CEO',
    bio: 'Visionary leader with 15+ years in renewable energy. Passionate about making solar accessible across Nigeria.',
    icon: Sun,
  },
  {
    name: 'Eng. Adaora Nwankwo',
    role: 'Chief Technical Officer',
    bio: 'Electrical engineer specializing in solar system design. Led over 500 installations across West Africa.',
    icon: Zap,
  },
  {
    name: 'Mr. Chinedu Eze',
    role: 'Head of Operations',
    bio: 'Operations expert ensuring smooth logistics and customer experience. 10+ years in supply chain management.',
    icon: ShieldCheck,
  },
  {
    name: 'Ms. Folake Adekunle',
    role: 'Head of Customer Success',
    bio: 'Dedicated to helping customers find the perfect solar solutions. Expert in energy consulting.',
    icon: Leaf,
  },
];

const stats = [
  { label: 'Products Listed', value: '500+', icon: Package },
  { label: 'Verified Vendors', value: '50+', icon: Store },
  { label: 'Happy Customers', value: '10,000+', icon: Users },
  { label: 'Installations', value: '2,500+', icon: Award },
];

export default function AboutPage() {
  const { navigate } = useAppStore();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <Sun className="size-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            About <span className="text-primary">Iclarktechnologies</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Nigeria&apos;s leading solar energy marketplace, connecting you with trusted vendors
            and premium products for a sustainable future.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Our Story</h2>
            <Separator className="my-4 w-16 bg-primary" />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2020, Iclarktechnologies was born from a simple vision: to make clean,
                reliable solar energy accessible to every Nigerian home and business. We recognized
                the challenges people face with unreliable power supply and set out to create a
                trusted marketplace for solar solutions.
              </p>
              <p>
                Today, we connect thousands of customers with verified vendors offering premium solar
                panels, lithium batteries, inverters, and accessories from world-renowned brands like
                SunPower, Jinko Solar, Pylontech, and Deye.
              </p>
              <p>
                Our commitment goes beyond just selling products. We provide expert guidance,
                system design consultation, and ongoing support to ensure every customer achieves
                energy independence.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
              <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
                <Sun className="size-20 text-primary/30" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">Since 2020</p>
                  <p className="text-sm text-muted-foreground">Powering Nigeria&apos;s Future</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-xl bg-primary px-4 py-3 text-primary-foreground shadow-lg">
              <p className="text-2xl font-bold">4+</p>
              <p className="text-xs opacity-80">Years of Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold sm:text-3xl">Our Mission & Vision</h2>
            <p className="mt-2 text-muted-foreground">What drives us every day</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="border-primary/20 bg-background">
              <CardContent className="p-8">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <Target className="size-6 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Our Mission</h3>
                <p className="leading-relaxed text-muted-foreground">
                  To democratize access to solar energy in Nigeria by creating a transparent,
                  trustworthy marketplace that connects consumers with the best products and
                  vendors at competitive prices, supported by expert guidance every step of the way.
                </p>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-background">
              <CardContent className="p-8">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-green-50">
                  <Eye className="size-6 text-green-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Our Vision</h3>
                <p className="leading-relaxed text-muted-foreground">
                  To become Africa&apos;s most trusted solar energy marketplace, empowering millions
                  of homes and businesses with clean, affordable energy and contributing to a
                  sustainable future for the continent.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Meet Our Team</h2>
          <p className="mt-2 text-muted-foreground">The people behind your solar success</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary/10">
                  <member.icon className="size-8 text-primary" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm font-medium text-primary">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-3 size-8 text-primary-foreground/80" />
                <p className="text-3xl font-bold text-primary-foreground sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-6 py-12 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to Go Solar?
            </h2>
            <p className="max-w-lg text-muted-foreground">
              Browse our collection of premium solar products from trusted vendors,
              or talk to our experts for personalized recommendations.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2" onClick={() => navigate('products')}>
                Start Shopping <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('consultation')}
              >
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
