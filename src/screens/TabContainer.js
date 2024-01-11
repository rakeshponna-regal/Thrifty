// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
//https://oblador.github.io/react-native-vector-icons/
// Import React and Component
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';


import HomeScreen from './HomeScreen';
import ProfileTab from './ProfileTab';
import CartTab from './CartTab';
import FavoriteTab from './FavoriteTab';
import { Image } from 'react-native-svg';
import SellerClosets from './SellerClosets';
import { Platform, View } from 'react-native';
import ProfileContainer from './container/profileContainer';
import SellerclosetsContainer from './container/sellerClosets';
import HomeContainer from './container/homeContainer';
import FavoriteContainer from './container/FavoriteContrainer';
import CartContainer from './container/cartContainer';
import { colors } from '../utils/Theme';
import { cartTotalSelector } from '../services/slices/selector';
import { useSelector } from 'react-redux';

const Tab = createMaterialBottomTabNavigator();

const TabContainer = () => {
    const total = useSelector(cartTotalSelector);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.body_fill,
                tabBarLabelStyle: { alignContent: 'center', justifyContent: 'center', fontWeight: '400', fontSize: 16 },
                tabBarStyle: { position: 'absolute' },
            })}
            initialRouteName="HomeScreen"
            tabBarActiveBackgroundColor="black"
            barStyle={{
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                headerShown: false,
                backgroundColor: 'white',
                display: 'flex',
                position: 'absolute',
                bottom: 20,
                elevation: 5,
                borderRadius: 30,
                height: 40,
            }}
        >
            <Tab.Screen
                name="Profile"
                component={ProfileContainer}
                options={{
                    tabBarLabel: '',
                    tabBarActiveBackgroundColor: "black",
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome
                            name="user"
                            size={26}
                            color={focused ? 'black' : 'grey'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="SellerClosets"
                component={SellerclosetsContainer}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="door-sliding" color={focused ? 'black' : 'grey'} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="HomeScreen"
                component={HomeContainer}
                options={{
                    headerShown: true,
                    tabBarLabel: '',
                    tabBarIcon: ({ size, focused, color }) =>
                    (
                        <MaterialCommunityIcons name="home" color={focused ? 'black' : 'grey'} size={26} />
                    )
                    // {
                    //     return (
                    //         <Image
                    //             style={{ width: 40, height: 40 }}
                    //             source={require("../assets/images/home.png")}
                    //         />
                    //     );
                    // },
                }}
            />

            <Tab.Screen
                name="Favourite"
                component={FavoriteContainer}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <Fontisto name="favorite" color={focused ? 'black' : 'grey'} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartContainer}
                options={{
                    tabBarLabel: '',
                    tabBarBadge:total,
                    tabBarColor: '#009387',
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="cart" color={focused ? 'black' : 'grey'} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabContainer;