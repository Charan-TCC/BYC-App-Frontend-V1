// Career Questionnaire Data - 8 Questions
// Each answer influences stream scores for role matching

import { QuestionnaireQuestion, StreamScores } from '@/types/assessment';

export const CAREER_QUESTIONNAIRE: QuestionnaireQuestion[] = [
    {
        id: 1,
        question: "What type of data work excites you the most?",
        options: [
            {
                text: "Analyzing data to find insights and patterns",
                streamWeights: { biReporting: 3, aiMl: 1 },
            },
            {
                text: "Building systems that process and move data",
                streamWeights: { dataEngineering: 3, aiMl: 1 },
            },
            {
                text: "Creating predictive models and algorithms",
                streamWeights: { aiMl: 3, dataEngineering: 1 },
            },
            {
                text: "Creating visualizations and dashboards",
                streamWeights: { biReporting: 3, entryLevel: 1 },
            },
        ],
    },
    {
        id: 2,
        question: "How do you prefer to solve problems?",
        options: [
            {
                text: "Breaking down into smaller technical components",
                streamWeights: { dataEngineering: 2, aiMl: 2 },
            },
            {
                text: "Understanding business context first",
                streamWeights: { biReporting: 3, entryLevel: 1 },
            },
            {
                text: "Experimenting with different approaches",
                streamWeights: { aiMl: 3, dataEngineering: 1 },
            },
            {
                text: "Following established best practices",
                streamWeights: { entryLevel: 2, biReporting: 2 },
            },
        ],
    },
    {
        id: 3,
        question: "Which tools/technologies interest you most?",
        options: [
            {
                text: "SQL, dbt, and data warehousing tools",
                streamWeights: { dataEngineering: 2, biReporting: 2 },
            },
            {
                text: "Python, TensorFlow, PyTorch",
                streamWeights: { aiMl: 4 },
            },
            {
                text: "Power BI, Tableau, Excel",
                streamWeights: { biReporting: 3, entryLevel: 1 },
            },
            {
                text: "Cloud platforms (AWS, GCP, Azure)",
                streamWeights: { dataEngineering: 3, aiMl: 1 },
            },
        ],
    },
    {
        id: 4,
        question: "What's your preferred work style?",
        options: [
            {
                text: "Deep technical work with minimal meetings",
                streamWeights: { dataEngineering: 2, aiMl: 2 },
            },
            {
                text: "Collaborating closely with business teams",
                streamWeights: { biReporting: 3, entryLevel: 1 },
            },
            {
                text: "Research and experimentation focused",
                streamWeights: { aiMl: 4 },
            },
            {
                text: "Structured work with clear deliverables",
                streamWeights: { entryLevel: 2, biReporting: 2 },
            },
        ],
    },
    {
        id: 5,
        question: "What outcome do you find most satisfying?",
        options: [
            {
                text: "Seeing a dashboard drive business decisions",
                streamWeights: { biReporting: 4 },
            },
            {
                text: "Building a reliable data pipeline that runs 24/7",
                streamWeights: { dataEngineering: 4 },
            },
            {
                text: "Training a model that makes accurate predictions",
                streamWeights: { aiMl: 4 },
            },
            {
                text: "Delivering clean, validated data to stakeholders",
                streamWeights: { entryLevel: 2, biReporting: 2 },
            },
        ],
    },
    {
        id: 6,
        question: "What drives your learning and professional growth?",
        options: [
            {
                text: "Curiosity about how things work under the hood",
                streamWeights: { dataEngineering: 3, aiMl: 1 },
            },
            {
                text: "Desire to make measurable business impact",
                streamWeights: { biReporting: 3, entryLevel: 1 },
            },
            {
                text: "Mastering complex algorithms and math",
                streamWeights: { aiMl: 4 },
            },
            {
                text: "Building expertise in industry best practices",
                streamWeights: { entryLevel: 2, biReporting: 2 },
            },
        ],
    },
    {
        id: 7,
        question: "Which work environment energizes you most?",
        options: [
            {
                text: "Fast-paced startup with lots of ownership",
                streamWeights: { dataEngineering: 2, aiMl: 2 },
            },
            {
                text: "Established company with structured growth",
                streamWeights: { entryLevel: 2, biReporting: 2 },
            },
            {
                text: "Research-oriented with cutting-edge tech",
                streamWeights: { aiMl: 4 },
            },
            {
                text: "Consulting/agency with diverse projects",
                streamWeights: { biReporting: 2, entryLevel: 2 },
            },
        ],
    },
    {
        id: 8,
        question: "How do you approach complex problems?",
        options: [
            {
                text: "Analytically - gather data, test hypotheses",
                streamWeights: { aiMl: 2, biReporting: 2 },
            },
            {
                text: "Systematically - design solution architecture first",
                streamWeights: { dataEngineering: 4 },
            },
            {
                text: "User-centric - focus on end-user needs",
                streamWeights: { biReporting: 3, entryLevel: 1 },
            },
            {
                text: "Collaboratively - discuss with team members",
                streamWeights: { entryLevel: 2, biReporting: 2 },
            },
        ],
    },
];

/**
 * Calculate stream scores from questionnaire answers
 */
export function calculateStreamScores(answers: Record<number, number>): StreamScores {
    const scores: StreamScores = {
        dataEngineering: 0,
        aiMl: 0,
        biReporting: 0,
        entryLevel: 0,
    };

    Object.entries(answers).forEach(([questionId, optionIndex]) => {
        const question = CAREER_QUESTIONNAIRE.find(q => q.id === parseInt(questionId));
        if (question && question.options[optionIndex]) {
            const weights = question.options[optionIndex].streamWeights;
            if (weights.dataEngineering) scores.dataEngineering += weights.dataEngineering;
            if (weights.aiMl) scores.aiMl += weights.aiMl;
            if (weights.biReporting) scores.biReporting += weights.biReporting;
            if (weights.entryLevel) scores.entryLevel += weights.entryLevel;
        }
    });

    return scores;
}

/**
 * Get top stream recommendation
 */
export function getTopStream(streamScores: StreamScores): string {
    const entries = Object.entries(streamScores) as [keyof StreamScores, number][];
    const sorted = entries.sort((a, b) => b[1] - a[1]);

    const streamNames: Record<keyof StreamScores, string> = {
        dataEngineering: 'Data Engineering',
        aiMl: 'AI / Machine Learning',
        biReporting: 'BI & Reporting',
        entryLevel: 'Entry-Level Data Roles',
    };

    return streamNames[sorted[0][0]];
}
