import React from "react";
import { View, Text, Button } from "react-native";
import Product from "./Product";
import { useNavigation } from "@react-navigation/native";
import NavBar from "./NavBar";

const WishList = ({ route }) => {
    const navigation = useNavigation();
    let verification;
    route.params ? verification = route.params.verification : verification = null;
    
    
    let producto;
    route.params ? producto = route.params.product : producto = null;
    
    return (

        <View style={{
            flexDirection: 'column'
        }}>
            <NavBar Verificate={verification} />
            <Text>
                Lista de deseos
            </Text>


            <Product videoGame={producto} verificate={verification}/>

            <Button title="Agregar al carrito de compras" onPress={() => navigation.navigate("adLittleCar")}></Button>
            
            <View style={{
                flexDirection: 'column',
                padding: 10
            }}>
                <Button title="volver" onPress={() => navigation.navigate("main", {verification:verification})} />
            </View>
        </View>


    )
}

export default WishList;