import React from "react";
import { Alert, Button, TouchableOpacity, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../data/Styles";

const SubNavBar = ({cliente}) => {
    const navigation = useNavigation();
    
    const validarCarrito = () => {
        if (cliente === null) {
            Alert.alert("Es necesario iniciar sesión");
            navigation.navigate("login")
        } else {
            navigation.navigate("littleCar", { client: cliente })
        }
    }

    return (
    <View style={styles.subNavBar}>
        <Text style={styles.subNavBar.text} onPress={() => navigation.navigate("main", {client:cliente})}>Home</Text>
        <Text style={styles.subNavBar.text}>Favoritos</Text>
        <Text style={styles.subNavBar.text} onPress={validarCarrito}>Carrito</Text>
        <Text style={styles.subNavBar.text}>Perfil</Text>
    </View>
    )
}

export default SubNavBar;