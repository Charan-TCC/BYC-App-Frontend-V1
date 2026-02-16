"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Code2, Database, Zap, Edit2, Check } from "lucide-react";
import { ProjectScores, PROJECT_WEIGHTS } from "@/types/assessment";
import { calculateProjectScore } from "@/lib/grading";

interface ProjectEvaluationProps {
    initialData?: ProjectScores;
    onChange: (data: ProjectScores) => void;
    onSubmit?: () => void;
    editable?: boolean;
}

interface ProjectConfig {
    id: keyof typeof PROJECT_WEIGHTS;
    label: string;
    description: string;
    icon: React.ElementType;
    weight: number;
    color: string;
}

const PROJECTS: ProjectConfig[] = [
    {
        id: 'sqlAnalytics',
        label: 'SQL Analytics Project',
        description: 'Query optimization, window functions, and data analysis',
        icon: Database,
        weight: 30,
        color: 'text-blue-600',
    },
    {
        id: 'pythonDataCleaning',
        label: 'Python Data Cleaning & Visualization',
        description: 'Pandas, NumPy, data processing, and visualization',
        icon: Code2,
        weight: 30,
        color: 'text-green-600',
    },
    {
        id: 'dataPipeline',
        label: 'Data Pipeline Implementation',
        description: 'ETL process, data pipeline design, and orchestration',
        icon: Zap,
        weight: 40,
        color: 'text-purple-600',
    },
];

export function ProjectEvaluation({
    initialData,
    onChange,
    onSubmit,
    editable = true,
}: ProjectEvaluationProps) {
    const [scores, setScores] = useState({
        sqlAnalytics: initialData?.sqlAnalytics || 0,
        pythonDataCleaning: initialData?.pythonDataCleaning || 0,
        dataPipeline: initialData?.dataPipeline || 0,
    });
    const [isEditing, setIsEditing] = useState(editable);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const projectScores = calculateProjectScore(
            scores.sqlAnalytics,
            scores.pythonDataCleaning,
            scores.dataPipeline
        );
        onChange(projectScores);
    }, [scores, onChange]);

    const handleScoreChange = (id: string, value: number) => {
        if (!isEditing) return;
        setScores(prev => ({
            ...prev,
            [id]: Math.min(100, Math.max(0, value)),
        }));
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        setIsEditing(false);
        onSubmit?.();
    };

    const handleModify = () => {
        setIsEditing(true);
        setIsSubmitted(false);
    };

    const projectData = calculateProjectScore(
        scores.sqlAnalytics,
        scores.pythonDataCleaning,
        scores.dataPipeline
    );

    return (
        <Card className="border-accent/20">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-accent">
                        <Code2 className="w-5 h-5" />
                        <span className="text-sm font-medium uppercase tracking-wide">
                            Project Evaluation
                        </span>
                    </div>
                    {isSubmitted && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleModify}
                            className="gap-2"
                        >
                            <Edit2 className="w-4 h-4" />
                            Modify
                        </Button>
                    )}
                </div>
                <CardTitle className="text-xl">Foundation Course Projects</CardTitle>
                <CardDescription>
                    Rate your performance on each project. This carries 50% weightage in your final assessment.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Project Sliders */}
                {PROJECTS.map((project) => {
                    const score = scores[project.id as keyof typeof scores];
                    const Icon = project.icon;
                    const contribution = score * (PROJECT_WEIGHTS[project.id as keyof typeof PROJECT_WEIGHTS]);

                    return (
                        <div key={project.id} className="space-y-3 p-4 rounded-lg border border-border bg-card">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-muted ${project.color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <Label className="font-medium">{project.label}</Label>
                                        <p className="text-xs text-muted-foreground">{project.description}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-bold">{score}</span>
                                    <span className="text-sm text-muted-foreground">/100</span>
                                    <p className="text-xs text-muted-foreground">
                                        Weight: {project.weight}%
                                    </p>
                                </div>
                            </div>

                            {/* Slider */}
                            <div className="space-y-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={score}
                                    onChange={(e) => handleScoreChange(project.id, parseInt(e.target.value))}
                                    disabled={!isEditing}
                                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary disabled:opacity-50"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>0</span>
                                    <span>25</span>
                                    <span>50</span>
                                    <span>75</span>
                                    <span>100</span>
                                </div>
                            </div>

                            {/* Contribution Display */}
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-muted-foreground">Contribution:</span>
                                <span className="font-medium">
                                    {score} × {(PROJECT_WEIGHTS[project.id as keyof typeof PROJECT_WEIGHTS] * 100).toFixed(0)}% = {contribution.toFixed(1)}
                                </span>
                            </div>
                        </div>
                    );
                })}

                {/* Total Score Display */}
                <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/30">
                    <CardContent className="py-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-medium">Total Project Score</span>
                            <div className="text-right">
                                <span className="text-2xl font-bold text-primary">
                                    {projectData.totalScore.toFixed(1)}
                                </span>
                                <span className="text-sm text-muted-foreground">/100</span>
                            </div>
                        </div>
                        <Progress value={projectData.totalScore} className="h-3" />
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                            Weighted Average: (SQL × 30%) + (Python × 30%) + (DE × 40%)
                        </p>
                    </CardContent>
                </Card>

                {/* Submit/Confirm Button */}
                {isEditing && !isSubmitted && (
                    <Button
                        onClick={handleSubmit}
                        className="w-full gap-2"
                        size="lg"
                    >
                        <Check className="w-4 h-4" />
                        Confirm Project Scores
                    </Button>
                )}

                {isSubmitted && (
                    <div className="flex items-center justify-center gap-2 text-accent py-2">
                        <Check className="w-5 h-5" />
                        <span className="font-medium">Scores Submitted</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
