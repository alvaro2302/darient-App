import ModelViewModel from "@/app/ModelViewModels/HomeViewModel";
import { useCategoryStore } from "@/app/Store/Categories";
import ListCategories from "@/components/ListCategories";
import { useEffect } from "react";

const Home = (props) => {
  const {fetchCategories} = ModelViewModel();
  const {categories} = useCategoryStore();
  useEffect(() => {
    fetchCategories();
  }, []);
  const navigationToScreenJokes = (category: string) => {
    props.navigation.navigate('Details', { category });
  }
  return (
    <>
      <ListCategories listCategories={categories} navigatoToScreenJokes={navigationToScreenJokes}  />
    </>
  );
};
export default Home;
