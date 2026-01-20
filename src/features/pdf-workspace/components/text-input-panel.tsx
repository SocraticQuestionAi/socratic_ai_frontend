'use client'

import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TextInputPanelProps {
  text: string
  setText: (text: string) => void
  minLength?: number
}

export function TextInputPanel({
  text,
  setText,
  minLength = 50,
}: TextInputPanelProps) {
  const charCount = text.length
  const isValid = charCount >= minLength

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Or Enter Text Directly</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label htmlFor="content-text" className="sr-only">
          Educational Content
        </Label>
        <Textarea
          id="content-text"
          placeholder="Paste or type your educational content here (minimum 50 characters)..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[150px] resize-none"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className={!isValid && charCount > 0 ? 'text-destructive' : ''}>
            {charCount} / {minLength} minimum characters
          </span>
          {!isValid && charCount > 0 && (
            <span className="text-destructive">
              Need {minLength - charCount} more characters
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
