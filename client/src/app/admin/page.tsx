"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

type OrderStatus = "pending" | "delivered" | "canceled";

type Food = {
  name: string;
  image: string;
};

type Order = {
  id: number;
  customerEmail: string;
  foods: Food[];
  date: string;
  totalPrice: number;
  address: string;
  status: OrderStatus;
};

const dummyOrders: Order[] = [
  {
    id: 1,
    customerEmail: "user1@example.com",
    foods: [
      { name: "Pizza", image: "/pizza.jpg" },
      { name: "Burger", image: "/burger.jpg" },
    ],
    date: "2025-05-20",
    totalPrice: 32.5,
    address: "123 Main St",
    status: "pending",
  },
  {
    id: 2,
    customerEmail: "user2@example.com",
    foods: [{ name: "Sushi", image: "/sushi.jpg" }],
    date: "2025-05-21",
    totalPrice: 18.0,
    address: "456 Elm St",
    status: "delivered",
  },
];

export default function OrderDashboard() {
  const [selectedOrders, setSelectedOrders] = React.useState<number[]>([]);
  const [orders, setOrders] = React.useState<Order[]>(dummyOrders);
  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date }>({
    from: new Date("2025-05-01"),
    to: new Date("2025-05-31"),
  });

  const handleSelect = (id: number, checked: boolean) => {
    setSelectedOrders((prev) =>
      checked ? [...prev, id] : prev.filter((orderId) => orderId !== id)
    );
  };

  const handleStatusChange = (id: number, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.date);
    return orderDate >= dateRange.from && orderDate <= dateRange.to;
  });

  return (
    <div className="p-6 ml-15 space-y-4 border border-[#E4E4E7] bg-[#FFFFFF] rounded-lg w-293">
      <div className="flex justify-between">
        <div className="flex flex-col items-start justify-between">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-[#71717A] text-12px font-medium">
            {orders.length} items
          </p>
        </div>
        <div className="flex gap-3 ">
          <DatePickerWithRange />
          <Button className="border rounded-full">Change delivery state</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={selectedOrders.length === orders.length}
                onCheckedChange={(checked) =>
                  setSelectedOrders(checked ? orders.map((o) => o.id) : [])
                }
              />
            </TableHead>
            <TableHead>#</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Foods</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order, idx) => (
            <TableRow key={order.id}>
              <TableCell>
                <Checkbox
                  checked={selectedOrders.includes(order.id)}
                  onCheckedChange={(checked) =>
                    handleSelect(order.id, !!checked)
                  }
                />
              </TableCell>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{order.customerEmail}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      {order.foods.length} foods
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <ul className="space-y-2">
                      {order.foods.map((food, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <img
                            src={food.image}
                            alt={food.name}
                            className="w-8 h-8 rounded"
                          />
                          <span>{food.name}</span>
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>
                {format(new Date(order.date), "yyyy-MM-dd")}
              </TableCell>
              <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  onValueChange={(value) =>
                    handleStatusChange(order.id, value as OrderStatus)
                  }
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select status" />
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
  );
}
