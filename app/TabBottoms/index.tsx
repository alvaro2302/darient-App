import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";
import { NameScreens } from "../helper/values";
import Favorites from "../Screens/Favorites";
import Search from "../Screens/Search";
import HomeStack from "../StackScreen/HomeStack";
const TabBottoms = () => {
    const Tab = createBottomTabNavigator();


    return (
        <Tab.Navigator 
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === NameScreens.Home) {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === NameScreens.Favorites) {
                    iconName = focused ? 'heart' : 'heart-outline';
                } else if (route.name === NameScreens.Search) {
                    iconName = focused ? 'search' : 'search-outline';
                }
                return <Ionicons name= {iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'black',
        })}
        initialRouteName={NameScreens.Home}>
            <Tab.Screen name={NameScreens.Home} component={HomeStack} />
            <Tab.Screen name={NameScreens.Favorites} component={Favorites} />
            <Tab.Screen name={NameScreens.Search} component={Search}/>

        </Tab.Navigator>

    )
}
export default TabBottoms;