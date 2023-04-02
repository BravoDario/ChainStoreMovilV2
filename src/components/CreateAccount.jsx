import React, { useState } from "react";
import { View, Text, Button, TextInput, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import clients from "../data/Client";
import NavBar from "./NavBar";

const CreateAccount = () => {
    const navigation = useNavigation();
    const styles = {
        backgroundColor: "red",
        position: "relative",
        margin: 12,
        padding: 10,
        fontSize: 18
    }

    const [nombre, setNombre] = useState();
    const [primerApellido, setPrimerApellido] = useState();
    const [segundoApellido, setSegundoApellido] = useState();
    const [edad, setEdad] = useState();
    const [nombreUsuario, setNombreUsuario] = useState();
    const [contrasena, setContrasena] = useState();
    const [calle, setCalle] = useState();
    const [colonia, setColonia] = useState();
    const [pais, setPais] = useState();

    const [telefonoMovil, setTelefonoMovil] = useState();
    const [telefonoCasa, setTelefonoCasa] = useState();
    const [email, setEmail] = useState();

    const crearCliente = () => {
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
        clients.push(cliente);
        //console.log(JSON.stringify(cliente));
        navigation.navigate("profile", { Cliente: cliente })
    }

    return (
        <View style={{
            backgroundColor: "#5C5C55", //Gris oscuro
            paddingTop: 60,
            height: "100%",
            width: "100%"
        }}>
            <Button title="Volver" onPress={() => navigation.navigate("main", { verification: false })} />

            <ScrollView style={{
                backgroundColor: "#B9B9B9", //Gris oscuro
                margin: 25
            }}>
                <Text>Crear Cuenta</Text>
                <TextInput
                    style={styles}
                    placeholder="name"
                    onChange={(value) => setNombre(value.nativeEvent.text)}
                    value={nombre} />
                <TextInput
                    style={styles}
                    placeholder="firstLastName"
                    onChange={(value) => setPrimerApellido(value.nativeEvent.text)}
                    value={primerApellido} />
                <TextInput
                    style={styles}
                    placeholder="secondLastName"
                    onChange={(value) => setSegundoApellido(value.nativeEvent.text)}
                    value={segundoApellido} />
                <TextInput
                    style={styles}
                    placeholder="age"
                    onChange={(value) => setEdad(value.nativeEvent.text)}
                    value={edad} />
                <TextInput
                    style={styles}
                    placeholder="userName"
                    onChange={(value) => setNombreUsuario(value.nativeEvent.text)}
                    value={nombreUsuario} />
                <TextInput
                    style={styles}
                    placeholder="password"
                    secureTextEntry={true}
                    onChange={(value) => setContrasena(value.nativeEvent.text)}
                    value={contrasena} />
                <TextInput
                    style={styles}
                    placeholder="street"
                    onChange={(value) => setCalle(value.nativeEvent.text)}
                    value={calle} />
                <TextInput
                    style={styles}
                    placeholder="neighborhood"
                    onChange={(value) => setColonia(value.nativeEvent.text)}
                    value={colonia} />
                <TextInput
                    style={styles}
                    placeholder="country"
                    onChange={(value) => setPais(value.nativeEvent.text)}
                    value={pais} />

                <TextInput
                    style={styles}
                    placeholder="Teléfono móvil"
                    onChange={(value) => setTelefonoMovil(value.nativeEvent.text)}
                    value={telefonoMovil} />
                <TextInput
                    style={styles}
                    placeholder="Teléfono de casa"
                    onChange={(value) => setTelefonoCasa(value.nativeEvent.text)}
                    value={telefonoCasa} />
                <TextInput
                    style={styles}
                    placeholder="Correo electrónico"
                    onChange={(value) => setEmail(value.nativeEvent.text)}
                    value={email} />

                <Button title="Crear Cuenta" onPress={crearCliente} />
                <Button title="volver" onPress={() => navigation.navigate('login')} />
            </ScrollView>
        </View>

    )
}

export default CreateAccount;