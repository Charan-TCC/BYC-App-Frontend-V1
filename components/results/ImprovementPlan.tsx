"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Lightbulb, Lock, ArrowRight } from "lucide-react";
import { ImprovementArea } from "@/types/assessment";

interface ImprovementPlanProps {
    areas: ImprovementArea[];
}

export function ImprovementPlan({ areas }: ImprovementPlanProps) {
    if (areas.length === 0) {
        return (
            <Card className="border-accent/30 bg-accent/5">
                <CardContent className="py-6 text-center">
                    <span className="text-3xl mb-2 block">🎉</span>
                    <p className="text-lg font-medium text-accent">Excellent Performance!</p>
                    <p className="text-sm text-muted-foreground">No major improvement areas identified.</p>
                </CardContent>
            </Card>
        );
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical':
                return 'bg-red-100 text-red-700 border-red-300';
            case 'high':
                return 'bg-orange-100 text-orange-700 border-orange-300';
            case 'medium':
                return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'critical':
                return '🔴';
            case 'high':
                return '🟠';
            case 'medium':
                return '🟡';
            default:
                return '⚪';
        }
    };

    return (
        <Card className="border-warning/30">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Lightbulb className="w-5 h-5 text-warning" />
                    Personalized Improvement Plan
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Focus on these areas to unlock more career opportunities
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                {areas.map((area, index) => (
                    <div
                        key={index}
                        className="p-4 rounded-lg border bg-card"
                    >
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2">
                                <span>{getPriorityIcon(area.priority)}</span>
                                <h4 className="font-semibold">{area.area}</h4>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(area.priority)}`}>
                                {area.priority.charAt(0).toUpperCase() + area.priority.slice(1)}
                            </span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">
                            {area.recommendation}
                        </p>

                        {area.unlockedRoles.length > 0 && (
                            <div className="bg-muted/50 rounded-lg p-3">
                                <div className="flex items-center gap-2 text-sm font-medium mb-2">
                                    <Lock className="w-4 h-4 text-primary" />
                                    <span>Roles unlocked after improvement:</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {area.unlockedRoles.slice(0, 4).map((role, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                                        >
                                            {role}
                                        </span>
                                    ))}
                                    {area.unlockedRoles.length > 4 && (
                                        <span className="px-2 py-1 text-xs text-muted-foreground">
                                            +{area.unlockedRoles.length - 4} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
