import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "./NavBar";
import Product from "./Product";
import ListCarritoCompras from "../data/ShoppingCar";
import videogames from "../data/VideoJuegos";
import consolas from "../data/Consoles";

const LittleCar = ({ route }) => {

    const navigation = useNavigation();

    let cliente;
    route.params ? cliente = route.params.client : cliente = null;

    let localData = [];


    ListCarritoCompras.map(carrito => {
        if (carrito.idCliente === cliente.idCliente) {
            videogames.map(videojuego => {
                if (videojuego.producto.idProducto === carrito.producto) {
                    localData.push(videojuego)
                }
            })
            consolas.map(consola => {
                if (consola.producto.idProducto === carrito.producto) {
                    localData.push(consola)
                }
            })
        }
    })

    return (
        <View>
            <NavBar Client={cliente} />
            <ScrollView style={{
                margin: 15,
                marginBottom: 90,
                backgroundColor: "white"
            }}>
                <Text>Carrito</Text>
                <Text>Bienvenido {cliente.nombre}</Text>
                {
                    localData.map((data, index) => {
                        return (<Product videoGame={data} client={cliente} key={index} />)
                    })
                }
                <Button title="volver" onPress={() => navigation.navigate('main')} />
            </ScrollView>
        </View>
    )
}

export default LittleCar;