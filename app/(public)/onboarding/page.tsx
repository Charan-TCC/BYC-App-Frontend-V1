"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth-context";
import {
    ArrowLeft,
    ArrowRight,
    Briefcase,
    Check,
    Code2,
    Database,
    GraduationCap,
    Rocket,
    Sparkles,
    User,
    Zap,
} from "lucide-react";

const TOTAL_STEPS = 4;

// Role options for selection
const roleOptions = [
    {
        id: "data-engineer",
        name: "Data Engineer",
        description: "Build data pipelines and infrastructure",
        icon: Database,
    },
    {
        id: "etl-developer",
        name: "ETL Developer",
        description: "Extract, transform, and load data systems",
        icon: Zap,
    },
    {
        id: "database-developer",
        name: "Database Developer",
        description: "Design and optimize database solutions",
        icon: Code2,
    },
    {
        id: "data-quality",
        name: "Data Quality Analyst",
        description: "Ensure data accuracy and integrity",
        icon: Check,
    },
    {
        id: "cloud-data",
        name: "Cloud Data Associate",
        description: "Manage cloud-based data solutions",
        icon: Sparkles,
    },
];

// Education options
const educationOptions = [
    "Currently in college",
    "Recent graduate (0-1 years)",
    "Early career (1-3 years)",
    "Experienced (3+ years)",
];

export default function OnboardingPage() {
    const router = useRouter();
    const { updateProgress } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: "",
        education: "",
        interestedRoles: [] as string[],
    });

    const progress = (step / TOTAL_STEPS) * 100;

    const handleNext = () => {
        if (step < TOTAL_STEPS) {
            setStep(step + 1);
        } else {
            // Save onboarding data and proceed to dashboard
            updateProgress({
                name: formData.fullName,
                assessmentProgress: {
                    currentPhase: "not-started",
                    overallProgress: 0,
                },
            });
            router.push("/dashboard");
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const toggleRole = (roleId: string) => {
        setFormData((prev) => ({
            ...prev,
            interestedRoles: prev.interestedRoles.includes(roleId)
                ? prev.interestedRoles.filter((r) => r !== roleId)
                : [...prev.interestedRoles, roleId],
        }));
    };

    const canProceed = () => {
        switch (step) {
            case 1:
                return true; // Welcome step, always can proceed
            case 2:
                return formData.fullName.trim().length >= 2;
            case 3:
                return formData.education !== "";
            case 4:
                return formData.interestedRoles.length > 0;
            default:
                return true;
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden animated-gradient">
            {/* Background decoration with floating elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/15 rounded-full blur-3xl float" />
                <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl float" style={{ animationDelay: '-3s' }} />
            </div>
            <div className="absolute inset-0 -z-10 dot-pattern opacity-20" />

            {/* Progress indicator */}
            <div className="w-full max-w-md mb-6">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Step {step} of {TOTAL_STEPS}</span>
                    <span>{Math.round(progress)}% complete</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            {/* Main card with glass effect */}
            <Card className="w-full max-w-md glass border-white/30 shadow-2xl">
                {/* Step 1: Welcome */}
                {step === 1 && (
                    <>
                        <CardHeader className="text-center pb-4">
                            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg shadow-primary/30 float">
                                <Rocket className="w-8 h-8 text-white" />
                            </div>
                            <CardTitle className="text-2xl sm:text-3xl font-bold">
                                Welcome to BYC!
                            </CardTitle>
                            <CardDescription className="text-base mt-2">
                                Let&apos;s set up your profile in just a few steps. This helps us personalize your diagnostic experience.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-3 text-left">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                    <User className="w-5 h-5 text-primary" />
                                    <span className="text-sm">Tell us about yourself</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                    <GraduationCap className="w-5 h-5 text-primary" />
                                    <span className="text-sm">Share your background</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                    <Briefcase className="w-5 h-5 text-primary" />
                                    <span className="text-sm">Choose your interests</span>
                                </div>
                            </div>
                        </CardContent>
                    </>
                )}

                {/* Step 2: Name */}
                {step === 2 && (
                    <>
                        <CardHeader className="text-center pb-4">
                            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                <User className="w-8 h-8 text-primary" />
                            </div>
                            <CardTitle className="text-2xl font-bold">
                                What&apos;s your name?
                            </CardTitle>
                            <CardDescription className="text-base mt-2">
                                We&apos;ll use this to personalize your experience
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                                    }
                                    className="h-12 text-base"
                                    autoFocus
                                />
                            </div>
                        </CardContent>
                    </>
                )}

                {/* Step 3: Education/Experience */}
                {step === 3 && (
                    <>
                        <CardHeader className="text-center pb-4">
                            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                <GraduationCap className="w-8 h-8 text-primary" />
                            </div>
                            <CardTitle className="text-2xl font-bold">
                                Where are you in your journey?
                            </CardTitle>
                            <CardDescription className="text-base mt-2">
                                This helps us tailor the assessment difficulty
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {educationOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() =>
                                        setFormData((prev) => ({ ...prev, education: option }))
                                    }
                                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${formData.education === option
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                                        }`}
                                >
                                    <span className="font-medium">{option}</span>
                                </button>
                            ))}
                        </CardContent>
                    </>
                )}

                {/* Step 4: Role Interests */}
                {step === 4 && (
                    <>
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                                <Briefcase className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle className="text-xl font-bold">
                                What roles interest you?
                            </CardTitle>
                            <CardDescription className="text-sm mt-1">
                                Select one or more
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 pt-2">
                            {roleOptions.map((role) => {
                                const isSelected = formData.interestedRoles.includes(role.id);
                                return (
                                    <button
                                        key={role.id}
                                        onClick={() => toggleRole(role.id)}
                                        className={`w-full p-3 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${isSelected
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                                            }`}
                                    >
                                        <div
                                            className={`p-1.5 rounded-lg ${isSelected ? "bg-primary/20" : "bg-muted"
                                                }`}
                                        >
                                            <role.icon
                                                className={`w-4 h-4 ${isSelected ? "text-primary" : "text-muted-foreground"
                                                    }`}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm">{role.name}</p>
                                        </div>
                                        {isSelected && (
                                            <Check className="w-4 h-4 text-primary shrink-0" />
                                        )}
                                    </button>
                                );
                            })}
                        </CardContent>
                    </>
                )}

                {/* Navigation buttons */}
                <div className="px-6 pb-6 pt-2 flex gap-3">
                    {step > 1 && (
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            className="flex-1 h-12"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    )}
                    <Button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className={`flex-1 h-12 font-semibold rounded-xl ${step === TOTAL_STEPS ? 'pulse-glow' : ''}`}
                    >
                        {step === TOTAL_STEPS ? (
                            <>
                                Get Started
                                <Sparkles className="w-4 h-4 ml-2" />
                            </>
                        ) : (
                            <>
                                Continue
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </Button>
                </div>
            </Card>

            {/* Skip option for step 1 */}
            {step === 1 && (
                <button
                    onClick={() => router.push("/dashboard")}
                    className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    Skip for now
                </button>
            )}
        </main>
    );
}
