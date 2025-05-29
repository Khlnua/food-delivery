import { CategoriesForAdmin } from "./components";
import FoodMenuForAdmin from "./components/foodMenuForAdmin";

const AdminFoodMenuPage = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <CategoriesForAdmin />
      <FoodMenuForAdmin />
    </div>
  );
};

export default AdminFoodMenuPage;
