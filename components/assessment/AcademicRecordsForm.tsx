"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, AlertTriangle, Calculator, TrendingUp } from "lucide-react";
import { AcademicRecord } from "@/types/assessment";
import { calculateAcademicScore } from "@/lib/grading";

interface AcademicRecordsFormProps {
    initialData?: AcademicRecord;
    onChange: (data: AcademicRecord) => void;
}

export function AcademicRecordsForm({ initialData, onChange }: AcademicRecordsFormProps) {
    const [semesters, setSemesters] = useState<number[]>(
        initialData?.semesters || Array(8).fill(0)
    );
    const [backlogs, setBacklogs] = useState(initialData?.backlogs || 0);

    // Calculate and notify parent on changes
    useEffect(() => {
        const record = calculateAcademicScore(semesters, backlogs);
        onChange(record);
    }, [semesters, backlogs, onChange]);

    const handleSemesterChange = (index: number, value: string) => {
        const numValue = Math.min(100, Math.max(0, parseFloat(value) || 0));
        const newSemesters = [...semesters];
        newSemesters[index] = numValue;
        setSemesters(newSemesters);
    };

    const handleBacklogsChange = (value: string) => {
        const numValue = Math.max(0, parseInt(value) || 0);
        setBacklogs(numValue);
    };

    // Calculate current scores for display
    const academicRecord = calculateAcademicScore(semesters, backlogs);

    return (
        <Card className="border-primary/20">
            <CardHeader>
                <div className="flex items-center gap-2 text-primary mb-2">
                    <GraduationCap className="w-5 h-5" />
                    <span className="text-sm font-medium uppercase tracking-wide">
                        Academic Records
                    </span>
                </div>
                <CardTitle className="text-xl">Semester Marks & Backlogs</CardTitle>
                <CardDescription>
                    Enter your percentage marks for each semester. This carries 10% weightage with 1% reduction per backlog.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Semester Inputs - 2x4 Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {semesters.map((value, index) => (
                        <div key={index} className="space-y-2">
                            <Label htmlFor={`sem-${index}`} className="text-sm text-muted-foreground">
                                Semester {index + 1}
                            </Label>
                            <div className="relative">
                                <Input
                                    id={`sem-${index}`}
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    value={value || ""}
                                    onChange={(e) => handleSemesterChange(index, e.target.value)}
                                    placeholder="0"
                                    className="pr-8"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                    %
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Backlogs Input */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-warning/10 border border-warning/30">
                    <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
                    <div className="flex-1">
                        <Label htmlFor="backlogs" className="text-sm font-medium">
                            Number of Backlogs
                        </Label>
                        <p className="text-xs text-muted-foreground">
                            Each backlog reduces your academic score by 1%
                        </p>
                    </div>
                    <Input
                        id="backlogs"
                        type="number"
                        min="0"
                        value={backlogs || ""}
                        onChange={(e) => handleBacklogsChange(e.target.value)}
                        placeholder="0"
                        className="w-20"
                    />
                </div>

                {/* Score Calculation Display */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Average Percentage */}
                    <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200">
                        <CardContent className="py-4 text-center">
                            <TrendingUp className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-blue-700">
                                {academicRecord.averagePercentage.toFixed(1)}%
                            </p>
                            <p className="text-xs text-blue-600">Average Percentage</p>
                        </CardContent>
                    </Card>

                    {/* Base Academic Score */}
                    <Card className="bg-green-50 dark:bg-green-950/30 border-green-200">
                        <CardContent className="py-4 text-center">
                            <Calculator className="w-5 h-5 text-green-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-green-700">
                                {(academicRecord.averagePercentage / 10).toFixed(1)}
                            </p>
                            <p className="text-xs text-green-600">Base Score (Avg ÷ 10)</p>
                        </CardContent>
                    </Card>

                    {/* Final Academic Score */}
                    <Card className={`border-2 ${backlogs > 0 ? 'bg-orange-50 dark:bg-orange-950/30 border-orange-300' : 'bg-primary/5 border-primary/30'}`}>
                        <CardContent className="py-4 text-center">
                            <GraduationCap className={`w-5 h-5 mx-auto mb-2 ${backlogs > 0 ? 'text-orange-600' : 'text-primary'}`} />
                            <p className={`text-2xl font-bold ${backlogs > 0 ? 'text-orange-700' : 'text-primary'}`}>
                                {academicRecord.academicScore.toFixed(1)}
                            </p>
                            <p className={`text-xs ${backlogs > 0 ? 'text-orange-600' : 'text-primary'}`}>
                                Final Score {backlogs > 0 ? `(-${backlogs} backlogs)` : ''}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Formula Explanation */}
                <div className="text-center text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    <span className="font-mono">
                        Academic Score = (Average% ÷ 10) - Backlogs =
                        ({academicRecord.averagePercentage.toFixed(1)} ÷ 10) - {backlogs} =
                        <strong className="text-foreground ml-1">{academicRecord.academicScore.toFixed(1)}</strong>
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
