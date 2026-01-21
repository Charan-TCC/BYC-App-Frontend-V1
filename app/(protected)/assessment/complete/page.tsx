"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import {
    ArrowRight,
    Brain,
    CheckCircle2,
    Code2,
    Home,
    PartyPopper,
    Sparkles,
    Trophy,
    Video,
} from "lucide-react";

export default function AssessmentCompletePage() {
    const router = useRouter();
    const { user } = useAuth();
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        // Hide confetti after animation
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const phases = [
        {
            name: "Aptitude Test",
            icon: Brain,
            score: user?.assessmentProgress?.aptitude?.score || 85,
            color: "text-primary",
        },
        {
            name: "Coding Labs",
            icon: Code2,
            score: user?.assessmentProgress?.coding?.score || 72,
            color: "text-accent",
        },
        {
            name: "Video Interview",
            icon: Video,
            score: null, // No score for video
            color: "text-warning",
        },
    ];

    const overallScore = Math.round(
        phases.filter((p) => p.score !== null).reduce((acc, p) => acc + (p.score || 0), 0) /
        phases.filter((p) => p.score !== null).length
    );

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 -z-10 animated-gradient" />
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl float" />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl float" style={{ animationDelay: "-3s" }} />
            </div>

            {/* Confetti animation */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-fall"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${3 + Math.random() * 2}s`,
                            }}
                        >
                            <div
                                className="w-3 h-3 rounded-sm"
                                style={{
                                    backgroundColor: ["#C9A86C", "#4A7C59", "#8B7355", "#D4A574"][
                                        Math.floor(Math.random() * 4)
                                    ],
                                    transform: `rotate(${Math.random() * 360}deg)`,
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Main content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-2xl">
                {/* Success header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-6 glow float">
                        <Trophy className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                        Assessment Complete! 🎉
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                        Congratulations, {user?.name || "there"}! You&apos;ve successfully completed all phases.
                    </p>
                </div>

                {/* Score card */}
                <Card className="glass border-white/30 mb-8 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16" />

                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-lg text-muted-foreground font-normal">
                            Overall Performance
                        </CardTitle>
                        <div className="text-6xl font-bold text-gradient">{overallScore}%</div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="flex justify-center">
                            <Progress value={overallScore} className="w-48 h-3" />
                        </div>

                        <Separator />

                        {/* Phase breakdown */}
                        <div className="space-y-4">
                            {phases.map((phase, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-muted`}>
                                            <phase.icon className={`w-4 h-4 ${phase.color}`} />
                                        </div>
                                        <span className="font-medium">{phase.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {phase.score !== null ? (
                                            <span className="font-semibold">{phase.score}%</span>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">Reviewed</span>
                                        )}
                                        <CheckCircle2 className="w-5 h-5 text-accent" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Next steps */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" />
                            What Happens Next
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                                1
                            </div>
                            <div>
                                <p className="font-medium">Results Processing</p>
                                <p className="text-sm text-muted-foreground">
                                    Our AI is analyzing your responses (typically 24-48 hours)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                                2
                            </div>
                            <div>
                                <p className="font-medium">Role Recommendation</p>
                                <p className="text-sm text-muted-foreground">
                                    You&apos;ll receive personalized role suggestions based on your strengths
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                                3
                            </div>
                            <div>
                                <p className="font-medium">Training Path</p>
                                <p className="text-sm text-muted-foreground">
                                    Access your customized learning pathway to prepare for your recommended role
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        variant="outline"
                        onClick={() => router.push("/dashboard")}
                        className="gap-2"
                    >
                        <Home className="w-4 h-4" />
                        Go to Dashboard
                    </Button>
                    <Button
                        onClick={() => router.push("/results")}
                        className="gap-2 pulse-glow"
                    >
                        View Detailed Results
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </main>

            {/* CSS for confetti animation */}
            <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
        </div>
    );
}
