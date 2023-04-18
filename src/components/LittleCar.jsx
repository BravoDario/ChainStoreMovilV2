import React, { useRef, useState, useEffect } from "react";
import { Alert, View, Text, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Location from 'expo-location';
import NavBar from "./NavBar";
import Product from "./Product";
import SubNabVar from "./SubNavBar";
import styles from "../data/Styles";

const LittleCar = ({ route }) => {
    const ref = useRef(null);
    const [count, setCount] = useState(0);

    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [carritos, setCarritos] = useState([]);

    let coords = {
        lat: 0,
        long: 0
    }, store = {
        lat: 21.1259214,
        long: -101.6832418
    }

    let cliente;
    route.params ? cliente = route.params.client : cliente = null;

    useEffect(() => {
        const path = "http://192.168.0.9:8080/shopping/getShoppingCars?idCliente=" + cliente.idCliente;
        axios.get(path)
            .then(function (response) {
                setCarritos(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })
    }, []);

    const comprarTodo = () => {
        let compraCarrito = {
            compraCarrito: 0,
            idCliente: cliente.idCliente,
            productos: localData
        }
        let compra = {
            //idCompra,
            cantidad,
            precioUnitario,
            latitud,
            longitud,
            //idCarrito,
            fecha
        }
    }

    const calculateDistance = () => {
        if (errorMsg) {
            Alert.alert(errorMsg);
        } else if (location) {
            coords = {
                lat: location.coords.latitude,
                long: location.coords.longitude
            }
        }
    }

    const calcularPrecio = (precio, cantidad) => {
        calculateDistance();
        let theta = store.long - coords.long;
        let distance = 60 * 1.1515 * (180 / Math.PI) * Math.acos(Math.sin(store.lat * (Math.PI / 180)) * Math.sin(coords.lat * (Math.PI / 180)) + Math.cos(store.lat * (Math.PI / 180)) * Math.cos(coords.lat * (Math.PI / 180)) * Math.cos(theta * (Math.PI / 180)));
        let distancia = Math.round(distance * 1.609344, 4)
        let costoKM = 19.36;
        let costoEnvio = distancia * costoKM;
        let costoTot;
        let costoTemp;

        costoTemp = precio * cantidad;

        costoTot = costoEnvio + costoTemp
        return costoTot;
    }

    const comprarAhora = (carrito) => {
        let compra = {
            idCompra: 0,
            cantidad: carrito.cantidad,
            precioUnitario: calcularPrecio(carrito.producto.precio, carrito.cantidad),
            latitud: coords.lat,
            longitud: coords.long,
            idCarrito: carrito.idCarrito,
            fecha: new Date().toLocaleDateString('en-US'),
            idCliente: cliente.idCliente,
            idProducto: carrito.producto.idProducto
        }
        
        const url = "http://192.168.0.9:8080/shopping/addCompra";

        axios.post(url, compra)
            .then(function (response) {
                if (response.data === true) {
                    Alert.alert("Confirmación", "Seleccione su método de pago c:");
                    navigation.navigate("payMethod");
                } else {
                    Alert.alert("Error", "Su compra no pudo ser realizada, intente más tarde :c")
                }
            })
            .catch(function (error) {
                Alert.alert("Error", "Su compra no pudo ser realizada, intente más tarde :c")
            });

        //navigation.navigate("littleCar", { client: cliente });
    }

    const quitarCarrito = (idCarrito) => {
        let path = "http://192.168.0.9:8080/shopping/removeShoppingCar?idCarrito=" + idCarrito;
        console.log(path);
        axios.get(path)
            .then(function (response) {
                if (response.data === "ok") {
                    Alert.alert("Confirmación", "Su producto quedó fuera del carrito c:");
                } else {
                    Alert.alert("Error", "Su operación no pudo ser realizada, intente más tarde :c")
                }
            })
            .catch(function (error) {
                Alert.alert("Error", "Su operación no pudo ser realizada, intente más tarde :c")
            });
    }

    return (
        <View style={styles.body}>
            <NavBar Client={cliente} />
            <ScrollView ref={ref} style={styles.body.grandContainer}>
                <Text style={styles.productoDetalle.tittle}>Carrito de compras {"\n"}
                    Bienvenido {cliente.nombre}</Text>
                {
                    carritos.map((data) => {
                        return (
                            <View style={{ flexDirection: "row", backgroundColor: "white", borderRadius: 5, marginBottom: 10 }} key={data.idCarrito}>
                                
                                <Product videoGame={data} cliente={cliente} />
                                
                                <View style={{ width: 140, paddingTop: 30 }}>
                                    <Text style={styles.buttons} onPress={() => {
                                        Alert.alert('Confirmación', 'Usted comprará este producto ahora', [{
                                            text: 'Cancelar',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel',
                                        },
                                        { text: 'OK', onPress: () => comprarAhora(data) },]);
                                    }}>
                                        Comprar ahora
                                    </Text>
                                
                                    <Text style={styles.buttons.close} onPress={() => {
                                        Alert.alert('Confirmación', 'Se quitará este producto de su carrito de compras', [{
                                            text: 'Cancelar',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel',
                                        },
                                        { text: 'OK', onPress: () => quitarCarrito(data.idCarrito) },]);
                                    }}>
                                        Quitar del carrito
                                    </Text>
                                    <Text style={styles.littleText}>
                                        {
                                            "Cantidad: " + data.cantidad + 
                                            "\nTotal: $"+ data.producto.precio
                                        }
                                    </Text>
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