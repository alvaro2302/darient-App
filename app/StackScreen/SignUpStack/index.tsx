import Login from "@/app/Screens/Login";
import Register from "@/app/Screens/Register";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

const SignUpStack = () => {
  const Stack = createNativeStackNavigator();
  return (
  <Stack.Navigator initialRouteName={'Register'} screenOptions={{headerShown: false}}>
    <Stack.Screen
      name={'Register'}
      component={Register} // Replace with your Home component
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={'Login'}
      component={Login} // Replace with your Details component
      options={{ title: 'Login' }}
    />
  </Stack.Navigator>
  )
}
export default SignUpStack;