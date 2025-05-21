"use client"

import { useState } from "react"
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Order = {
  id: string
  email: string
  foods: { name: string, image: string }[]
  date: string
  price: number
  address: string
  status: "pending" | "delivered" | "canceled"
}

export function DateRangePicker({
  date,
  setDate,
}: {
  date: { from: Date | undefined; to: Date | undefined }
  setDate: (date: { from: Date | undefined; to: Date | undefined }) => void
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[260px] justify-start text-left font-normal",
            !date.from && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date.from ? (
            date.to ? (
              <>
                {format(date.from, "MMM dd, yyyy")} - {format(date.to, "MMM dd, yyyy")}
              </>
            ) : (
              format(date.from, "MMM dd, yyyy")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={date}
          onSelect={(range) =>
            setDate(range ? { from: range.from, to: range.to } : { from: undefined, to: undefined })
          }
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}





const initialOrders: Order[] = [
  {
    id: "1",
    email: "john@example.com",
    foods: [
      { name: "Burger", image: "/burger.jpg" },
      { name: "Fries", image: "/fries.jpg" },
    ],
    date: "2025-05-20",
    price: 19.99,
    address: "123 Street, UB",
    status: "pending",
  },
  {
    id: "2",
    email: "john@example.com",
    foods: [
      { name: "Burger", image: "/burger.jpg" },
      { name: "Fries", image: "/fries.jpg" },
    ],
    date: "2025-05-20",
    price: 19.99,
    address: "123 Street, UB",
    status: "pending",
  },
]

const AdminOrderpage = () => {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const toggleSelect = (id: string) => {
    setSelectedIds((previous) =>
      previous.includes(id) ? previous.filter((i) => i !== id) : [...previous, id]
    )
  }

  const updateStatus = (id: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    )
  }

  return (
    <div className="overflow-auto p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-4">
              <Checkbox
                checked={selectedIds.length === orders.length}
                onCheckedChange={(checked) =>
                  setSelectedIds(checked ? orders.map((order) => order.id) : [])
                }
              />
            </TableHead>
            <TableHead className="w-10 text-center">#</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Foods</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={order.id}>
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(order.id)}
                  onCheckedChange={() => toggleSelect(order.id)}
                />
              </TableCell>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="link" className="p-0 text-sm">
                      {order.foods.length} foods
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <ScrollArea className="h-40">
                      {order.foods.map((food, i) => (
                        <div key={i} className="flex items-center gap-2 py-1">
                          <Image src={food.image} alt={food.name} width={32} height={32} className="rounded" />
                          <span className="text-sm">{food.name}</span>
                        </div>
                      ))}
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell className="text-right">${order.price.toFixed(2)}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  onValueChange={(value) => updateStatus(order.id, value as Order["status"])}
                >
                  <SelectTrigger className="w-[120px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminOrderpage
