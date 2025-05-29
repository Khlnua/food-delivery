// {/* <div className="grid grid-cols-4 gap-4 p-6 bg-[#FFFFFF] border rounded-xl w-300">
//   {/* <Dialog open={isOpen} onOpenChange={setIsOpen}>
//     <DialogTrigger asChild>
//       <div
//         className="border rounded-md border-dashed
//         border-[#EF4444] flex gap-8 flex-col justify-center items-center"
//       >
//         <Button className="border rounded-full bg-[#EF4444] text-white px-4">
//           +
//         </Button>
//         <p>Add new Dish to {}</p>
//       </div>
//     </DialogTrigger>
//     <DialogContent className="flex flex-col gap-10">
//       <DialogHeader>
//         <DialogTitle>Add new dish to {}</DialogTitle>
//       </DialogHeader>
//       <div className="flex justify-between">
//         <div className="flex flex-col gap-5">
//           <Label>Food name</Label>
//           <Input
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             placeholder="Type food name..."
//           />
//         </div>
//         <div className="flex flex-col gap-5">
//           <Label>Food price</Label>
//           <Input
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             placeholder="Enter price..."
//           />
//         </div>
//       </div>

//       <div className="flex flex-col gap-5">
//         <Label>Ingredients</Label>
//         <Input
//           value={categoryName}
//           onChange={(e) => setCategoryName(e.target.value)}
//           placeholder="List ingredients..."
//         />
//       </div>

//       <div className="flex flex-col gap-5">
//         <Label>Food image</Label>
//         <Input
//           value={categoryName}
//           onChange={(e) => setCategoryName(e.target.value)}
//           placeholder="Choose a file or drag & drop it here"
//         />
//       </div>

//       <DialogFooter>
//         <Button disabled={!categoryName.trim() || adding}>
//           {adding ? "Adding..." : "Add Dish"}
//         </Button>
//       </DialogFooter>
//     </DialogContent>
//   </Dialog> */}

//   {Array.isArray(foodData) &&
//     foodData.map((food) => (
//       <div className="flex flex-col gap-5 p-4 border rounded-md border-[#E4E4E7]">
//         <div className="h-32 rounded-md relative">
//           <img
//             className="rounded-md w-[238.75px] h-[129px]"
//             src={food.image}
//             alt={food.foodName}
//           />
//           <Button
//             key={food._id}
//             className="bg-white rounded-full absolute z-2 w-11 h-11 top-18 left-46"
//           >
//             <Pen className="text-[#EF4444]" />
//           </Button>
//         </div>
//         <div className="w-[238.75px]">
//           <div className="flex justify-between">
//             <p className="text-[#EF4444] font-medium text-sm">
//               {food.foodName}
//             </p>
//             <p className="text-[12px]">${food.price}</p>
//           </div>
//           <p className="">{food.ingredients}</p>
//         </div>
//       </div>
//     ))}
// </div>;

// getfood;

// useEffect(() => {
//   const fetchFood = async () => {
//     try {
//       const response = await axios.get<AllFood>("http://localhost:8000/food");
//       setFoodData(response.data?.foods || []);
//     } catch (error: any) {
//       setError(error.message || "Failed to fetch foods");
//     }
//   };
//   fetchFood();
// }, []);

// console.log(foodData); */}
