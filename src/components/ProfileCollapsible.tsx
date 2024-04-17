import React from 'react'
import { Plus, Minus } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export default function ProfileCollapsible({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const Action = open ? Minus : Plus

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex flex-col gap-1">
          <h2 className="flex gap-4 text-xl">
            <span className="text-start">About me</span>
            <span>
              <Action className="inline h-5 w-5" />
            </span>
          </h2>
          <hr />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="py-4">
        <Card>
          <CardHeader>
            <CardTitle>I am myl7:</CardTitle>
          </CardHeader>
          <CardContent className="post">{children}</CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  )
}
