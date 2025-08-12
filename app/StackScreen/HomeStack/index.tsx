import { NameScreens } from "@/app/helper/values";
import DetailsJoke from "@/app/Screens/Details";
import Home from "@/app/Screens/Home";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
  <Stack.Navigator initialRouteName={NameScreens.Home} screenOptions={{headerShown: false}}>
    <Stack.Screen
      name={NameScreens.Home}
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={NameScreens.Details}
      component={DetailsJoke}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
};
export default HomeStack;