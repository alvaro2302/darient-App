import Category from "@/app/helper/Category";
import getCategories from "@/app/services/ServiceCategories";
import { useCategoryStore } from "@/app/Store/Categories";

const ModelViewModel = () => {
    const {setCategories} = useCategoryStore();
    const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      const listCategories: Category[] = categories.map((category) => ({ name: category }));
      setCategories(listCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  return {
    fetchCategories,
  }
}
export default ModelViewModel;