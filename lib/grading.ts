// Grading Calculation Library for BYC App
// Implements: 25% Academic + 50% Projects + 25% Cover Letter

import {
    AcademicRecord,
    CoverLetter,
    ProjectScores,
    StudentGrade,
    GradeLetter,
    GradeBreakdown,
    ImprovementArea,
    GRADE_THRESHOLDS,
    SCORE_WEIGHTS,
    PROJECT_WEIGHTS,
} from '@/types/assessment';
import { APPROVED_ROLES, RoleDefinition } from '@/types/roles';

// =============================================================================
// ACADEMIC SCORE CALCULATION
// =============================================================================

/**
 * Calculate academic score from semester marks and backlogs
 * Formula: (averagePercentage / 10) - backlogs
 */
export function calculateAcademicScore(semesters: number[], backlogs: number): AcademicRecord {
    const validSemesters = semesters.filter(s => s > 0);
    const averagePercentage = validSemesters.length > 0
        ? validSemesters.reduce((sum, s) => sum + s, 0) / validSemesters.length
        : 0;

    // Base score is average / 10, then subtract backlogs
    const baseScore = averagePercentage / 10;
    const academicScore = Math.max(0, baseScore - backlogs);

    return {
        semesters,
        backlogs,
        averagePercentage: Math.round(averagePercentage * 10) / 10,
        academicScore: Math.round(academicScore * 10) / 10,
    };
}

// =============================================================================
// PROJECT SCORE CALCULATION
// =============================================================================

/**
 * Calculate weighted project score
 * Weights: SQL 30%, Python 30%, DE 40%
 */
export function calculateProjectScore(
    sqlScore: number,
    pythonScore: number,
    deScore: number
): ProjectScores {
    const totalScore = (
        sqlScore * PROJECT_WEIGHTS.sqlAnalytics +
        pythonScore * PROJECT_WEIGHTS.pythonDataCleaning +
        deScore * PROJECT_WEIGHTS.dataPipeline
    );

    return {
        sqlAnalytics: sqlScore,
        pythonDataCleaning: pythonScore,
        dataPipeline: deScore,
        totalScore: Math.round(totalScore * 10) / 10,
    };
}

// =============================================================================
// COVER LETTER SCORE CALCULATION
// =============================================================================

/**
 * Calculate cover letter score (out of 25)
 * - No cover letter: 0
 * - Uploaded file: 20-25 (based on file size indication)
 * - Written < 100 words: 5
 * - Written 100-200 words: 10
 * - Written 200-300 words: 15
 * - Written 300-500 words: 20
 * - Written 500+ words: 25
 */
export function calculateCoverLetterScore(coverLetter: CoverLetter): number {
    if (coverLetter.type === 'none') {
        return 0;
    }

    if (coverLetter.type === 'uploaded') {
        // Assume uploaded files are substantial
        return 22;
    }

    // Written cover letter - score by word count
    const wordCount = coverLetter.wordCount || 0;

    if (wordCount >= 500) return 25;
    if (wordCount >= 300) return 20;
    if (wordCount >= 200) return 15;
    if (wordCount >= 100) return 10;
    return 5;
}

// =============================================================================
// GRADE LETTER DETERMINATION
// =============================================================================

/**
 * Determine grade letter from total score
 */
export function getGradeLetter(totalScore: number): GradeLetter {
    if (totalScore >= 90) return 'A+';
    if (totalScore >= 85) return 'A';
    if (totalScore >= 80) return 'A-';
    if (totalScore >= 75) return 'B+';
    if (totalScore >= 70) return 'B';
    if (totalScore >= 65) return 'B-';
    if (totalScore >= 60) return 'C+';
    if (totalScore >= 50) return 'C';
    return 'D';
}

/**
 * Get grade color class
 */
export function getGradeColor(grade: GradeLetter): string {
    switch (grade) {
        case 'A+':
        case 'A':
            return 'text-green-600 bg-green-100 border-green-300';
        case 'A-':
        case 'B+':
            return 'text-blue-600 bg-blue-100 border-blue-300';
        case 'B':
        case 'B-':
            return 'text-yellow-600 bg-yellow-100 border-yellow-300';
        case 'C+':
        case 'C':
            return 'text-orange-600 bg-orange-100 border-orange-300';
        case 'D':
            return 'text-red-600 bg-red-100 border-red-300';
    }
}

// =============================================================================
// STRENGTHS IDENTIFICATION
// =============================================================================

/**
 * Identify student strengths based on scores
 */
export function identifyStrengths(
    academicRecord: AcademicRecord,
    projectScores: ProjectScores,
    coverLetter: CoverLetter
): string[] {
    const strengths: string[] = [];

    // Academic strengths
    if (academicRecord.averagePercentage >= 75) {
        strengths.push('Strong academic foundation');
    }
    if (academicRecord.backlogs === 0) {
        strengths.push('Clean academic record (no backlogs)');
    }

    // Project strengths
    if (projectScores.totalScore >= 80) {
        strengths.push('Excellent project execution');
    }
    if (projectScores.sqlAnalytics >= 80) {
        strengths.push('Strong SQL skills');
    }
    if (projectScores.pythonDataCleaning >= 80) {
        strengths.push('Proficient in Python');
    }
    if (projectScores.dataPipeline >= 80) {
        strengths.push('Good data engineering fundamentals');
    }

    // Cover letter strength
    if (coverLetter.type !== 'none' && (coverLetter.wordCount || 0) >= 300) {
        strengths.push('Professional communication skills');
    }

    return strengths;
}

