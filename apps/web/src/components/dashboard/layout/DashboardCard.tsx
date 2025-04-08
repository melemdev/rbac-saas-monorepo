import { Card } from "@/components/ui/card"

interface DashboardCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function DashboardCard({ title, children, className = "" }: DashboardCardProps) {
  return (
    <Card className={`p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </Card>
  )
} 