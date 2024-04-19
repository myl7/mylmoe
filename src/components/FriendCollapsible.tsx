import React from 'react'
import { Plus, Minus } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { Card, CardContent, CardFooter } from './ui/card'
import type { Friend } from '@/content/data/friends'

export interface FriendCollapsibleProps {
  friends: Friend[]
}

export default function FriendCollapsible({ friends }: FriendCollapsibleProps) {
  const [open, setOpen] = React.useState(false)
  const Action = open ? Minus : Plus

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex flex-col gap-1">
          <h2 className="flex gap-4 text-xl">
            <span className="text-start">Friends</span>
            <span>
              <Action className="inline h-5 w-5" />
            </span>
          </h2>
          <hr />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="py-4">
        <Card className="pt-6">
          <CardContent>
            <ul className="flex list-inside list-disc flex-wrap gap-4">
              {friends.map((friend) => (
                <li key={friend.name}>
                  <a href={friend.url} className="link">
                    {friend.name}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>Feel free to request a friend link if you have met me in reality!</CardFooter>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  )
}
