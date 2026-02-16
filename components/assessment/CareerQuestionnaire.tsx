"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ClipboardList, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { QuestionnaireResponse, StreamScores } from "@/types/assessment";
import { CAREER_QUESTIONNAIRE, calculateStreamScores, getTopStream } from "@/lib/questionnaire";

interface CareerQuestionnaireProps {
    initialData?: QuestionnaireResponse;
    onChange: (data: QuestionnaireResponse) => void;
    onComplete?: () => void;
    onBack?: () => void;
}

export function CareerQuestionnaire({
    initialData,
    onChange,
    onComplete,
    onBack,
}: CareerQuestionnaireProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>(
        initialData?.answers || {}
    );

    const question = CAREER_QUESTIONNAIRE[currentQuestion];
    const totalQuestions = CAREER_QUESTIONNAIRE.length;
    const answeredCount = Object.keys(answers).length;
    const progress = (answeredCount / totalQuestions) * 100;
    const isComplete = answeredCount === totalQuestions;

    const handleSelectAnswer = (optionIndex: number) => {
        const newAnswers = {
            ...answers,
            [question.id]: optionIndex,
        };
        setAnswers(newAnswers);

        const streamScores = calculateStreamScores(newAnswers);
        onChange({
            answers: newAnswers,
            streamScores,
        });

        // Auto-advance to next question after selection
        if (currentQuestion < totalQuestions - 1) {
            setTimeout(() => {
                setCurrentQuestion(prev => prev + 1);
            }, 300);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        } else {
            onBack?.();
        }
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const handleComplete = () => {
        const streamScores = calculateStreamScores(answers);
        onChange({
            answers,
            streamScores,
            completedAt: new Date().toISOString(),
        });
        onComplete?.();
    };

    const streamScores = calculateStreamScores(answers);
    const topStream = isComplete ? getTopStream(streamScores) : null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <Card className="border-warning/20">
                <CardHeader>
                    <div className="flex items-center gap-2 text-warning mb-2">
                        <ClipboardList className="w-5 h-5" />
                        <span className="text-sm font-medium uppercase tracking-wide">
                            Career Questionnaire
                        </span>
                    </div>
                    <CardTitle className="text-xl">Discover Your Ideal Role</CardTitle>
                    <CardDescription>
                        Answer 8 questions about your preferences to get personalized role recommendations.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                            Question {currentQuestion + 1} of {totalQuestions}
                        </span>
                        <span className="text-muted-foreground">
                            {answeredCount} answered
                        </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </CardContent>
            </Card>

            {/* Question Card */}
            <Card className="border-2 border-primary/30">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            Question {question.id}
                        </span>
                    </div>
                    <CardTitle className="text-xl leading-relaxed">
                        {question.question}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelectAnswer(index)}
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 hover:scale-[1.01] ${answers[question.id] === index
                                    ? "border-primary bg-primary/10"
                                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                                }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${answers[question.id] === index
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                }`}>
                                {String.fromCharCode(65 + index)}
                            </div>
                            <span className="font-medium">{option.text}</span>
                            {answers[question.id] === index && (
                                <Check className="w-5 h-5 text-primary ml-auto" />
                            )}
                        </button>
                    ))}
                </CardContent>
            </Card>

            {/* Question Navigator */}
            <div className="flex flex-wrap justify-center gap-2">
                {CAREER_QUESTIONNAIRE.map((q, index) => (
                    <button
                        key={q.id}
                        onClick={() => setCurrentQuestion(index)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${currentQuestion === index
                                ? "bg-primary text-primary-foreground"
                                : answers[q.id] !== undefined
                                    ? "bg-accent/20 text-accent border border-accent/30"
                                    : "bg-muted hover:bg-muted/80"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
                <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {currentQuestion === 0 ? 'Back' : 'Previous'}
                </Button>

                {currentQuestion < totalQuestions - 1 ? (
                    <Button
                        onClick={handleNext}
                        className="gap-2"
                        disabled={answers[question.id] === undefined}
                    >
                        Next
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                ) : (
                    <Button
                        onClick={handleComplete}
                        className="gap-2"
                        disabled={!isComplete}
                    >
                        Get Role Recommendations
                        <Check className="w-4 h-4" />
                    </Button>
                )}
            </div>

            {/* Completion Summary */}
            {isComplete && topStream && (
                <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/30">
                    <CardContent className="py-4">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-1">
                                Your primary career alignment:
                            </p>
                            <p className="text-xl font-bold text-primary">
                                {topStream}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
