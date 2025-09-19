"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Award } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizComponentProps {
  title: string;
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}
const QuizComponent = ({
  title,
  questions,
  onComplete,
}: QuizComponentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      questions.forEach((question) => {
        const selectedAnswer = selectedAnswers[question.id];
        if (
          selectedAnswer &&
          Number.parseInt(selectedAnswer) === question.correctAnswer
        ) {
          correctCount++;
        }
      });
      const finalScore = Math.round((correctCount / questions.length) * 100);
      setScore(finalScore);
      setShowResults(true);
      onComplete(finalScore);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
            <Award className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="text-2xl">Kết quả bài kiểm tra</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div>
            <div className="text-4xl font-bold text-accent mb-2">{score}%</div>
            <p className="text-muted-foreground">
              Bạn đã trả lời đúng {Math.round((score / 100) * questions.length)}
              /{questions.length} câu hỏi
            </p>
          </div>

          <div className="space-y-3">
            {questions.map((question, index) => {
              const selectedAnswer = selectedAnswers[question.id];
              const isCorrect =
                selectedAnswer &&
                Number.parseInt(selectedAnswer) === question.correctAnswer;

              return (
                <div
                  key={question.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <span className="text-sm">Câu {index + 1}</span>
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={resetQuiz}
              className="flex-1 bg-transparent"
            >
              Làm lại
            </Button>
            <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
              Tiếp tục
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1}/{questions.length}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{question.question}</h3>

          <RadioGroup
            value={selectedAnswers[question.id] || ""}
            onValueChange={(value) => handleAnswerSelect(question.id, value)}
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50"
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Câu trước
          </Button>

          <Button
            onClick={handleNext}
            disabled={!selectedAnswers[question.id]}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {currentQuestion === questions.length - 1
              ? "Hoàn thành"
              : "Câu tiếp theo"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizComponent;
