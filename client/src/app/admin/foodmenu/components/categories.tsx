// "use client";

// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// type FoodCategory = {
//   _id: string;
//   categoryName: string;
// };

// type AllFoodCategories = {
//   categories: FoodCategory[];
// };

// export const CategoriesForAdmin = () => {
//   const { push } = useRouter();
//   const [data, setData] = useState<FoodCategory[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get<AllFoodCategories>("http://localhost:8000/food-category");
//         setData(response.data?.categories);
//       } catch (error: any) {
//         setError(error.message || "Failed to fetch data");
//       }
//     };
  
//     fetchCategories();
//   }, []);

//   return (
//     <div className="flex flex-col gap-4 p-6 bg-[#FFFFFF] border rounded-xl w-230">
//       <h4 className="font-semibold text-[20px]">Dishes category</h4>
//       <div className="flex gap-4">
//         <Button className="border rounded-full bg-white text-black border-[#E4E4E7] justify-center items-center cursor-pointer">
//           All Dishes
//         </Button>
//         {data.map((category) => (
//           <Button
//             key={category._id}
//             className="border rounded-full bg-white text-black border-[#E4E4E7] justify-center items-center cursor-pointer"
//           >
//             {category.categoryName}
//           </Button>
//         ))}
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button
//               variant="outline"
//               className="border rounded-full flex bg-[#EF4444] text-white"
//             >
//               +
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="flex flex-col gap-10">
//             <DialogHeader>
//               <DialogTitle>Add new category</DialogTitle>
//             </DialogHeader>

//             <div className="flex flex-col gap-5">
//               <Label className="items-start">Category name</Label>
//               <Input id="name" placeholder="Type category name..." />
//             </div>
//             <DialogFooter>
//               <Button type="submit">Add category</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// "use client";

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// type FoodCategory = {
//   _id: string;
//   categoryName: string;
// };

// type AllFoodCategories = {
//   categories: FoodCategory[];
// };

// export const CategoriesForAdmin = () => {
//   const [data, setData] = useState<FoodCategory[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [categoryName, setCategoryName] = useState("");
//   const [adding, setAdding] = useState(false);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get<AllFoodCategories>(
//         "http://localhost:8000/food-category"
//       );
//       setData(response.data?.categories);
//     } catch (error: any) {
//       setError(error.message || "Failed to fetch data");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleAddCategory = async () => {
//     try {
//       setAdding(true);
//       const res = await axios.post("http://localhost:8000/food-category", {
//         catergoryName: categoryName,
//       });

//       if (res.status === 201) {
//         await fetchCategories(); // Refresh the list
//         setCategoryName(""); // Clear input
//       }
//     } catch (error: any) {
//       alert(error.response?.data?.message || error.message);
//     } finally {
//       setAdding(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4 p-6 bg-[#FFFFFF] border rounded-xl w-230">
//       <h4 className="font-semibold text-[20px]">Dishes category</h4>

//       <div className="flex gap-4 flex-wrap">
//         <Button className="border rounded-full bg-white text-black border-[#E4E4E7]">
//           All Dishes
//         </Button>
//         {data.map((category) => (
//           <Button
//             key={category._id}
//             className="border rounded-full bg-white text-black border-[#E4E4E7]"
//           >
//             {category.categoryName}
//           </Button>
//         ))}

//         <Dialog>
//           <DialogTrigger asChild>
//             <Button className="border rounded-full flex bg-[#EF4444] text-white">
//               +
//             </Button>
//           </DialogTrigger>

//           <DialogContent className="flex flex-col gap-10">
//             <DialogHeader>
//               <DialogTitle>Add new category</DialogTitle>
//             </DialogHeader>

//             <div className="flex flex-col gap-5">
//               <Label htmlFor="name">Category name</Label>
//               <Input
//                 id="name"
//                 placeholder="Type category name..."
//                 value={categoryName}
//                 onChange={(e) => setCategoryName(e.target.value)}
//               />
//             </div>

//             <DialogFooter>
//               <Button
//                 type="button"
//                 disabled={!categoryName || adding}
//                 onClick={handleAddCategory}
//               >
//                 {adding ? "Adding..." : "Add category"}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type FoodCategory = {
  _id: string;
  categoryName: string;
};

type AllFoodCategories = {
  categories: FoodCategory[];
};

export const CategoriesForAdmin = () => {
  const { push } = useRouter();
  const [data, setData] = useState<FoodCategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [adding, setAdding] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<AllFoodCategories>(
        "http://localhost:8000/food-category"
      );
      setData(response.data?.categories || []);
    } catch (error: any) {
      setError(error.message || "Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      setAdding(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in as Admin to add a category.");
        return;
      }

      const res = await axios.post(
        "http://localhost:8000/food-category",
        {
          catergoryName: categoryName, // note spelling matches backend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        await fetchCategories(); // Refresh list
        setCategoryName("");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || error.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-[#FFFFFF] border rounded-xl w-230">
      <h4 className="font-semibold text-[20px]">Dishes category</h4>

      <div className="flex gap-4 flex-wrap">
        <Button className="border rounded-full bg-white text-black border-[#E4E4E7]">
          All Dishes
        </Button>

        {data.map((category) => (
          <Button
            key={category._id}
            className="border rounded-full bg-white text-black border-[#E4E4E7]"
          >
            {category.categoryName}
          </Button>
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <Button className="border rounded-full bg-[#EF4444] text-white px-4">
              +
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-10">
            <DialogHeader>
              <DialogTitle>Add new category</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-5">
              <Label>Category name</Label>
              <Input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Type category name..."
              />
            </div>

            <DialogFooter>
              <Button
                onClick={handleAddCategory}
                disabled={!categoryName.trim() || adding}
              >
                {adding ? "Adding..." : "Add category"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CategoriesForAdmin;
