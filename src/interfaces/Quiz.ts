export interface RangeAnswer extends AnswerType {
  start: number;
  end: number;
}

export interface Question {
  text: string;
}

export interface AnswerType {
  text: string | undefined;
}

export interface MultipleChoiceAnswer extends AnswerType {
  answers: Map<number, string>;
}

export interface ListAnswer extends AnswerType {
  answers: string[];
}

export interface Quiz {
  name: string;
  questions: Map<Question, AnswerType>;
}

export default Quiz;
