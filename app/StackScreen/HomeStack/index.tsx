import { NameScreens } from "@/app/helper/values";
import Details from "@/app/Screens/Details";
import Home from "@/app/Screens/Home";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
  <Stack.Navigator>
    <Stack.Screen
      name={NameScreens.Home}
      component={Home} // Replace with your Home component
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={NameScreens.Details}
      component={Details} // Replace with your Details component
      options={{ title: 'Details' }}
    />
  </Stack.Navigator>
);
};
export default HomeStack;