import { Button } from "@/components/ui/button"
import { Menu, Bell, ChevronRight, LogOut } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation"

interface HeaderProps {
  isMobile: boolean
  setSidebarOpen: (open: boolean) => void
}

export function Header({ isMobile, setSidebarOpen }: HeaderProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  
  const pathSegments = pathname
    .split('/')
    .filter(segment => segment)
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <div className="flex-1 mx-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="font-medium text-gray-900">Dashboard</span>
            {pathSegments.map((segment, index) => (
              <div key={index} className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4" />
                <span className={index === pathSegments.length - 1 ? "font-medium text-gray-900" : ""}>
                  {segment}
                </span>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <span className="text-sm font-medium">{session?.user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}