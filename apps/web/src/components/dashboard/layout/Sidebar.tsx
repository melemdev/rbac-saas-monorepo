import { Button } from "@/components/ui/button"
import {
  BarChart,
  CalendarIcon,
  Home,
  MessageSquare,
  Star,
  CreditCard,
  Utensils,
  Award,
  ChevronLeft,
  Menu,
  Users,
  Box,
  ShieldUser,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isMobile: boolean
  sidebarOpen: boolean
  activeSection: string
  setActiveSection: (section: string) => void
  setSidebarOpen: (open: boolean) => void
}

export function Sidebar({ isMobile, sidebarOpen, activeSection, setActiveSection, setSidebarOpen }: SidebarProps) {
  const pathName = usePathname()

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart, href: "/overview" },
    { id: "users", label: "Usuários", icon: Users, href: "/users" },
    { id: "products", label: "Produtos", icon: Box, href: "/products" },
    { id: "sessions", label: "Sessões", icon: ShieldUser, href: "/users_sessions" },
  ]

  return (
    <div
      className={`${isMobile ? "fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out" : "w-64"} ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"
        } bg-white border-r border-gray-200 flex flex-col`}
    >
      {isMobile && (
        <div className="flex justify-end p-4">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
      )}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-purple-600">MelemSaas</h1>
      </div>
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-r-md ${pathName.startsWith(item.href)
                  ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}