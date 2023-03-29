import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "./NavBar";

const BuyNow = () => {

    const navigation = useNavigation();

    return (
        <View>
            <Text>Comprar ahora</Text>
            <Button title="volver" onPress={() => navigation.navigate('main')} />
        </View>
    )
}

export default BuyNow;