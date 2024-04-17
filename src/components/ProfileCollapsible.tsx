import { Link } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import type React from 'react'

export default function ProfileCollapsible({ children }: { children: React.ReactNode }) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full">
        <div className="flex flex-col gap-1">
          <h2 className="text-start text-xl">
            About me <Link className="inline h-5 w-5" />
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
