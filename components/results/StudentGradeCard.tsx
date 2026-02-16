"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, BookOpen, FileText } from "lucide-react";
import { StudentGrade, GradeBreakdown, GRADE_THRESHOLDS } from "@/types/assessment";
import { getGradeColor } from "@/lib/grading";

interface StudentGradeCardProps {
    grade: StudentGrade;
}

export function StudentGradeCard({ grade }: StudentGradeCardProps) {
    const gradeInfo = GRADE_THRESHOLDS[grade.grade];
    const gradeColorClass = getGradeColor(grade.grade);

    return (
        <div className="space-y-6">
            {/* Main Grade Card */}
            <Card className={`border-2 ${gradeColorClass.split(' ')[2]} overflow-hidden`}>
                <div className={`h-2 ${gradeColorClass.split(' ')[1].replace('bg-', 'bg-').replace('-100', '-500')}`} />
                <CardHeader className="text-center pb-2">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Award className="w-6 h-6 text-primary" />
                        <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                            Your Assessment Grade
                        </span>
                    </div>
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mx-auto mb-2 border-4 ${gradeColorClass}`}>
                        <span className="text-4xl font-bold">{grade.grade}</span>
                    </div>
                    <CardTitle className="text-2xl">
                        {grade.totalScore.toFixed(0)}/100
                    </CardTitle>
                    <p className="text-muted-foreground">{gradeInfo.label}</p>
                </CardHeader>
            </Card>

            {/* Score Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Academic Score */}
                <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200">
                    <CardContent className="py-4">
                        <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-medium text-blue-700">Academic</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-700 mb-1">
                            {grade.breakdown.academic.toFixed(1)}/25
                        </div>
                        <Progress value={(grade.breakdown.academic / 25) * 100} className="h-2 bg-blue-200" />
                        <p className="text-xs text-blue-600 mt-2">25% weight</p>
                    </CardContent>
                </Card>

                {/* Projects Score */}
                <Card className="bg-green-50 dark:bg-green-950/30 border-green-200">
                    <CardContent className="py-4">
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-green-700">Projects</span>
                        </div>
                        <div className="text-2xl font-bold text-green-700 mb-1">
                            {grade.breakdown.projects.toFixed(1)}/50
                        </div>
                        <Progress value={(grade.breakdown.projects / 50) * 100} className="h-2 bg-green-200" />
                        <p className="text-xs text-green-600 mt-2">50% weight</p>
                    </CardContent>
                </Card>

                {/* Cover Letter Score */}
                <Card className="bg-purple-50 dark:bg-purple-950/30 border-purple-200">
                    <CardContent className="py-4">
                        <div className="flex items-center gap-2 mb-3">
                            <FileText className="w-5 h-5 text-purple-600" />
                            <span className="text-sm font-medium text-purple-700">Cover Letter</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-700 mb-1">
                            {grade.breakdown.coverLetter.toFixed(0)}/25
                        </div>
                        <Progress value={(grade.breakdown.coverLetter / 25) * 100} className="h-2 bg-purple-200" />
                        <p className="text-xs text-purple-600 mt-2">25% weight</p>
                    </CardContent>
                </Card>
            </div>

            {/* Strengths */}
            {grade.strengths.length > 0 && (
                <Card className="border-accent/30 bg-accent/5">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <span className="text-accent">✓</span>
                            Your Strengths
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {grade.strengths.map((strength, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                    <span className="w-2 h-2 bg-accent rounded-full" />
                                    {strength}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
