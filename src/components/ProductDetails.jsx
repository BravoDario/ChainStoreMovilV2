import React from "react"
import { Button, StyleSheet, Pressable, View, Modal, Text, Image, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "./NavBar";
import { useState } from "react";

const ProductDetails = ({ route }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    let videojuego;
    route.params ? videojuego = route.params.videogame : videojuego = null;

    let cliente;
    route.params ? cliente = route.params.client : cliente = null;

    const validarCompra = () => {
        if (cliente === null) {
            navigation.navigate("login")
        } else {
            setModalVisible(true)
            //navigation.navigate("payMethod", { verification: route.params.verification })
        }
    }
    const validarwish = () => {
        if (cliente === null) {
            navigation.navigate("login")
        } else {
            navigation.navigate("wish", { verification: route.params.verification, product: videojuego })
        }
    }
    const validarCarrito = () => {
        if (cliente === null) {
            navigation.navigate("login")
        } else {
            navigation.navigate("adLittleCar", { verification: route.params.verification })
        }
    }

    return (
        <View style={{
            backgroundColor: "#5C5C55", //Gris oscuro
        }}>
            <NavBar Client={cliente} />
            {//desarrollado trailer
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>

                <View style={{
                    backgroundColor: "#B9B9B9DD",
                    marginTop: 60,
                    height:"100%"
                }}>
                    <Text style={{}}>Usted comprará: {videojuego.producto.titulo}</Text>
                    <TextInput placeholder="Cantidad" />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
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
                    <Button title="volver" onPress={() => navigation.navigate("main")} />
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