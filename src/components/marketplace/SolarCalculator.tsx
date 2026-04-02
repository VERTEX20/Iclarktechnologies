'use client';

import { useState, useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/data';
import { toast } from 'sonner';
import {
  Zap,
  Lightbulb,
  Fan,
  Refrigerator,
  Tv,
  AirVent,
  WashingMachine,
  ChevronRight,
  ChevronLeft,
  Calculator,
  Battery,
  Sun,
  TrendingUp,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface Appliance {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  watts: number;
  count: number;
  hoursPerDay: number;
}

const appliances: Appliance[] = [
  { id: 'lights', name: 'Light Bulbs (10x)', icon: Lightbulb, watts: 100, count: 10, hoursPerDay: 8 },
  { id: 'fans', name: 'Ceiling Fans (3x)', icon: Fan, watts: 225, count: 3, hoursPerDay: 12 },
  { id: 'fridge', name: 'Refrigerator', icon: Refrigerator, watts: 150, count: 1, hoursPerDay: 24 },
  { id: 'tv', name: 'Television', icon: Tv, watts: 100, count: 1, hoursPerDay: 6 },
  { id: 'ac', name: 'Air Conditioner', icon: AirVent, watts: 1500, count: 1, hoursPerDay: 8 },
  { id: 'washer', name: 'Washing Machine', icon: WashingMachine, watts: 500, count: 1, hoursPerDay: 1 },
];

const householdSizes = [
  { label: '1-2 rooms (Small)', value: 'small' },
  { label: '3-4 rooms (Medium)', value: 'medium' },
  { label: '5+ rooms (Large)', value: 'large' },
];

export default function SolarCalculator() {
  const { navigate } = useAppStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [monthlyBill, setMonthlyBill] = useState(50000);
  const [householdSize, setHouseholdSize] = useState('medium');
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>(['lights', 'fans', 'fridge', 'tv']);
  const [showResults, setShowResults] = useState(false);

  const toggleAppliance = (id: string) => {
    setSelectedAppliances(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const results = useMemo(() => {
    const selected = appliances.filter(a => selectedAppliances.includes(a.id));
    const totalWattage = selected.reduce((sum, a) => sum + a.watts, 0);
    const totalDailyWh = selected.reduce((sum, a) => sum + a.watts * a.hoursPerDay, 0);
    const totalDailyKwh = totalDailyWh / 1000;

    const systemSizeKw = Math.ceil(totalDailyKwh * 1.3 / 5 * 10) / 10; // 30% buffer, 5 peak sun hours
    const panelWattage = 500;
    const numberOfPanels = Math.ceil((systemSizeKw * 1000) / panelWattage);
    const batteryCapacityKwh = Math.ceil(totalDailyKwh * 1.5 * 10) / 10; // 1.5 days autonomy

    const costPerPanel = 150000;
    const costPerKwhBattery = 150000;
    const inverterCost = systemSizeKw * 80000;
    const installationCost = 200000;

    const panelCost = numberOfPanels * costPerPanel;
    const batteryCost = batteryCapacityKwh * costPerKwhBattery;
    const totalCost = panelCost + batteryCost + inverterCost + installationCost;
    const lowEnd = Math.round(totalCost * 0.85);
    const highEnd = Math.round(totalCost * 1.15);

    const monthlySavings = Math.round(monthlyBill * 0.75);
    const roiYears = Math.round((totalCost / (monthlySavings * 12)) * 10) / 10;

    return {
      totalWattage,
      totalDailyKwh: Math.round(totalDailyKwh * 100) / 100,
      systemSizeKw,
      numberOfPanels,
      batteryCapacityKwh,
      lowEnd,
      highEnd,
      monthlySavings,
      roiYears,
    };
  }, [selectedAppliances, monthlyBill]);

  const handleCalculate = () => {
    setShowResults(true);
  };

  const steps = [
    { step: 1, title: 'Electricity Bill' },
    { step: 2, title: 'Household Size' },
    { step: 3, title: 'Appliances' },
    { step: 4, title: 'Results' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Calculator className="size-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Solar Cost Calculator</h1>
        <p className="mt-2 text-muted-foreground">
          Find out how much you can save with solar energy
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-center gap-2 sm:gap-4">
        {steps.map((s, idx) => (
          <div key={s.step} className="flex items-center gap-2">
            <button
              onClick={() => {
                if (s.step < 4) setCurrentStep(s.step);
                if (s.step === 4 && showResults) setCurrentStep(4);
              }}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                (showResults ? 4 : currentStep) >= s.step
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-current/20 text-xs font-bold">
                {s.step}
              </span>
              <span className="hidden sm:inline">{s.title}</span>
            </button>
            {idx < steps.length - 1 && (
              <ChevronRight className="size-4 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6 sm:p-8">
          {!showResults ? (
            <>
              {/* Step 1: Electricity Bill */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">What is your monthly electricity bill?</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      This helps us estimate your energy consumption
                    </p>
                  </div>
                  <div className="space-y-4 px-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">₦5,000</span>
                      <span className="text-2xl font-bold text-primary">{formatPrice(monthlyBill)}</span>
                      <span className="text-muted-foreground">₦500,000</span>
                    </div>
                    <Slider
                      value={[monthlyBill]}
                      onValueChange={(val) => setMonthlyBill(val[0])}
                      min={5000}
                      max={500000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low usage</span>
                      <span>Average</span>
                      <span>High usage</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Household Size */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">What is your household size?</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Select the option that best describes your home
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {householdSizes.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => setHouseholdSize(size.value)}
                        className={`rounded-xl border-2 p-6 text-center transition-all hover:border-primary/50 ${
                          householdSize === size.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                        }`}
                      >
                        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                          <span className="text-lg">
                            {size.value === 'small' ? '🏠' : size.value === 'medium' ? '🏘️' : '🏢'}
                          </span>
                        </div>
                        <p className="font-medium">{size.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Appliances */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">Which appliances do you use?</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Select all the appliances you want to power with solar
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {appliances.map((app) => {
                      const checked = selectedAppliances.includes(app.id);
                      return (
                        <button
                          key={app.id}
                          onClick={() => toggleAppliance(app.id)}
                          className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all hover:border-primary/50 ${
                            checked ? 'border-primary bg-primary/5' : 'border-border'
                          }`}
                        >
                          <div className={`flex size-10 items-center justify-center rounded-lg ${checked ? 'bg-primary/10' : 'bg-muted'}`}>
                            <app.icon className={`size-5 ${checked ? 'text-primary' : 'text-muted-foreground'}`} />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{app.name}</p>
                            <p className="text-sm text-muted-foreground">{app.watts}W total</p>
                          </div>
                          <Checkbox checked={checked} className="pointer-events-none" />
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Selected load: <span className="font-semibold text-foreground">{results.totalWattage}W</span>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <Separator className="my-6" />
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="gap-2"
                >
                  <ChevronLeft className="size-4" /> Back
                </Button>
                {currentStep < 3 ? (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="gap-2"
                  >
                    Next <ChevronRight className="size-4" />
                  </Button>
                ) : (
                  <Button onClick={handleCalculate} className="gap-2">
                    <Zap className="size-4" /> Calculate
                  </Button>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Results */}
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold">Your Solar System Recommendation</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Based on your inputs, here is our recommendation
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-4 text-center">
                      <Sun className="mx-auto mb-2 size-8 text-primary" />
                      <p className="text-sm text-muted-foreground">Daily Energy Need</p>
                      <p className="text-3xl font-bold text-primary">{results.totalDailyKwh} kWh</p>
                    </CardContent>
                  </Card>
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-4 text-center">
                      <Zap className="mx-auto mb-2 size-8 text-green-600" />
                      <p className="text-sm text-muted-foreground">Recommended System</p>
                      <p className="text-3xl font-bold text-green-600">{results.systemSizeKw} kW</p>
                    </CardContent>
                  </Card>
                  <Card className="border-purple-200 bg-purple-50">
                    <CardContent className="p-4 text-center">
                      <Sun className="mx-auto mb-2 size-8 text-purple-600" />
                      <p className="text-sm text-muted-foreground">Number of Panels</p>
                      <p className="text-3xl font-bold text-purple-600">{results.numberOfPanels}</p>
                      <p className="text-xs text-muted-foreground">500W each</p>
                    </CardContent>
                  </Card>
                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="p-4 text-center">
                      <Battery className="mx-auto mb-2 size-8 text-yellow-600" />
                      <p className="text-sm text-muted-foreground">Battery Capacity</p>
                      <p className="text-3xl font-bold text-yellow-600">{results.batteryCapacityKwh} kWh</p>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                    <div>
                      <p className="font-medium">Estimated Total Cost</p>
                      <p className="text-sm text-muted-foreground">Including panels, battery, inverter & installation</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">{formatPrice(results.lowEnd)} - {formatPrice(results.highEnd)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-green-50 p-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="size-5 text-green-600" />
                      <div>
                        <p className="font-medium">Monthly Savings</p>
                        <p className="text-sm text-muted-foreground">Estimated 75% bill reduction</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-green-600">{formatPrice(results.monthlySavings)}</p>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-blue-50 p-4">
                    <div className="flex items-center gap-3">
                      <Clock className="size-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Return on Investment</p>
                        <p className="text-sm text-muted-foreground">Expected payback period</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-blue-600">{results.roiYears} years</p>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    className="flex-1 gap-2"
                    onClick={() => navigate('consultation')}
                  >
                    Get Custom Quote <ArrowRight className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => {
                      setShowResults(false);
                      setCurrentStep(1);
                    }}
                  >
                    Recalculate
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
