import React from "react"
import { StyleSheet, Alert, Button, Pressable, View, Modal, Text, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import axios from "axios";

import NavBar from "./NavBar";
import SubNavBar from "./SubNavBar";
import styles from "../data/Styles";

const ProductDetails = ({ route }) => {
    const navigation = useNavigation();

    const [modalCompras, setModalCompras] = useState(false);
    const [modalFavoritos, setModalFavoritos] = useState(false);
    const [modalCarrito, setModalCarrito] = useState(false);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [text, setText] = useState();
    const [content, setContent] = useState();

    const [cantCompra, setCantCompra] = useState(0);
    const [cantCarrit, setCantCarrit] = useState(0);

    let videojuego;
    route.params ? videojuego = route.params.videogame : videojuego = null;

    let cliente;
    route.params ? cliente = route.params.client : cliente = null;

    let coords = {
        lat: 0,
        long: 0
    }, store = {
        lat: 21.1259214,
        long: -101.6832418
    }

    useEffect(() => {
        getContenido();
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const calculateDistance = () => {
        if (errorMsg) {
            text = errorMsg;
        } else if (location) {
            coords = {
                lat: location.coords.latitude,
                long: location.coords.longitude
            }
        }
    }

    const calcularPrecio = (cantidadProducto) => {
        calculateDistance();
        let theta = store.long - coords.long;
        let distance = 60 * 1.1515 * (180 / Math.PI) * Math.acos(Math.sin(store.lat * (Math.PI / 180)) * Math.sin(coords.lat * (Math.PI / 180)) + Math.cos(store.lat * (Math.PI / 180)) * Math.cos(coords.lat * (Math.PI / 180)) * Math.cos(theta * (Math.PI / 180)));
        let distancia = Math.round(distance * 1.609344, 4)
        let costoKM = 19.36;
        let costoEnvio = distancia * costoKM;
        let costoTot;
        let costoTemp;

        costoTemp = videojuego.producto.precio * cantidadProducto;

        costoTot = costoEnvio + costoTemp

        setText("Distancia de envío: " + distancia +
            " Km\nCosto del juego: $ " + costoTemp +
            "\nCosto del envío: $" + costoEnvio +
            "\nCosto Total: $ " + costoTot);
    }

    function getCantidadCarrito(change, cantidad) {
        if (change === "+") {
            cantidad++;
        } else if (change === "-") {
            cantidad--;
        }
        setCantCarrit(cantidad)
        calcularPrecio(cantidad)
        console.log(cantCarrit);
    }

    const getCantidadCompra = (change, cantidad) => {
        if (change === "+") {
            cantidad++;
        } else if (change === "-") {
            cantidad--;
        }
        setCantCompra(cantidad)
        calcularPrecio(cantidad)
    }

    const validarCompra = () => {
        if (cliente === null) {
            Alert.alert("Es necesario iniciar sesión.");
            navigation.navigate("login")
        } else {
            setModalCompras(true);
            calcularPrecio()
        }
    }

    const validarCarrito = () => {
        if (cliente === null) {
            Alert.alert("Es necesario iniciar sesión.");
            navigation.navigate("login")
        } else {
            setModalCarrito(true);
        }
    }

    const addCarritoCompras = () => {
        let carritoCompra = {
            idCarrito: 0,
            fecha: new Date().toLocaleDateString('en-US'),
            idCliente: cliente.idCliente,
            idProducto: videojuego.producto.idProducto,
            cantidad: cantCarrit,
            comprado: 0
        }
        const url = "http://192.168.0.9:8080/shopping/addShoppingCar";

        axios.post(url, carritoCompra)
            .then(function (response) {
                Alert.alert("Confirmación", "Su producto se agregó exitosamente")
            })
            .catch(function (error) {
                Alert.alert("Error", "Su producto no se agregó, intente más tarde")
            });
    }

    const comprarAhora = () => {
        calculateDistance();
        let compra = {
            idCompra: 0,
            cantidad: cantCompra,
            precioUnitario: videojuego.producto.precio,
            latitud: coords.lat,
            longitud: coords.long,
            idCarrito: 0,
            fecha: new Date().toLocaleDateString('en-US'),
            idCliente: cliente.idCliente,
            idProducto: videojuego.producto.idProducto
        }
        console.log(JSON.stringify(compra));
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
    }

    const getContenido = () => {
        let texto = "";
        if (videojuego.desarrollado !== undefined) texto += videojuego.desarrollado + "\n" + videojuego.clasificacion + "\n" + videojuego.genero

        if (videojuego.almacenamiento !== undefined) {
            texto += videojuego.almacenamiento + "\n"
            videojuego.control ? texto += "Con control" : texto += "Sin control"
            "\n" + videojuego.resolucion + "\n" + videojuego.ram + "\n" + videojuego.tipoDeMemoria
        }

        if (videojuego.inalambrico !== undefined) videojuego.inalambrico ? texto += "Inalámbrico" : texto += "Alámbrico"

        if (videojuego.color !== undefined) {
            texto += "\n" + videojuego.color + "\n" + videojuego.conectoresDeEntrada
            videojuego.vibracion ? texto += "\nCon vibración" : texto += "\nSin vibración";
            videojuego.bluetooth ? texto += "\nCon bluetooth" : texto += "\nSin bluetooth";
        }

        if (videojuego.material !== undefined) texto += "\n" + videojuego.material
        setContent(texto);
    }
    
    return (
        <View style={styles.bdyHome}>
            <NavBar Client={cliente} />
            <Modal
                id="Compra"
                animationType="slide"
                transparent={true}
                visible={modalCompras}
                onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalCompras(!modalCompras); }}>
                <View style={styles.productoDetalle.modal}>
                    <Text style={styles.productoDetalle.modal.text}>Usted comprará: {videojuego.producto.titulo + "\n"}¿Cuántos comprará?</Text>
                    <View style={{ flexDirection: "row", width: 200, margin: 10 }}>
                        <Text style={styles.productoDetalle.modal.cantidad} onPress={() => getCantidadCompra("-", cantCompra)}>-</Text>
                        <Text style={styles.productoDetalle.modal.cantidad}>{cantCompra}</Text>
                        <Text style={styles.productoDetalle.modal.cantidad} onPress={() => getCantidadCompra("+", cantCompra)}>+</Text>
                    </View>
                    <Text style={styles.productoDetalle.modal.text}>{text}</Text>
                    <Text style={styles.buttons} onPress={() => {
                        Alert.alert('Confirmación', 'Usted comprará este producto ahora', [{
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => comprarAhora() },]);
                    }}>Comprar ahora</Text>
                    <Text style={[styles.buttons.close]} onPress={() => setModalCompras(!modalCompras)}>Volver</Text>
                </View>
            </Modal>
            <Modal
                id="Carrito"
                animationType="slide"
                transparent={true}
                visible={modalCarrito}
                onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalCarrito(!modalCarrito); }}>
                <View style={styles.productoDetalle.modal}>
                    <Text style={styles.productoDetalle.modal.text}>Se agregarán: {videojuego.producto.titulo} al carrito de compras</Text>
                    <View style={{ flexDirection: "row", width: 200, margin: 10 }}>
                        <Text style={styles.productoDetalle.modal.cantidad} onPress={() => {
                            getCantidadCarrito("-", cantCarrit);
                        }}>-</Text>
                        <Text style={styles.productoDetalle.modal.cantidad}>{cantCarrit}</Text>
                        <Text style={styles.productoDetalle.modal.cantidad} onPress={() => {
                            getCantidadCarrito("+", cantCarrit);
                        }}>+</Text>
                    </View>
                    <Text style={styles.productoDetalle.modal.text}>{text}</Text>
                    <Text style={styles.buttons} onPress={() => {
                        Alert.alert('Confirmación', 'Se agregará este producto a su carrito de compras', [{
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => addCarritoCompras() },]);
                    }}>Agregar</Text>
                    <Text style={styles.buttons} onPress={() => navigation.navigate("littleCar", { client: cliente })}>Ir al carrito de compras</Text>
                    <Text style={[styles.buttons, styles.buttons.close]} onPress={() => setModalCarrito(!modalCarrito)}>Volver</Text>
                </View>
            </Modal>
            <ScrollView style={styles.productoDetalle.descriptionContent}>
                <Text style={styles.productoDetalle.tittle}>{videojuego.producto.titulo}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: videojuego.producto.listaFotos[0].foto }}
                        style={{ width: 160, height: 220, margin: 10 }} />
                    <View style={{ width: 135 }} >
                        <Text style={{ fontSize: 20 }}>$ {videojuego.producto.precio
                            + '\n' + videojuego.producto.plataforma
                            + '\n' + videojuego.producto.lanzamiento
                            + '\n' + videojuego.clasificacion
                            + '\n' + videojuego.producto.publicador
                            + '\n' + videojuego.genero}
                        </Text>
                    </View>
                </View>
                <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                    {videojuego.producto.listaFotos.map((foto, index) => { return <Image key={index} source={{ uri: foto.foto }} style={{ margin: 5, width: 100, height: 120 }} /> })}
                </ScrollView>
                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: 20, textAlign: "justify" }}>
                        {"Descripión: \n" + videojuego.producto.descripcion + "\n"
                            + "\nCondición: " + videojuego.producto.condicion
                            + "\nGarantía: " + videojuego.producto.garantia}
                    </Text>
                </View>
                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: 20, textAlign: "justify" }}>{content}</Text>
                </View>
            </ScrollView>
            <View style={styles.productoDetalle.allButton}>
                <View style={styles.productoDetalle.littleButtons}>
                    <Pressable style={styles.productoDetalle} onPress={validarCarrito}>
                        <Text style={styles.productoDetalle.text}>Agregar al carrito</Text>
                    </Pressable>
                    <Pressable style={styles.productoDetalle} onPress={validarCompra}>
                        <Text style={styles.productoDetalle.text}>Comprar ahora</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.productoDetalle} onPress={() => navigation.navigate("main", { client: cliente })}>
                    <Text style={styles.productoDetalle.text}>Volver</Text>
                </Pressable>
            </View>
            <SubNavBar cliente={cliente} />
        </View>
    )
}

export default ProductDetails;