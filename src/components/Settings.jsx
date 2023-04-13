import React from "react";
import { Alert, ScrollView, Text, TextInput, View, StyleSheet, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import NavBar from "./NavBar";
import styles from "../data/Styles";
import axios from "axios";

export default function Settings({ route }) {
    const navigation = useNavigation();
    const [user, setUser] = useState();
    const [pass, setPass] = useState();
    const [comp, setComp] = useState();
    const [stylesE, setStylesE] = useState();
    const [stylesI, setStylesI] = useState(styles.login.inputNormal);

    const styleError = StyleSheet.create({ fontWeight: "bold", fontSize: 24, textAlign: "center", color: "red" })

    const login = () => {
        const url = "http://192.168.0.9:8080/login/user";
        const datos = {
            userName: user,
            password: pass
        }
        axios.post(url, datos)
            .then(function (response) {
                let cliente = response.data
                if (cliente.nombreUsuario === null) {
                    setPass("");
                    setUser("");
                    setStylesI(styles.login.error.inputError);
                    setStylesE(styles.login.error.text);
                    setComp("Usuario o contraseña incorrectos");
                }
                else {
                    Alert.alert("Bienvenido " + cliente.nombre)
                    navigation.navigate("main", { client: cliente });
                }
            })
            .catch(function (error) {console.log(error);});
    }
    return (
        <View style={styles.bdyHome2}>
            <ScrollView style={styles.login}>
                <Text style={styles.buttons.close} onPress={() => navigation.navigate("main", { client: null })}>Volver</Text>

                <Text style={[styles.login.text, { textAlign: "center" }]}>Iniciar sesión</Text>
                <Text style={stylesE}>{comp}</Text>
                <Text style={styles.login.text}>Nombre de usuario:</Text>

                <TextInput
                    style={stylesI}
                    placeholder="Username"
                    onChange={(value) => setUser(value.nativeEvent.text)}
                    value={user}
                />
                <Text style={styles.login.text}>Contraseña:</Text>
                <TextInput
                    style={stylesI}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChange={(value) => setPass(value.nativeEvent.text)}
                    value={pass}
                />
                <Text onPress={login} style={styles.buttons}>Entrar</Text>

                <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 15 }}>¿No tienes cuenta? Cree una...</Text>
                <Text onPress={() => navigation.navigate("createAccount")} style={styles.buttons.close}>Crear cuenta</Text>
            </ScrollView>
        </View>
    )
}