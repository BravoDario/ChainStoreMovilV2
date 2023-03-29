import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "./NavBar";

const LittleCar = () => {

    const navigation = useNavigation();

    return (
        <View>
            <NavBar />
            <Text>Carrito</Text>
            <Button title="volver" onPress={() => navigation.navigate('main')} />
        </View>
    )
}

export default LittleCar;