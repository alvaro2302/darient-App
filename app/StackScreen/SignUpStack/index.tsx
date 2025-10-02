import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import Login from "../../Screens/Login";
import Register from "../../Screens/Register";
const SignUpStack = () => {
  const Stack = createNativeStackNavigator();
  return (
  <Stack.Navigator initialRouteName={'Register'} screenOptions={{headerShown: false, testID: 'signup-stack'}}>
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