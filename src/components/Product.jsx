import React from "react";
import { TouchableOpacity, View, Text, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Product = ({ videoGame, cliente }) => {
    const navigation = useNavigation();
    return (
        <View style={{
            padding: 10
        }}>
            <TouchableOpacity onPress={() => navigation.navigate("productDetails", { videogame: videoGame, client: cliente })}>
                <View style={{
                    backgroundColor: "#FFF",
                    padding: 10,
                    height: 220,
                    width: 130,
                }}>
                    <Image source={{ uri: videoGame.listaFotos[0].foto }}
                        style={{ width: 100, height: 120 }} />
                    <Text>{videoGame.producto.titulo}</Text>
                    <Text>$ {videoGame.producto.precio}</Text>
                    
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Product;