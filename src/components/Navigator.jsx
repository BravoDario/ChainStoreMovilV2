import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./Main";
import Login from "./Login";
import ProductDetails from "./ProductDetails";
import Profile from "./Profile";
import PaymentMethod from "./PaymentMethod";
import History from "./History";
import CreateAccount from "./CreateAccount";
import LittleCar from "./LittleCar";

const Navigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, }}>
            <Stack.Screen
                name="main"
                component={Main}
            />
            <Stack.Screen
                name="history"
                component={History}
            />
            <Stack.Screen
                name="login"
                component={Login}
            />
            <Stack.Screen
                name="productDetails"
                component={ProductDetails}
            />
            <Stack.Screen
                name="profile"
                component={Profile}
            />
            <Stack.Screen
                name="payMethod"
                component={PaymentMethod}
            />
            <Stack.Screen
                name="createAccount"
                component={CreateAccount}
            />
            <Stack.Screen
                name="littleCar"
                component={LittleCar}
            />
        </Stack.Navigator>
    )
}

export default Navigator;