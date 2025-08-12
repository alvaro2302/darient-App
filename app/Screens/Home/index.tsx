import { NameScreens } from "@/app/helper/values";
import ModelViewModel from "@/app/ModelViewModels/HomeViewModel";
import { useCategoryStore } from "@/app/Store/Categories";
import ListCategories from "@/components/ListCategories";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";

const Home = (props) => {
  const {fetchCategories} = ModelViewModel();
  const {categories, loading} = useCategoryStore();
  useEffect(() => {
    fetchCategories();
  }, []);
  const navigationToScreenJokes = (category: string) => {
    props.navigation.navigate(NameScreens.Details, { category });
  }
  if(loading) {
    return (
      <>
      <ActivityIndicator size="large" style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
      </>
    )
  }
  return (
    <>
      <ListCategories listCategories={categories} navigatoToScreenJokes={navigationToScreenJokes}  />
    </>
  );
};
export default Home;
