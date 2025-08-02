export class SubmitAssessmentDto {
  userEmail: string;
  answers: {
    questionId: number;
    level: number | null;
    futureLevel: number | null;
    comment: string;
  }[];
}
