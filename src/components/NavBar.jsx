import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState, useEffect } from 'react';
import { Button, Modal, Text, TextInput, View, Pressable } from "react-native";

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
        <View style={{
            flexDirection: 'row',
            height: "7%",
            marginTop: 30,
            backgroundColor: "#EB2300"
        }}>
            <Pressable style={{ margin: 3, flex: 0.3, backgroundColor:"blue" }}  onPress={() => navigation.navigate("main", { client: Client })} >
                <Text>Chain Store</Text>
            </Pressable>
            <View style={{ backgroundColor: "white", margin: 5, flex: 0.7 }} >
                <TextInput placeholder="Buscar"
                    onChange={(value) => {
                        setBuscar(value.nativeEvent.text);
                        if (buscar === null) {
                            setModalBuscar(false)
                        } else {
                            setModalBuscar(true)
                        }
                    }}
                    value={buscar} />
            </View>
            <View style={{ margin: 3, flex: 0.3 }} >
                <Button title={tleName} color="#EB2300" onPress={ver} />
            </View>

            <Modal
                id="Busqueda"
                animationType="slide"
                transparent={true}
                visible={modalBuscar}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalBuscar(!modalBuscar);
                }}>
                <View style={{
                    
                    marginTop:60,
                    paddingTop:60,
                    backgroundColor: "gray",
                    height: 130
                }}>
                    <Pressable
                        style={{ backgroundColor: "green" }}
                        onPress={() => setModalBuscar(!modalBuscar)}>
                        <Text style={{ backgroundColor: "blue" }}>No sirve c':</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    )
}

export default NavBar;