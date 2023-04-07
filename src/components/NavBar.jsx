import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState, useEffect } from 'react';
import {Alert, Button, Modal, Image, Text, TextInput, View, Pressable } from "react-native";
import styles from "../data/Styles";

const NavBar = ({ Client }) => {
    const navigation = useNavigation();
    const [modalBuscar, setModalBuscar] = useState(false);
    const [buscar, setBuscar] = useState();
    let tleName;

    Client ? tleName = Client.nombre : tleName = "Iniciar Sesión";

    const ver = () => {
        if (Client === null) {
            navigation.navigate("login")
        } else {

            navigation.navigate("profile", { cliente: Client })
        }
    }

    return (
        <View style={styles.navBar}>
            <Pressable onPress={() => navigation.navigate("main", { client: Client })} >
                <Image source={{ uri: "https://raw.githubusercontent.com/LexzTemptation/ChainStore/main/src/images/ChainStore.png" }} style={styles.navBar.image} />
            </Pressable>
            <View style={styles.navBar.buscar} >
                <TextInput placeholder="Buscar"
                    style={styles.navBar.input}
                    onChange={(value) => {
                        setBuscar(value.nativeEvent.text);
                        if (buscar === "") {
                            setModalBuscar(false)
                        } else {
                            setModalBuscar(true)
                        }
                    }}
                    value={buscar} />
            </View>
            <Pressable style={styles.navBar.contProfil} onPress={ver}>
                <Text style={styles.navBar.textProfil}>{tleName}</Text>
            </Pressable>

            <Modal
                id="Busqueda"
                animationType="slide"
                transparent={true}
                visible={modalBuscar}
                onRequestClose={() => {
                    setBuscar("")
                    setModalBuscar(!modalBuscar);
                }}>
                <View style={styles.navBar}>
                    <Pressable onPress={() => navigation.navigate("main", { client: Client })} >
                        <Image source={{ uri: "https://raw.githubusercontent.com/LexzTemptation/ChainStore/main/src/images/ChainStore.png" }} style={styles.navBar.image} />
                    </Pressable>
                    <View style={{ margin: 5, flex: 0.7, }} >
                        <TextInput placeholder="Buscar"
                            style={styles.navBar.input}
                            onChange={(value) => {
                                setBuscar(value.nativeEvent.text);
                                if (buscar === "") {
                                    setModalBuscar(false)
                                } else {
                                    setModalBuscar(true)
                                }
                            }}
                            value={buscar} />
                    </View>
                    <Pressable style={styles.navBar.contProfil} onPress={ver}>
                        <Text style={styles.navBar.textProfil}>{tleName}</Text>
                    </Pressable>
                </View>
                <View style={{
                    marginTop: 60,
                    paddingTop: 60,
                    backgroundColor: "gray",
                    height: 130
                }}>
                    <Pressable
                        style={{ backgroundColor: "green" }}
                        onPress={() => setModalBuscar(!modalBuscar)}>
                        <Text style={{ backgroundColor: "blue" }}>{buscar}</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    )
}

export default NavBar;