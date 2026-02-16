"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Upload, Pencil, Check, FileUp, X } from "lucide-react";
import { CoverLetter, CoverLetterType } from "@/types/assessment";

interface CoverLetterSectionProps {
    initialData?: CoverLetter;
    onChange: (data: CoverLetter) => void;
}

export function CoverLetterSection({ initialData, onChange }: CoverLetterSectionProps) {
    const [mode, setMode] = useState<CoverLetterType>(initialData?.type || 'none');
    const [content, setContent] = useState(initialData?.content || '');
    const [fileName, setFileName] = useState(initialData?.fileName || '');

    const getWordCount = (text: string): number => {
        return text.trim() ? text.trim().split(/\s+/).length : 0;
    };

    const handleModeChange = (newMode: CoverLetterType) => {
        setMode(newMode);
        if (newMode === 'none') {
            onChange({
                type: 'none',
                score: 0,
            });
        } else if (newMode === 'uploaded' && fileName) {
            onChange({
                type: 'uploaded',
                fileName,
                score: 22,
            });
        } else if (newMode === 'written') {
            onChange({
                type: 'written',
                content,
                wordCount: getWordCount(content),
                score: calculateWrittenScore(getWordCount(content)),
            });
        }
    };

    const handleContentChange = (value: string) => {
        setContent(value);
        const wordCount = getWordCount(value);
        onChange({
            type: 'written',
            content: value,
            wordCount,
            score: calculateWrittenScore(wordCount),
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload a PDF or Word document');
                return;
            }
            setFileName(file.name);
            onChange({
                type: 'uploaded',
                fileName: file.name,
                score: 22,
            });
        }
    };

    const calculateWrittenScore = (wordCount: number): number => {
        if (wordCount >= 500) return 25;
        if (wordCount >= 300) return 20;
        if (wordCount >= 200) return 15;
        if (wordCount >= 100) return 10;
        if (wordCount > 0) return 5;
        return 0;
    };

    const wordCount = getWordCount(content);
    const currentScore = mode === 'written' ? calculateWrittenScore(wordCount) :
        mode === 'uploaded' ? 22 : 0;

    return (
        <Card className="border-secondary/20">
            <CardHeader>
                <div className="flex items-center gap-2 text-secondary mb-2">
                    <FileText className="w-5 h-5" />
                    <span className="text-sm font-medium uppercase tracking-wide">
                        Cover Letter
                    </span>
                </div>
                <CardTitle className="text-xl">Professional Statement</CardTitle>
                <CardDescription>
                    Upload your cover letter or write directly. A strong cover letter showcases your motivation and goals.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Mode Selection */}
                <div className="flex flex-wrap gap-3">
                    <Button
                        type="button"
                        variant={mode === 'uploaded' ? 'default' : 'outline'}
                        onClick={() => handleModeChange('uploaded')}
                        className="gap-2"
                    >
                        <Upload className="w-4 h-4" />
                        Upload File
                    </Button>
                    <Button
                        type="button"
                        variant={mode === 'written' ? 'default' : 'outline'}
                        onClick={() => handleModeChange('written')}
                        className="gap-2"
                    >
                        <Pencil className="w-4 h-4" />
                        Write Directly
                    </Button>
                    {mode !== 'none' && (
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => handleModeChange('none')}
                            className="gap-2 text-muted-foreground"
                        >
                            <X className="w-4 h-4" />
                            Skip
                        </Button>
                    )}
                </div>

                {/* Upload Section */}
                {mode === 'uploaded' && (
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                            <input
                                type="file"
                                id="cover-letter-upload"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            <label
                                htmlFor="cover-letter-upload"
                                className="cursor-pointer flex flex-col items-center gap-2"
                            >
                                <FileUp className="w-10 h-10 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    Click to upload PDF or Word document
                                </span>
                            </label>
                        </div>

                        {fileName && (
                            <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/30">
                                <Check className="w-5 h-5 text-accent" />
                                <span className="text-sm font-medium">{fileName}</span>
                                <span className="text-xs text-muted-foreground ml-auto">Uploaded</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Write Section */}
                {mode === 'written' && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="cover-letter-text">Your Cover Letter</Label>
                            <span className={`text-sm ${wordCount >= 300 ? 'text-accent' : wordCount >= 100 ? 'text-primary' : 'text-muted-foreground'}`}>
                                {wordCount} words
                            </span>
                        </div>
                        <Textarea
                            id="cover-letter-text"
                            placeholder="Write about your career goals, motivation for this career path, relevant experiences, and what makes you a good candidate..."
                            value={content}
                            onChange={(e) => handleContentChange(e.target.value)}
                            rows={10}
                            className="resize-none"
                        />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Recommended: 300-500 words</span>
                            <span className="flex items-center gap-2">
                                Score: <strong className="text-foreground">{currentScore}/25</strong>
                            </span>
                        </div>
                    </div>
                )}

                {/* Score Indicator */}
                {mode !== 'none' && (
                    <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Cover Letter Score</span>
                            <span className="text-lg font-bold text-primary">{currentScore}/25</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${(currentScore / 25) * 100}%` }}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            {wordCount < 100 && mode === 'written' && "Write at least 100 words to improve your score"}
                            {wordCount >= 100 && wordCount < 300 && mode === 'written' && "Good start! Add more details to reach 300 words for a better score"}
                            {wordCount >= 300 && wordCount < 500 && mode === 'written' && "Great! You're in the optimal range"}
                            {wordCount >= 500 && mode === 'written' && "Excellent! Maximum score achieved"}
                            {mode === 'uploaded' && "File uploaded successfully - good score!"}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
