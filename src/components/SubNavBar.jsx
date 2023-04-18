import React from "react";
import { Alert, Button, TouchableOpacity, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5"
import styles from "../data/Styles";

const SubNavBar = ({cliente}) => {
    const navigation = useNavigation();
    
    const validarPerfil = () => {
        if (cliente === null) {
            Alert.alert("Es necesario iniciar sesión");
            navigation.navigate("login")
        } else {
            navigation.navigate("profile", { client: cliente })
        }
    }
    
    const validarCarrito = () => {
        if (cliente === null) {
            Alert.alert("Es necesario iniciar sesión");
            navigation.navigate("login")
        } else {
            navigation.navigate("littleCar", { client: cliente })
        }
    }

    const validarHistory = () => {
        if (cliente === null) {
            Alert.alert("Es necesario iniciar sesión");
            navigation.navigate("login")
        } else {
            navigation.navigate("history", { client: cliente })
        }
    }

    return (
    <View style={styles.subNavBar}>
        <Icon onPress={() => navigation.navigate("main", {client:cliente})} name="home" size={30} color="#00BFFF" style={styles.subNavBar.text}/>
        <Icon onPress={validarHistory}name="history" size={30} color="#00BFFF" style={styles.subNavBar.text}/>
        <Icon onPress={validarCarrito} name="shopping-bag" size={30} style={styles.subNavBar.text}/>
        <Icon onPress={validarPerfil} name="user" size={30} style={styles.subNavBar.text}/>
        {/* 
         //   <Text style={styles.subNavBar.text} onPress={() => navigation.navigate("main", {client:cliente})}>Home</Text>
        }
        <Text style={styles.subNavBar.text}>Historial</Text>
        <Text style={styles.subNavBar.text} onPress={validarCarrito}>Carrito</Text>
        <Text style={styles.subNavBar.text}>Perfil</Text> */}
    </View>
    )
}

export default SubNavBar;