// =============================================================================
// IMPROVEMENT AREAS IDENTIFICATION
// =============================================================================

/**
 * Identify areas for improvement with priorities and unlocked roles
 */
export function identifyImprovementAreas(
    academicRecord: AcademicRecord,
    projectScores: ProjectScores,
    coverLetter: CoverLetter
): ImprovementArea[] {
    const areas: ImprovementArea[] = [];

    // Academic improvements
    if (academicRecord.averagePercentage < 65) {
        areas.push({
            area: 'Low Academic Average',
            priority: 'high',
            recommendation: 'Focus on strengthening core subjects, consider tutoring or study groups',
            unlockedRoles: ['Graduate Programs', 'Top-tier Company Roles'],
        });
    }

    if (academicRecord.backlogs > 3) {
        areas.push({
            area: 'Multiple Backlogs',
            priority: 'critical',
            recommendation: 'Clear backlogs immediately, seek faculty help and extra coaching',
            unlockedRoles: ['Most corporate roles require clear academic record'],
        });
    } else if (academicRecord.backlogs > 0) {
        areas.push({
            area: 'Pending Backlogs',
            priority: 'high',
            recommendation: 'Clear remaining backlogs to improve eligibility',
            unlockedRoles: ['Premium roles at top companies'],
        });
    }

    // SQL improvements
    if (projectScores.sqlAnalytics < 70) {
        const sqlRoles = APPROVED_ROLES
            .filter(r => r.thresholds.sql && r.thresholds.sql >= 70)
            .map(r => r.title);

        areas.push({
            area: 'SQL Skills Need Improvement',
            priority: projectScores.sqlAnalytics < 50 ? 'critical' : 'high',
            recommendation: 'Practice on LeetCode, HackerRank, SQLZoo. Focus on JOINs, window functions, and optimization',
            unlockedRoles: sqlRoles,
        });
    }

    // Python improvements
    if (projectScores.pythonDataCleaning < 70) {
        const pythonRoles = APPROVED_ROLES
            .filter(r => r.thresholds.python && r.thresholds.python >= 70)
            .map(r => r.title);

        areas.push({
            area: 'Python Skills Need Improvement',
            priority: projectScores.pythonDataCleaning < 50 ? 'critical' : 'high',
            recommendation: 'Work through Pandas, NumPy tutorials. Build personal data analysis projects',
            unlockedRoles: pythonRoles,
        });
    }

    // Data Engineering improvements
    if (projectScores.dataPipeline < 70) {
        const deRoles = APPROVED_ROLES
            .filter(r => r.thresholds.de && r.thresholds.de >= 65)
            .map(r => r.title);

        areas.push({
            area: 'Data Engineering Fundamentals',
            priority: projectScores.dataPipeline < 50 ? 'critical' : 'medium',
            recommendation: 'Study ETL/ELT concepts, build data pipelines with Apache Airflow or similar tools',
            unlockedRoles: deRoles,
        });
    }

    // Cover letter improvements
    if (coverLetter.type === 'none') {
        areas.push({
            area: 'Missing Cover Letter',
            priority: 'medium',
            recommendation: 'Write a compelling 300-500 word cover letter highlighting your goals and motivation',
            unlockedRoles: [],
        });
    } else if ((coverLetter.wordCount || 0) < 200) {
        areas.push({
            area: 'Brief Cover Letter',
            priority: 'medium',
            recommendation: 'Expand your cover letter to 300-500 words with specific examples and goals',
            unlockedRoles: [],
        });
    }

    return areas;
}

// =============================================================================
// COMPLETE GRADING CALCULATION
// =============================================================================

/**
 * Calculate complete student grade
 */
export function calculateStudentGrade(
    academicRecord: AcademicRecord,
    projectScores: ProjectScores,
    coverLetter: CoverLetter
): StudentGrade {
    // Calculate component contributions
    // Academic: score out of 10, scaled to 25
    const academicContribution = (academicRecord.academicScore / 10) * 25;

    // Projects: score out of 100, scaled to 50
    const projectContribution = (projectScores.totalScore / 100) * 50;

    // Cover letter: already out of 25
    const coverLetterScore = calculateCoverLetterScore(coverLetter);
    const coverLetterContribution = coverLetterScore;

    // Total score
    const totalScore = academicContribution + projectContribution + coverLetterContribution;
    const roundedTotal = Math.round(totalScore * 10) / 10;

    // Get grade letter
    const grade = getGradeLetter(roundedTotal);

    // Get breakdown
    const breakdown: GradeBreakdown = {
        academic: Math.round(academicContribution * 10) / 10,
        projects: Math.round(projectContribution * 10) / 10,
        coverLetter: coverLetterContribution,
    };

    // Identify strengths and improvement areas
    const strengths = identifyStrengths(academicRecord, projectScores, coverLetter);
    const improvementAreas = identifyImprovementAreas(academicRecord, projectScores, coverLetter);

    return {
        grade,
        totalScore: roundedTotal,
        breakdown,
        strengths,
        improvementAreas,
    };
}

// =============================================================================
// FORMAT HELPERS
// =============================================================================

/**
 * Format INR currency (₹5,00,000 format)
 */
export function formatINR(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Format lakhs (₹5L format)
 */
export function formatLakhs(lakhs: number): string {
    return `₹${lakhs}L`;
}

/**
 * Format salary range in lakhs
 */
export function formatSalaryRange(min: number, max: number): string {
    return `₹${min}L - ₹${max}L`;
}
