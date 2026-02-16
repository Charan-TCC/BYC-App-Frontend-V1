"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth-context";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    ClipboardList,
} from "lucide-react";

import { AcademicRecordsForm } from "@/components/assessment/AcademicRecordsForm";
import { CoverLetterSection } from "@/components/assessment/CoverLetterSection";
import { ProjectEvaluation } from "@/components/assessment/ProjectEvaluation";
import { CareerQuestionnaire } from "@/components/assessment/CareerQuestionnaire";

import { AcademicRecord, CoverLetter, ProjectScores, QuestionnaireResponse } from "@/types/assessment";
import { calculateStudentGrade } from "@/lib/grading";

type Step = 'projects' | 'academics' | 'coverLetter' | 'questionnaire' | 'results';

const STEPS: { id: Step; label: string }[] = [
    { id: 'projects', label: 'Projects' },
    { id: 'academics', label: 'Academic Records' },
    { id: 'coverLetter', label: 'Cover Letter' },
    { id: 'questionnaire', label: 'Career Questionnaire' },
    { id: 'results', label: 'Results' },
];

export default function FinalAssessmentPage() {
    const router = useRouter();
    const { updateProgress } = useAuth();
    const [currentStep, setCurrentStep] = useState<Step>('projects');
    const [isProjectsSubmitted, setIsProjectsSubmitted] = useState(false);

    // Assessment data
    const [projectScores, setProjectScores] = useState<ProjectScores | null>(null);
    const [academicRecord, setAcademicRecord] = useState<AcademicRecord | null>(null);
    const [coverLetter, setCoverLetter] = useState<CoverLetter | null>(null);
    const [questionnaire, setQuestionnaire] = useState<QuestionnaireResponse | null>(null);

    const currentStepIndex = STEPS.findIndex(s => s.id === currentStep);
    const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

    const handleProjectChange = useCallback((data: ProjectScores) => {
        setProjectScores(data);
    }, []);

    const handleAcademicChange = useCallback((data: AcademicRecord) => {
        setAcademicRecord(data);
    }, []);

    const handleCoverLetterChange = useCallback((data: CoverLetter) => {
        setCoverLetter(data);
    }, []);

    const handleQuestionnaireChange = useCallback((data: QuestionnaireResponse) => {
        setQuestionnaire(data);
    }, []);

    const handleProjectSubmit = () => {
        setIsProjectsSubmitted(true);
    };

    const handleNext = () => {
        const stepOrder: Step[] = ['projects', 'academics', 'coverLetter', 'questionnaire', 'results'];
        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex < stepOrder.length - 1) {
            setCurrentStep(stepOrder[currentIndex + 1]);
        }
    };

    const handleBack = () => {
        const stepOrder: Step[] = ['projects', 'academics', 'coverLetter', 'questionnaire', 'results'];
        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex === 0) {
            router.push('/dashboard');
        } else {
            setCurrentStep(stepOrder[currentIndex - 1]);
        }
    };

    const handleQuestionnaireComplete = () => {
        // Calculate final grade and navigate to results
        if (projectScores && academicRecord && coverLetter) {
            const studentGrade = calculateStudentGrade(academicRecord, projectScores, coverLetter);

            // Update progress in context
            updateProgress({
                assessmentProgress: {
                    currentPhase: 'completed',
                    overallProgress: 100,
                },
            });

            // Store assessment data in sessionStorage for results page
            sessionStorage.setItem('finalAssessment', JSON.stringify({
                projectScores,
                academicRecord,
                coverLetter,
                questionnaire,
                studentGrade,
            }));

            // Navigate to results
            router.push('/results');
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 'projects':
                return isProjectsSubmitted && projectScores && projectScores.totalScore > 0;
            case 'academics':
                return academicRecord && academicRecord.semesters.some(s => s > 0);
            case 'coverLetter':
                return true; // Cover letter is optional
            case 'questionnaire':
                return questionnaire && Object.keys(questionnaire.answers).length === 8;
            default:
                return true;
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            {currentStep === 'projects' ? 'Dashboard' : 'Back'}
                        </Button>
                        <div className="flex items-center gap-2 text-primary">
                            <ClipboardList className="w-5 h-5" />
                            <span className="font-semibold hidden sm:inline">Final Assessment</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Step {currentStepIndex + 1} of {STEPS.length}
                        </div>
                    </div>
                </div>
            </header>

            {/* Progress bar */}
            <div className="border-b border-border bg-card">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="font-medium">{STEPS[currentStepIndex]?.label}</span>
                        <span className="text-muted-foreground">{Math.round(progress)}% complete</span>
                    </div>
                    <Progress value={progress} className="h-2" />

                    {/* Step indicators */}
                    <div className="flex justify-between mt-3">
                        {STEPS.map((step, index) => (
                            <button
                                key={step.id}
                                onClick={() => index < currentStepIndex && setCurrentStep(step.id)}
                                disabled={index > currentStepIndex}
                                className={`flex items-center gap-1 text-xs ${index === currentStepIndex
                                        ? 'text-primary font-medium'
                                        : index < currentStepIndex
                                            ? 'text-accent cursor-pointer'
                                            : 'text-muted-foreground'
                                    }`}
                            >
                                {index < currentStepIndex ? (
                                    <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${index === currentStepIndex ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                        }`}>
                                        {index + 1}
                                    </span>
                                )}
                                <span className="hidden sm:inline">{step.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main content */}
            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-3xl">
                {currentStep === 'projects' && (
                    <ProjectEvaluation
                        initialData={projectScores || undefined}
                        onChange={handleProjectChange}
                        onSubmit={handleProjectSubmit}
                        editable={!isProjectsSubmitted}
                    />
                )}

                {currentStep === 'academics' && (
                    <AcademicRecordsForm
                        initialData={academicRecord || undefined}
                        onChange={handleAcademicChange}
                    />
                )}

                {currentStep === 'coverLetter' && (
                    <CoverLetterSection
                        initialData={coverLetter || undefined}
                        onChange={handleCoverLetterChange}
                    />
                )}

                {currentStep === 'questionnaire' && (
                    <CareerQuestionnaire
                        initialData={questionnaire || undefined}
                        onChange={handleQuestionnaireChange}
                        onComplete={handleQuestionnaireComplete}
                        onBack={handleBack}
                    />
                )}
            </main>

            {/* Navigation footer - not shown for questionnaire (has its own nav) */}
            {currentStep !== 'questionnaire' && (
                <div className="sticky bottom-0 border-t border-border bg-card/95 backdrop-blur-md py-4">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl flex items-center justify-end">
                        <Button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className="gap-2 min-w-[160px]"
                            size="lg"
                        >
                            {currentStep === 'coverLetter' ? 'Continue to Questionnaire' : 'Continue'}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
