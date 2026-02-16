"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import {
    ArrowRight,
    Trophy,
    Sparkles,
    GraduationCap,
    Briefcase,
    Users,
    Rocket,
    BookOpen,
    Clock,
} from "lucide-react";

import { StudentGradeCard } from "@/components/results/StudentGradeCard";
import { ImprovementPlan } from "@/components/results/ImprovementPlan";
import { RoleEligibilityCard } from "@/components/results/RoleEligibilityCard";

import { ProjectScores, AcademicRecord, CoverLetter, QuestionnaireResponse, StudentGrade } from "@/types/assessment";
import { getEligibleRoles, getPotentialRoles, RoleEligibility } from "@/types/roles";
import { calculateStudentGrade } from "@/lib/grading";

interface FinalAssessmentData {
    projectScores: ProjectScores;
    academicRecord: AcademicRecord;
    coverLetter: CoverLetter;
    questionnaire: QuestionnaireResponse;
    studentGrade: StudentGrade;
}

// Default fallback data (for demo/development)
const DEFAULT_ASSESSMENT: FinalAssessmentData = {
    projectScores: {
        sqlAnalytics: 75,
        pythonDataCleaning: 80,
        dataPipeline: 70,
        totalScore: 74.5,
    },
    academicRecord: {
        semesters: [78, 72, 75, 80, 76, 82, 79, 77],
        backlogs: 1,
        averagePercentage: 77.4,
        academicScore: 6.74,
    },
    coverLetter: {
        type: 'written',
        content: 'Sample cover letter...',
        wordCount: 350,
        score: 20,
    },
    questionnaire: {
        answers: {},
        streamScores: {
            dataEngineering: 10,
            aiMl: 6,
            biReporting: 8,
            entryLevel: 4,
        },
    },
    studentGrade: {
        grade: 'B+',
        totalScore: 76.5,
        breakdown: {
            academic: 16.85,
            projects: 37.25,
            coverLetter: 20,
        },
        strengths: [
            'Strong academic foundation',
            'Proficient in Python',
            'Professional communication skills',
        ],
        improvementAreas: [
            {
                area: 'SQL Skills Need Improvement',
                priority: 'high',
                recommendation: 'Practice on LeetCode, HackerRank, SQLZoo. Focus on JOINs, window functions, and optimization',
                unlockedRoles: ['SQL Developer', 'BI Analyst', 'Data Quality Analyst'],
            },
        ],
    },
};

const nextSteps = [
    {
        title: "Complete Training Path",
        description: "8-week intensive program covering essential skills",
        duration: "8 weeks",
        icon: GraduationCap,
    },
    {
        title: "Build Portfolio Projects",
        description: "3 real-world projects to showcase your abilities",
        duration: "4 weeks",
        icon: Briefcase,
    },
    {
        title: "Interview Preparation",
        description: "Mock interviews and company-specific prep",
        duration: "2 weeks",
        icon: Users,
    },
];

export default function ResultsPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [showContent, setShowContent] = useState(false);
    const [assessmentData, setAssessmentData] = useState<FinalAssessmentData | null>(null);
    const [eligibleRoles, setEligibleRoles] = useState<RoleEligibility[]>([]);
    const [potentialRoles, setPotentialRoles] = useState<RoleEligibility[]>([]);

    useEffect(() => {
        // Try to get assessment data from sessionStorage
        const storedData = sessionStorage.getItem('finalAssessment');
        let data: FinalAssessmentData;

        if (storedData) {
            try {
                data = JSON.parse(storedData);
            } catch {
                data = DEFAULT_ASSESSMENT;
            }
        } else {
            data = DEFAULT_ASSESSMENT;
        }

        setAssessmentData(data);

        // Calculate role eligibility based on project scores
        const scores = {
            sql: data.projectScores.sqlAnalytics,
            python: data.projectScores.pythonDataCleaning,
            de: data.projectScores.dataPipeline,
            academic: data.academicRecord.averagePercentage,
        };

        setEligibleRoles(getEligibleRoles(scores));
        setPotentialRoles(getPotentialRoles(scores));

        // Animate in content
        const timer = setTimeout(() => setShowContent(true), 300);
        return () => clearTimeout(timer);
    }, []);

    if (!assessmentData) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Animated background */}
            <div className="fixed inset-0 -z-10 animated-gradient" />
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl float" />
                <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl float" style={{ animationDelay: "-3s" }} />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-primary" />
                            <span className="font-semibold">Your Results</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => router.push("/results/report")}>
                                View Report
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
                                Dashboard
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl transition-all duration-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

                {/* Hero section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        Assessment Complete
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                        Great job, {user?.name?.split(" ")[0] || "there"}! 🎉
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Based on your assessment, here's your personalized career roadmap.
                    </p>
                </div>

                {/* Student Grade Card */}
                <section className="mb-8">
                    <StudentGradeCard grade={assessmentData.studentGrade} />
                </section>

                {/* Improvement Plan */}
                <section className="mb-8">
                    <ImprovementPlan areas={assessmentData.studentGrade.improvementAreas} />
                </section>

                {/* Role Eligibility */}
                <section className="mb-8">
                    <RoleEligibilityCard
                        eligibleRoles={eligibleRoles}
                        potentialRoles={potentialRoles}
                    />
                </section>

                {/* Next steps roadmap */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Rocket className="w-5 h-5 text-primary" />
                            Your Path to Placement
                        </CardTitle>
                        <CardDescription>Complete these steps to become job-ready</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />

                            <div className="space-y-6">
                                {nextSteps.map((step, index) => (
                                    <div key={index} className="flex gap-4 relative">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0 z-10">
                                            <step.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex-1 pb-6">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-semibold">{step.title}</h4>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {step.duration}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* CTA */}
                <div className="text-center">
                    <Button size="lg" className="gap-2 pulse-glow" onClick={() => router.push("/training")}>
                        Begin Your Journey
                        <Sparkles className="w-4 h-4" />
                    </Button>
                </div>
            </main>
        </div>
    );
}
