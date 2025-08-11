import getCategories from "@/app/services/ServiceCategories";
import { useEffect } from "react";
import { Text, View } from "react-native";

const Home = () => {
  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      console.log("Fetched Categories:", categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
    </View>
  );
};
export default Home;
