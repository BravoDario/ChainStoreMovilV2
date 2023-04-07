import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import NavBar from "./NavBar";
import Product from "./Product";
import SubNabVar from "./SubNavBar";
import styles from "../data/Styles";
//import ListCarritoCompras from "../data/ShoppingCar";
import videogames from "../data/VideoJuegos";
import consolas from "../data/Consoles";
import controles from "../data/Controls";
import accesorios from "../data/Accesories";

const LittleCar = ({ route }) => {
    const navigation = useNavigation();
    const [carrito, setCarrito] = useState([]);

    let cliente;
    route.params ? cliente = route.params.client : cliente = null;

    useEffect(() => {
        const path = "http://192.168.0.9:8080/shopping/getShoppingCars?idCliente=" + cliente.idCliente;
        axios.get(path)
            .then(function (response) {
                setCarrito(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const comprarTodo = () => {
        let compraCarrito = {
            compraCarrito: 0,
            idCliente: cliente.idCliente,
            productos: localData
        }
        let compra = {
            idCompra,
            cantidad,
            precioUnitario,
            latitud,
            longitud,
            idCarrito,
            fecha
        }
    }
    return (
        <View style={styles.body}>
            <NavBar Client={cliente} />
            <ScrollView style={styles.body.grandContainer}>
                <Text style={styles.productoDetalle.tittle}>Carrito de compras {"\n"}
                    Bienvenido {cliente.nombre}</Text>
                {
                    carrito.map((data, index) => {
                        console.log(data.producto);
                        return (
                            <View style={{ flexDirection: "row", backgroundColor: "white", borderRadius: 5, marginBottom: 10 }} key={{ index }}>
                                <Product videoGame={data} cliente={cliente} />
                                <View style={{ width: 140, paddingTop: 30 }}>
                                    <Text style={styles.buttons}>Comprar ahora</Text>
                                    <Text style={styles.buttons.close}>Quitar del carrito</Text>
                                </View>
                            </View>
                        )
                    })
                }
                <Text style={styles.buttons} onPress={comprarTodo}>Comprar todo</Text>
                <Text style={styles.buttons.close} onPress={() => navigation.navigate("main", { client: cliente })}>Volver</Text>
            </ScrollView>
            <SubNabVar cliente={cliente} />
        </View>
    )
}

export default LittleCar;