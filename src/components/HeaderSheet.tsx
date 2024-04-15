import { Menu } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet'
import { Button } from './ui/button'

export default function HeaderSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          {/* <a href="#" className="flex items-center gap-2 text-lg font-semibold">
            <Home className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </a> */}
          <a href="/" className="text-muted-foreground hover:text-foreground">
            Home
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
