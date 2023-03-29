import React from "react"
import { useNavigation } from "@react-navigation/native";
import { Button, Text, View, Image } from "react-native";
import NavBar from "./NavBar";

const History = ({route}) => {
    const navigation = useNavigation();
    let verification;
    route.params ? verification = route.params.verification : verification = null;
    return (
        <View>
            <NavBar Verificate={verification} />
        <View style={{
            flexDirection: 'row',
            height: 130,
            width: 100, 
            padding: 10
        }}>
            <View style={{ backgroundColor: "gray"}}>
                <Text>Imagen del Producto</Text>
                <Button title="Ver producto" onPress={() => navigation.navigate("product")}/>
            </View> 
        </View>
        <Button title="Volver" onPress={() => navigation.navigate("main", {verification:true})}/>
        </View>
    )
}

export default History;