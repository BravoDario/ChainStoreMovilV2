import React from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Clients from "../data/Client";

export default function Login({ route }) {
    const navigation = useNavigation();
    const [user, setUser] = useState();
    const [pass, setPass] = useState();
    const [comp, setComp] = useState();

    const login = () => {
        Clients.map(cliente => {
            if (user === cliente.userName && pass === cliente.password) {
                navigation.navigate("main", { client: cliente });
            } else {
                setComp("Usuario o contraseña incorrectos");
            }
        })
    }

    return (
        <View style={{
            backgroundColor: "#5C5C55", //Gris oscuro
            paddingTop: 60,
            height: "100%",
            width: "100%"
        }}>
            <Button title="Volver" onPress={() => navigation.navigate("main", { client:null })} />
            <View style={{
                backgroundColor: "#D9D9D9",
                margin: 30,
                borderWidth: 30,
                borderColor: "#D9D9D9"
            }}>
                <Text style={{ fontWeight: "bold", fontSize: 27, textAlign: "center" }}>
                    Login
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 24, marginTop: 10 }}>
                    Username:
                </Text>
                <TextInput
                    style={{
                        height: 40,
                        margin: 12,
                        padding: 10,
                        fontSize: 20
                    }}
                    placeholder="Username"
                    onChange={(value) => setUser(value.nativeEvent.text)}
                    value={user}
                />
                <Text style={{ fontWeight: "bold", fontSize: 24 }}>Password:</Text>
                <TextInput
                    style={{
                        height: 40,
                        margin: 12,
                        padding: 10,
                        fontSize: 20
                    }}
                    placeholder="password"
                    secureTextEntry={true}
                    onChange={(value) => setPass(value.nativeEvent.text)}
                    value={pass}
                />
                <Button title="Login" onPress={login} > Texto</Button>
                <Text style={{ fontWeight: "bold", fontSize: 24, textAlign: "center", color: "red" }}>{comp}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 24 }}>¿No tienes cuenta? Cree una...</Text>
                <Button title="Crear Cuenta" onPress={() => navigation.navigate("createAccount")} />
            </View>
        </View>
    )
}