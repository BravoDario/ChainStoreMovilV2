import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "./NavBar";

const AddLittleCar = ({route}) => {

    const navigation = useNavigation();
    let verification;
    route.params ? verification = route.params.verification : verification = null;
    console.log(route.params);

    return (
        <View>
            <NavBar Verificate={verification} />
            <Text>Agregar al carito</Text>
            <Button title="volver" onPress={() => navigation.navigate('main',{verification: route.params.verification})} />
        </View>
    )
}

export default AddLittleCar;