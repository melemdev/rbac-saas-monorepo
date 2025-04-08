"use client"

import { DashboardCard } from "@/components/dashboard/layout/DashboardCard"
import { AreaChart } from "@/components/dashboard/charts/AreaChart"

  const revenueData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
]

const recentBookings = [
  { id: 1, room: "101", guest: "John Doe", amount: "866.88", nights: 2 },
  { id: 2, room: "102", guest: "Jane Smith", amount: "664.18", nights: 3 },
  { id: 3, room: "103", guest: "Mike Johnson", amount: "945.32", nights: 1 },
]

export default function OverviewPage() {
                        return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Revenue">
          <p className="text-3xl font-bold text-gray-900">$45,231.89</p>
          <p className="text-sm text-green-600">+20.1% from last month</p>
        </DashboardCard>
        <DashboardCard title="Total Bookings">
          <p className="text-3xl font-bold text-gray-900">+2350</p>
          <p className="text-sm text-green-600">+180.1% from last month</p>
        </DashboardCard>
        <DashboardCard title="Active Users">
          <p className="text-3xl font-bold text-gray-900">+12,234</p>
          <p className="text-sm text-red-600">-19% from last month</p>
        </DashboardCard>
        <DashboardCard title="Room Occupancy">
          <p className="text-3xl font-bold text-gray-900">85%</p>
          <p className="text-sm text-green-600">+4.3% from last month</p>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Revenue Overview">
          <AreaChart data={revenueData} color="#8884d8" />
        </DashboardCard>
        <DashboardCard title="Recent Bookings">
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                  <p className="font-medium">Room {booking.room}</p>
                  <p className="text-sm text-gray-500">{booking.guest}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${booking.amount}</p>
                  <p className="text-sm text-gray-500">{booking.nights} nights</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}

