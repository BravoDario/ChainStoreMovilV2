import React from "react"
import { Alert, Button, StyleSheet, Pressable, View, Modal, Text, Image, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "./NavBar";
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import ListCarritoCompras from "../data/ShoppingCar";

const ProductDetails = ({ route }) => {
    const navigation = useNavigation();

    const [modalCompras, setModalCompras] = useState(false);
    const [modalFavoritos, setModalFavoritos] = useState(false);
    const [modalCarrito, setModalCarrito] = useState(false);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    
    const [text, setText] = useState();
    const [cantCompra, setCantCompra] = useState();
    const [cantCarrit, setCantCarrit] = useState();

    let videojuego;
    route.params ? videojuego = route.params.videogame : videojuego = null;

    let cliente;
    route.params ? cliente = route.params.client : cliente = null;

    let coords = {
        lat: 0,
        long: 0
    } , store = {
        lat: 21.1259214,
        long: -101.6832418
    }

    let ind = ListCarritoCompras.length;

    useEffect(() => {
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
            setText(location.coords.latitude + ", " + location.coords.longitude);
        }
    }

    const calcularPrecio = () => {
        console.log(cantCompra)
        calculateDistance();
        let theta = store.long - coords.long;
        let distance = 60 * 1.1515 * (180 / Math.PI) * Math.acos(Math.sin(store.lat * (Math.PI / 180)) * Math.sin(coords.lat * (Math.PI / 180)) + Math.cos(store.lat * (Math.PI / 180)) * Math.cos(coords.lat * (Math.PI / 180)) * Math.cos(theta * (Math.PI / 180)));
        let distancia = Math.round(distance * 1.609344, 3)
        let costoKM = 19.36;
        let costoEnvio = distancia * costoKM;
        let costoTot;
        let costoTemp;
        
        if(modalCarrito === true){
            costoTemp = videojuego.producto.precio * parseInt(cantCarrit);
        } else if (modalCompras === true){
            costoTemp = videojuego.producto.precio * parseInt(cantCompra);
        }
        
        costoTot = costoEnvio + costoTemp

        setText("Distancia de envío: " + distancia +
            " Km\nCosto del juego: $ " + costoTemp +
            "\nCosto del envío: $" + costoEnvio +
            "\nCosto Total: $ " + costoTot);
    }

    const validarCompra = () => {
        if (cliente === null) {
            navigation.navigate("login")
        } else {
            setModalCompras(true);
            setCantCompra("1")
            calcularPrecio()
        }
    }

    const validarwish = () => {
        if (cliente === null) {
            navigation.navigate("login")
        } else {
            setModalFavoritos(true);
        }
    }

    const validarCarrito = () => {
        if (cliente === null) {
            navigation.navigate("login")
        } else {
            setCantCarrit(1)
            setModalCarrito(true);
            calcularPrecio()
        }
    }

    const addCarritoCompras = () => {
        ind++;
        calcularPrecio();
        let carritoCompra = {
            idCarrito: ind,
            fecha: new Date().toLocaleDateString('en-US'),
            idCliente: cliente.idCliente,
            producto: videojuego.producto.idProducto
        }
        //Alerta
        ListCarritoCompras.push(carritoCompra)
        console.log(ListCarritoCompras);
        //se usa el rest para añadir a favoritos
    }

    const comprarAhora = () => {
        calcularPrecio()
        let compra = {
            idCompra: 0,
            cantidad: cantCompra,
            precioUnitario: videojuego.producto.precio,
            latitud: store.lat,
            longitud: coords.long,
            idCarrito: 0,
            fecha: new Date().toLocaleDateString('en-US')
        }
        //se usa el rest de compra
    }

    return (
        <View style={{ backgroundColor: "#5C5C55" }}>
            <NavBar Client={cliente} />
            {/*desarrollado trailer*/}
            <Modal
                id="Compra"
                animationType="slide"
                transparent={true}
                visible={modalCompras}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalCompras(!modalCompras);
                }}>
                <View style={{
                    backgroundColor: "#B9B9B9DD",
                    marginTop: 60,
                    height: "100%",
                    padding: 30
                }}>
                    <Text style={{}}>Usted comprará: {videojuego.producto.titulo}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text>¿Cuántos comprará?</Text>
                        <TextInput
                            placeholder="Cantidad"
                            onChange={(value) => { 
                                setCantCompra(value.nativeEvent.text); 
                                calcularPrecio() 
                            }}
                            value={cantCompra} />
                    </View>
                    <Text>{text}</Text>
                    <Button style={[styles.button, styles.buttonClose]} title="Comprar" onPress={comprarAhora} />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalCompras(!modalCompras)}>
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
            </Modal>
            <Modal
                id="Favoritos"
                animationType="slide"
                transparent={true}
                visible={modalFavoritos}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalFavoritos(!modalFavoritos);
                }}>

                <View style={{
                    backgroundColor: "#D9D9D9DD",
                    marginTop: 60,
                    padding: 30,
                    height: "100%"
                }}>
                    <Text style={{}}>Se agregará: {videojuego.producto.titulo} a la lista de favoritos</Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalFavoritos(!modalFavoritos)}>
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                    <Button title="Comprar" onPress={calculateDistance} />
                    <Text>{text}</Text>
                </View>
            </Modal>
            <Modal
                id="Carrito"
                animationType="slide"
                transparent={true}
                visible={modalCarrito}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalCarrito(!modalCarrito);
                }}>

                <View style={{
                    backgroundColor: "#B9B9B9DD",
                    marginTop: 60,
                    height: "100%",
                    padding: 30
                }}>
                    <Text style={{}}>Se agregará: {videojuego.producto.titulo} al carrito de compras</Text>
                    <TextInput
                            placeholder="Cantidad"
                            defaultValue="0"
                            onChange={(value) => { setCantCarrit(value.nativeEvent.text); }}
                            value={cantCarrit}  />
                    <Text>{text}</Text>
                    <Button title="Agregar" onPress={addCarritoCompras} />
                    <Button title="Ir al carrito de compras" onPress={() => navigation.navigate("littleCar", { client: cliente })} />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalCarrito(!modalCarrito)}>
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
            </Modal>
            <ScrollView style={{
                margin: 15,
                marginBottom: 90,
                backgroundColor: "white"
            }}>
                <Text style={{ fontWeight: "bold", fontSize: 27, padding: 15 }}>{videojuego.producto.titulo}</Text>
                <View style={{ flexDirection: 'row' }}>

                    <Image source={{ uri: videojuego.listaFotos[0].foto }}
                        style={{ width: 160, height: 220, margin: 10 }} />
                    <View style={{ marginTop: 10, width: 135 }} >
                        <Text style={{ fontSize: 20 }}>$ {videojuego.producto.precio
                            + '\n' + videojuego.producto.plataforma
                            + '\n' + videojuego.producto.lanzamiento
                            + '\n' + videojuego.clasificacion
                            + '\n' + videojuego.producto.publicador
                            + '\n' + videojuego.genero}</Text>
                    </View>
                </View>
                <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                    {videojuego.listaFotos.map((foto, index) => { return <Image key={index} source={{ uri: foto.foto }} style={{ margin: 5, width: 100, height: 120 }} /> })}
                </ScrollView>
                <View style={{
                    margin: 10,
                }}>
                    <Text style={{ fontSize: 20, textAlign: "justify" }}>{"Descripión: \n" + videojuego.producto.descripcion + "\n"
                        + "\nCondición: " + videojuego.producto.condicion
                        + "\nGarantía: " + videojuego.producto.garantia}</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 10
                    }}>
                        <View style={{ margin: 3, flex: 0.4 }} >
                            <Button title="Agregar al carrito" onPress={validarCarrito}></Button>
                        </View>
                        <View style={{ margin: 3, flex: 0.4 }} >
                            <Button title="Agregar a favoritos" onPress={validarwish}></Button>
                        </View>
                        <View style={{ margin: 3, flex: 0.4 }} >
                            <Button title="Comprar ahora" onPress={validarCompra}></Button>
                        </View>
                    </View>
                    <Button title="volver" onPress={() => navigation.navigate("main", {client:cliente})} />
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default ProductDetails;