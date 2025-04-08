"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, ChevronDown, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const bookingData = [
  {
    id: 1,
    name: "Ram Kailash",
    phone: "9905598912",
    bookingId: "SDK89635",
    nights: 2,
    roomType: "1 King Room",
    guests: 2,
    paid: "rsp.150",
    cost: "rsp.1500",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Samira Karki",
    phone: "9815394203",
    bookingId: "SDK89635",
    nights: 4,
    roomType: ["1 Queen", "1 King Room"],
    guests: 5,
    paid: "paid",
    cost: "rsp.5500",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Jeevan Rai",
    phone: "9865328452",
    bookingId: "SDK89635",
    nights: 1,
    roomType: ["1 Deluxe", "1 King Room"],
    guests: 3,
    paid: "rsp.150",
    cost: "rsp.2500",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "Bindu Sharma",
    phone: "9845653124",
    bookingId: "SDK89635",
    nights: 3,
    roomType: ["1 Deluxe", "1 King Room"],
    guests: 2,
    paid: "rsp.150",
    cost: "rsp.3000",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function UsersList() {
  const [activeTab, setActiveTab] = useState("stays")


  return <Card className="mb-6">
    <CardHeader className="p-4 pb-0">
      <CardTitle className="text-base font-medium">
        Todays Booking <span className="text-xs font-normal text-gray-500">(8 Guest today)</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <Tabs defaultValue="stays" className="w-full">
        {/* <TabsList className="mb-4 border-b w-full justify-start rounded-none bg-transparent p-0">
          {[
            { value: "stays", label: "Stays" },
            { value: "packages", label: "Packages" },
            { value: "arrivals", label: "Arrivals" }, 
            { value: "departure", label: "Departure" }
          ].map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-none px-4 py-2 border-0 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList> */}

        <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search guest by name or phone number or booking ID"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-[400px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Booking
          </Button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="whitespace-nowrap font-semibold">
                  <div className="flex items-center cursor-pointer hover:text-blue-600">
                    NAME <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap font-semibold">BOOKING ID</TableHead>
                <TableHead className="whitespace-nowrap font-semibold">NIGHTS</TableHead>
                <TableHead className="whitespace-nowrap font-semibold">ROOM TYPE</TableHead>
                <TableHead className="whitespace-nowrap font-semibold">GUESTS</TableHead>
                <TableHead className="whitespace-nowrap font-semibold">PAID</TableHead>
                <TableHead className="whitespace-nowrap font-semibold">COST</TableHead>
                <TableHead className="whitespace-nowrap font-semibold">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookingData.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage src={booking.avatar} alt={booking.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {booking.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{booking.name}</p>
                        <p className="text-xs text-gray-500">{booking.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{booking.bookingId}</TableCell>
                  <TableCell>{booking.nights}</TableCell>
                  <TableCell>
                    {Array.isArray(booking.roomType) ? (
                      <div className="space-y-1">
                        {booking.roomType.map((type, index) => (
                          <p key={index} className="text-sm">{type}</p>
                        ))}
                      </div>
                    ) : (
                      booking.roomType
                    )}
                  </TableCell>
                  <TableCell>{booking.guests} Guests</TableCell>
                  <TableCell>
                    {booking.paid === "paid" ? (
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                        Paid
                      </span>
                    ) : (
                      <span className="text-amber-600">{booking.paid}</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{booking.cost}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end mt-4">
          <Button 
            variant="link" 
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            See other Bookings
          </Button>
        </div>
      </Tabs>
    </CardContent>
  </Card>
}