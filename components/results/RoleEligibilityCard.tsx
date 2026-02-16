"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Lock, Briefcase, Target } from "lucide-react";
import { RoleEligibility, ROLE_STREAMS, formatSalaryINR } from "@/types/roles";

interface RoleEligibilityCardProps {
    eligibleRoles: RoleEligibility[];
    potentialRoles: RoleEligibility[];
}

export function RoleEligibilityCard({ eligibleRoles, potentialRoles }: RoleEligibilityCardProps) {
    return (
        <div className="space-y-6">
            {/* Current Eligible Roles */}
            <Card className="border-accent/30 bg-accent/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        Current Eligible Roles
                    </CardTitle>
                    <CardDescription>
                        Based on your current skills, you can apply for these roles
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {eligibleRoles.length === 0 ? (
                        <div className="text-center py-4 text-muted-foreground">
                            <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p>Keep improving your skills to unlock roles</p>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {eligibleRoles.map((result) => {
                                const streamInfo = ROLE_STREAMS[result.role.stream];
                                return (
                                    <div
                                        key={result.role.id}
                                        className="flex items-center justify-between p-3 rounded-lg border border-accent/30 bg-card hover:bg-accent/5 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${streamInfo.bgColor}`}>
                                                <Briefcase className={`w-5 h-5 ${streamInfo.color}`} />
                                            </div>
                                            <div>
                                                <p className="font-medium">{result.role.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {streamInfo.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-accent">
                                                {formatSalaryINR(result.role.salaryRange.min, result.role.salaryRange.max)}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {result.matchScore}% match
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Potential Roles (Locked) */}
            {potentialRoles.length > 0 && (
                <Card className="border-primary/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Lock className="w-5 h-5 text-primary" />
                            Potential Roles After Improvement
                        </CardTitle>
                        <CardDescription>
                            These roles will unlock after you address the improvement areas
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3">
                            {potentialRoles.slice(0, 5).map((result) => {
                                const streamInfo = ROLE_STREAMS[result.role.stream];
                                return (
                                    <div
                                        key={result.role.id}
                                        className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30 opacity-80"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-muted`}>
                                                <Lock className="w-5 h-5 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{result.role.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {streamInfo.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-muted-foreground">
                                                {formatSalaryINR(result.role.salaryRange.min, result.role.salaryRange.max)}
                                            </p>
                                            <p className="text-xs text-destructive">
                                                {result.missingRequirements[0]}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {potentialRoles.length > 5 && (
                            <p className="text-center text-sm text-muted-foreground mt-3">
                                +{potentialRoles.length - 5} more roles available after improvement
                            </p>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
