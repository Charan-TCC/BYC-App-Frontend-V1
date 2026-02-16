"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth-context";
import {
    ArrowRight,
    BookOpen,
    CheckCircle2,
    Clock,
    LogOut,
    Play,
    Settings,
    Target,
    TrendingUp,
    User,
} from "lucide-react";

export default function DashboardPage() {
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const handleStartAssessment = () => {
        router.push("/assessment/overview");
    };

    const handleStartFinalAssessment = () => {
        router.push("/assessment/final-assessment");
    };

    // Mock recent activity
    const recentActivity = [
        {
            id: 1,
            action: "Account created",
            time: "Just now",
            icon: CheckCircle2,
            color: "text-accent",
        },
        {
            id: 2,
            action: "Profile setup pending",
            time: "Complete to proceed",
            icon: Clock,
            color: "text-warning",
        },
    ];

    // Role paths available (from 15 approved roles)
    const rolePaths = [
        { name: "Junior Data Engineer", match: "Recommended" },
        { name: "Business Intelligence Analyst", match: "Good fit" },
        { name: "Data Scientist (Junior)", match: "Potential" },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold">B</span>
                            </div>
                            <span className="hidden sm:inline text-lg font-semibold">
                                BuildYour<span className="text-primary">.Careers</span>
                            </span>
                        </div>

                        {/* Nav items */}
                        <nav className="flex items-center gap-2 sm:gap-4">
                            <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/results")}>
                                <TrendingUp className="w-4 h-4" />
                                <span className="hidden sm:inline">Results</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/settings")}>
                                <Settings className="w-4 h-4" />
                                <span className="hidden sm:inline">Settings</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLogout}
                                className="gap-2 text-destructive hover:text-destructive"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </Button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Welcome Section */}
                <section className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                        <Avatar className="w-16 h-16 border-2 border-primary">
                            <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                                {user?.name?.charAt(0) || "A"}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold">
                                Welcome back, {user?.name?.split(" ")[0] || "User"}!
                            </h1>
                            <p className="text-muted-foreground">
                                Ready to discover your career path?
                            </p>
                        </div>
                    </div>

                    {/* Overall Progress */}
                    <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                        <CardContent className="py-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium">Your Journey Progress</p>
                                        <p className="text-xs text-muted-foreground">
                                            Complete the diagnostic to get your role recommendation
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 sm:min-w-[200px]">
                                    <Progress value={user?.assessmentProgress?.overallProgress || 0} className="h-2" />
                                    <span className="text-sm font-semibold text-primary min-w-[40px]">
                                        {user?.assessmentProgress?.overallProgress || 0}%
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Action Cards Grid */}
                <section className="grid gap-6 md:grid-cols-2 mb-8">
                    {/* Next Step Card */}
                    <Card className="card-hover border-primary/30 bg-gradient-to-br from-card to-primary/5">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-primary mb-2">
                                <Target className="w-5 h-5" />
                                <span className="text-sm font-medium uppercase tracking-wide">
                                    Next Step
                                </span>
                            </div>
                            <CardTitle className="text-xl">Start Diagnostic Assessment</CardTitle>
                            <CardDescription>
                                Complete a 4-phase evaluation to discover your ideal role fit
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-2 py-1 rounded-full bg-muted text-xs">~45 mins</span>
                                <span className="px-2 py-1 rounded-full bg-muted text-xs">4 phases</span>
                                <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs">Required</span>
                            </div>
                            <Button onClick={handleStartAssessment} className="w-full group">
                                <Play className="w-4 h-4 mr-2" />
                                Begin Assessment
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Role Paths Card */}
                    <Card className="card-hover">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-secondary mb-2">
                                <BookOpen className="w-5 h-5" />
                                <span className="text-sm font-medium uppercase tracking-wide">
                                    Role Paths
                                </span>
                            </div>
                            <CardTitle className="text-xl">Available Specializations</CardTitle>
                            <CardDescription>
                                Roles you could be matched with after assessment
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {rolePaths.map((role) => (
                                    <li
                                        key={role.name}
                                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                    >
                                        <span className="font-medium text-sm">{role.name}</span>
                                        <span className="text-xs text-muted-foreground">{role.match}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-4 text-xs text-muted-foreground">
                                + 12 more roles: ML Engineer, Analytics Engineer, SQL Developer, and more...
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Recent Activity */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                    <Card>
                        <CardContent className="p-0">
                            <ul className="divide-y divide-border">
                                {recentActivity.map((activity) => (
                                    <li
                                        key={activity.id}
                                        className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                                    >
                                        <div className={`p-2 rounded-lg bg-muted ${activity.color}`}>
                                            <activity.icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{activity.action}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </section>
            </main>
        </div>
    );
}
