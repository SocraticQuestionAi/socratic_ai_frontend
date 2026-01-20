'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Plus, X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { QuestionOption, QuestionType } from '@/types'

interface QuestionInputFormProps {
  questionText: string
  setQuestionText: (text: string) => void
  questionType: QuestionType
  setQuestionType: (type: QuestionType) => void
  options: QuestionOption[]
  setOptions: (options: QuestionOption[]) => void
  correctAnswer: string
  setCorrectAnswer: (answer: string) => void
  numSimilar: number
  setNumSimilar: (num: number) => void
}

export function QuestionInputForm({
  questionText,
  setQuestionText,
  questionType,
  setQuestionType,
  options,
  setOptions,
  correctAnswer,
  setCorrectAnswer,
  numSimilar,
  setNumSimilar,
}: QuestionInputFormProps) {
  const [newOptionText, setNewOptionText] = useState('')

  const addOption = () => {
    if (newOptionText.trim() && options.length < 6) {
      const label = String.fromCharCode(65 + options.length) // A, B, C, D...
      setOptions([
        ...options,
        { label, text: newOptionText.trim(), is_correct: false },
      ])
      setNewOptionText('')
    }
  }

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index).map((opt, i) => ({
      ...opt,
      label: String.fromCharCode(65 + i),
    }))
    setOptions(newOptions)
    if (correctAnswer === options[index].label) {
      setCorrectAnswer('')
    }
  }

  const toggleCorrect = (index: number) => {
    const newOptions = options.map((opt, i) => ({
      ...opt,
      is_correct: i === index,
    }))
    setOptions(newOptions)
    setCorrectAnswer(options[index].label)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Input Question</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Question Text */}
        <div className="space-y-2">
          <Label htmlFor="question-text">Question Text</Label>
          <Textarea
            id="question-text"
            placeholder="Enter your question here..."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* Question Type */}
        <div className="space-y-2">
          <Label>Question Type</Label>
          <Select value={questionType} onValueChange={(v) => setQuestionType(v as QuestionType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mcq">Multiple Choice</SelectItem>
              <SelectItem value="open_ended">Open Ended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* MCQ Options */}
        {questionType === 'mcq' && (
          <div className="space-y-3">
            <Label>Answer Options</Label>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div
                  key={option.label}
                  className={cn(
                    'flex items-center gap-2 rounded-md border p-2',
                    option.is_correct && 'border-green-500 bg-green-50 dark:bg-green-950'
                  )}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => toggleCorrect(index)}
                  >
                    {option.is_correct ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2" />
                    )}
                  </Button>
                  <Badge variant="outline" className="shrink-0">
                    {option.label}
                  </Badge>
                  <span className="flex-1 text-sm">{option.text}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => removeOption(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Add Option */}
            {options.length < 6 && (
              <div className="flex gap-2">
                <Input
                  placeholder="Add an option..."
                  value={newOptionText}
                  onChange={(e) => setNewOptionText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addOption()}
                />
                <Button variant="outline" size="icon" onClick={addOption}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Open Ended Answer */}
        {questionType === 'open_ended' && (
          <div className="space-y-2">
            <Label htmlFor="correct-answer">Expected Answer</Label>
            <Textarea
              id="correct-answer"
              placeholder="Enter the expected answer..."
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          </div>
        )}

        {/* Number of Similar Questions */}
        <div className="space-y-2">
          <Label htmlFor="num-similar">Number of Similar Questions</Label>
          <Input
            id="num-similar"
            type="number"
            min={1}
            max={10}
            value={numSimilar}
            onChange={(e) => setNumSimilar(parseInt(e.target.value) || 3)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
