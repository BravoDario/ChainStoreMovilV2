import React from "react";
import { TouchableOpacity, View, Text, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../data/Styles";

const Product = ({ videoGame, cliente }) => {
    const navigation = useNavigation();
    return (
        <View style={{padding: 10}}>
            <TouchableOpacity onPress={() => navigation.navigate("productDetails", { videogame: videoGame, client: cliente })}>
                <View style={styles.producto}>
                    <Image source={{ uri: videoGame.producto.listaFotos[0].foto }}
                        style={{ width: 100, height: 120 }} />
                    <Text style={styles.littleText}>{videoGame.producto.titulo + 
                    "\n$" + videoGame.producto.precio}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Product;