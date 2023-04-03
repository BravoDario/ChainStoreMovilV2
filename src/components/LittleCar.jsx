import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "./NavBar";
import Product from "./Product";
import ListCarritoCompras from "../data/ShoppingCar";
import videogames from "../data/VideoJuegos";
import consolas from "../data/Consoles";
import controles from "../data/Controls";
import accesorios from "../data/Accesories";

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
            controles.map(control => {
                if (control.producto.idProducto === carrito.producto) {
                    localData.push(control)
                }
            })
            accesorios.map(accesorio => {
                if (accesorio.producto.idProducto === carrito.producto) {
                    localData.push(accesorio)
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
                        return (<Product videoGame={data} cliente={cliente} key={index} />)
                    })
                }
                <Button title="volver" onPress={() => navigation.navigate("main", {client:cliente})} />
            </ScrollView>
        </View>
    )
}

export default LittleCar;