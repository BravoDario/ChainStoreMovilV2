import React, { useState } from "react";
import { View, Text, Button, TextInput, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import clients from "../data/Client";
import styles from "../data/Styles";
import axios from "axios";

const CreateAccount = () => {
    const navigation = useNavigation();

    const [nombre, setNombre] = useState("");
    const [primerApellido, setPrimerApellido] = useState("");
    const [segundoApellido, setSegundoApellido] = useState("");
    const [edad, setEdad] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [calle, setCalle] = useState("");
    const [colonia, setColonia] = useState("");
    const [pais, setPais] = useState("");

    const [telefonoMovil, setTelefonoMovil] = useState("");
    const [telefonoCasa, setTelefonoCasa] = useState("");
    const [email, setEmail] = useState("");

    const [stylesI, setStylesI] = useState(styles.login.inputNormal);
    const [comp, setComp] = useState();
    const [stylesE, setStylesE] = useState();

    const agregarCliente = (cliente) => {
        const url = "http://192.168.0.9:8080/cliente/insertar";
        axios.post(url, cliente)
            .then(function (response) {
                if (response.data === true) {
                    Alert.alert("Bienvenido " + cliente.nombre)
                    navigation.navigate("main", { client: cliente });
                } else {
                    Alert.alert("Algo ha salido mal, intente más tarde");
                }
            })
            .catch(function (error) { console.log(error); });
    }
    function validarCliente() {
        if (nombre === "" ||
            primerApellido === "" ||
            segundoApellido === "" ||
            edad === "" ||
            nombreUsuario === "" ||
            contrasena === "" ||
            calle === "" ||
            colonia === "" ||
            pais === "" ||
            telefonoMovil === "" ||
            telefonoCasa === "" ||
            email === "") {
            return true
        } else return true
    }

    const crearCliente = () => {
        let validar = validarCliente()
        if (validar === false) {
            setStylesI(styles.login.error.inputError);
            setStylesE(styles.login.error.text);
            setComp("Agregue los datos necesarios.");
        } else {
            let cliente = {
                idCliente: 0,
                nombre,
                primerApellido,
                segundoApellido,
                edad,
                nombreUsuario,
                contrasenia: contrasena,
                calle,
                colonia,
                pais,
                token: "",

                telefonoMovil,
                telefonoCasa,
                email
            }
            agregarCliente(cliente)
            console.log(JSON.stringify(cliente));
        }
    }

    return (
        <View style={styles.bdyHome2}>
            <View style={[styles.login, {}]}>
                <Text style={styles.buttons.close} onPress={() => navigation.navigate("main", { verification: false })}>Salir</Text>
                <Text style={styles.login.text}>Crear Cuenta</Text>
                <ScrollView >
                    <TextInput
                        style={stylesI}
                        placeholder="Nombre"
                        onChange={(value) => setNombre(value.nativeEvent.text)}
                        value={nombre} />
                    <TextInput
                        style={stylesI}
                        placeholder="Primer apellido"
                        onChange={(value) => setPrimerApellido(value.nativeEvent.text)}
                        value={primerApellido} />
                    <TextInput
                        style={stylesI}
                        placeholder="Segundo apellido"
                        onChange={(value) => setSegundoApellido(value.nativeEvent.text)}
                        value={segundoApellido} />
                    <TextInput
                        style={stylesI}
                        placeholder="Edad"
                        onChange={(value) => setEdad(value.nativeEvent.text)}
                        value={edad} />
                    <TextInput
                        style={stylesI}
                        placeholder="Nombre de usuario"
                        onChange={(value) => setNombreUsuario(value.nativeEvent.text)}
                        value={nombreUsuario} />
                    <TextInput
                        style={stylesI}
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        onChange={(value) => setContrasena(value.nativeEvent.text)}
                        value={contrasena} />
                    <TextInput
                        style={stylesI}
                        placeholder="Calle"
                        onChange={(value) => setCalle(value.nativeEvent.text)}
                        value={calle} />
                    <TextInput
                        style={stylesI}
                        placeholder="Colonia"
                        onChange={(value) => setColonia(value.nativeEvent.text)}
                        value={colonia} />
                    <TextInput
                        style={stylesI}
                        placeholder="País"
                        onChange={(value) => setPais(value.nativeEvent.text)}
                        value={pais} />

                    <TextInput
                        style={stylesI}
                        placeholder="Teléfono móvil"
                        onChange={(value) => setTelefonoMovil(value.nativeEvent.text)}
                        value={telefonoMovil} />
                    <TextInput
                        style={stylesI}
                        placeholder="Teléfono de casa"
                        onChange={(value) => setTelefonoCasa(value.nativeEvent.text)}
                        value={telefonoCasa} />
                    <TextInput
                        style={stylesI}
                        placeholder="Correo electrónico"
                        onChange={(value) => setEmail(value.nativeEvent.text)}
                        value={email} />
                    <Text style={stylesE}>{comp}</Text>
                    <Text style={styles.buttons} onPress={crearCliente}>Crear cuenta</Text>
                    <Text style={styles.buttons.close} onPress={() => navigation.navigate('login')}>Cancelar</Text>
                </ScrollView>
            </View>
        </View>
    )
}

export default CreateAccount;