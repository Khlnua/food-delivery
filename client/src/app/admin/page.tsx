"use client";

import React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

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
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
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
    if (!dateRange?.from || !dateRange?.to) return true;
    const orderDate = new Date(order.date);
    return orderDate >= dateRange.from && orderDate <= dateRange.to;
  });

  const [statusEditOpen, setStatusEditOpen] = React.useState(false);
const [statusChange, setStatusChange] = React.useState<OrderStatus | "">("");


  return (
    <div className="p-6 space-y-4 border border-[#E4E4E7] bg-white rounded-lg w-290">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-sm text-gray-500">
            {orders.length} items
          </p>
        </div>
        <div className="flex gap-3">
          <DatePickerWithRange value={dateRange} onChange={setDateRange} />
          <Dialog open={statusEditOpen} onOpenChange={setStatusEditOpen}>
  <DialogTrigger asChild>
    <Button
      className="border rounded-full"
      disabled={selectedOrders.length === 0}
    >
      Change delivery state
    </Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-[400px]">
    <DialogHeader>
      <DialogTitle className="flex justify-between items-center">
        Change delivery state
        <button
          onClick={() => setStatusEditOpen(false)}
          className="text-xl font-bold"
        >
          ×
        </button>
      </DialogTitle>
    </DialogHeader>

    <div className="flex justify-center gap-3 my-4">
      {(["delivered", "pending", "canceled"] as OrderStatus[]).map((status) => (
        <Button
          key={status}
          variant={statusChange === status ? "default" : "outline"}
          className={`rounded-full ${
            status === "delivered"
              ? "text-red-500 border-red-500"
              : status === "pending"
              ? "text-yellow-600 border-yellow-600"
              : "text-gray-600 border-gray-600"
          }`}
          onClick={() => setStatusChange(status)}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Button>
      ))}
    </div>

    <DialogFooter>
      <Button
        className="w-full bg-black text-white hover:bg-gray-900"
        disabled={!statusChange}
        onClick={() => {
          setOrders((prev) =>
            prev.map((order) =>
              selectedOrders.includes(order.id)
                ? { ...order, status: statusChange as OrderStatus }
                : order
            )
          );
          setSelectedOrders([]);
          setStatusEditOpen(false);
          setStatusChange("");
        }}
      >
        Save
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

<div className="flex flex-col gap-2">
  <Button
    className="border rounded-full"
    disabled={selectedOrders.length === 0}
    onClick={() => setStatusEditOpen((prev) => !prev)}
  >
    Change delivery state
  </Button>

  {statusEditOpen && (
    <div className="p-4 border rounded-lg bg-gray-50 space-y-3 shadow">
      <Select
        value={statusChange}
        onValueChange={(value) => setStatusChange(value as OrderStatus)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select new status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
          <SelectItem value="canceled">Canceled</SelectItem>
        </SelectContent>
      </Select>

      <Button
        className="bg-green-600 text-white"
        disabled={!statusChange}
        onClick={() => {
          setOrders((prev) =>
            prev.map((order) =>
              selectedOrders.includes(order.id)
                ? { ...order, status: statusChange as OrderStatus }
                : order
            )
          );
          setSelectedOrders([]); 
          setStatusEditOpen(false);
          setStatusChange(""); 
        }}
      >
        Save
      </Button>
    </div>
  )}
</div>

        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={selectedOrders.length === orders.length}
                onCheckedChange={(checked) =>
                  setSelectedOrders(checked ? orders.map((order) => order.id) : [])
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
          {filteredOrders.map((order, index) => (
            <TableRow key={order.id}>
              <TableCell>
                <Checkbox
                  checked={selectedOrders.includes(order.id)}
                  onCheckedChange={(checked) =>
                    handleSelect(order.id, !!checked)
                  }
                />
              </TableCell>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{order.customerEmail}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      {order.foods.length} foods
                      <ChevronDownIcon className="ml-1 h-4 w-4" />
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
