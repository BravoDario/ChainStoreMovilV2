import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Button, Text, View, ScrollView, Modal, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import NavBar from "./NavBar";
import SubNavBar from "./SubNavBar";
import styles from "../data/Styles";

const Profile = ({ route }) => {
    const navigation = useNavigation();

    let cliente;
    route.params ? cliente = route.params.client : cliente = null;

    const [modalSettings, setModalSettings] = useState(false);
    const [stylesE, setStylesE] = useState();
    const [stylesI, setStylesI] = useState(styles.login.inputNormal);

    const [nombre, setNombre] = useState(cliente.nombre);
    const [primerApellido, setPrimerApellido] = useState(cliente.primerApellido);
    const [segundoApellido, setSegundoApellido] = useState(cliente.segundoApellido);
    const [edad, setEdad] = useState(cliente.edad.toString());
    const [nombreUsuario, setNombreUsuario] = useState(cliente.nombreUsuario);
    const [contrasenia, setContrasenia] = useState(cliente.contrasenia);
    const [calle, setCalle] = useState(cliente.calle);
    const [colonia, setColonia] = useState(cliente.colonia);
    const [pais, setPais] = useState(cliente.pais);
    const [telefonoMovil, setTelefonoMovil] = useState(cliente.telefonoMovil);
    const [telefonoCasa, setTelefonoCasa] = useState(cliente.telefonoCasa);
    const [email, setEmail] = useState(cliente.email);


    function validarCliente() {
        if (nombre === "" ||
            primerApellido === "" ||
            segundoApellido === "" ||
            edad === "" ||
            nombreUsuario === "" ||
            contrasenia === "" ||
            calle === "" ||
            colonia === "" ||
            pais === "" ||
            telefonoMovil === "" ||
            telefonoCasa === "" ||
            email === "") {
            return false
        } else return true
    }

    const actualizarCliente = () => {

        let validar = validarCliente()
        if (validar === false) {
            setStylesI(styles.login.error.inputError);
            setStylesE(styles.login.error.text);
        } else {
            let newCliente = {
                idCliente: cliente.idCliente,
                nombre,
                primerApellido,
                segundoApellido,
                edad,
                nombreUsuario,
                contrasenia,
                calle,
                colonia,
                pais,
                telefonoMovil,
                telefonoCasa,
                email
            }
            console.log(JSON.stringify(newCliente));
            updateCliente(newCliente);
        }
    }
    const updateCliente = (currentCliente) => {
        const url = "http://10.16.9.63:8080/cliente/actualizar";
        axios.post(url, currentCliente)
            .then(function (response) {
                if (response.data === true) {
                    Alert.alert("Datos guardados")
                    setModalSettings(!modalSettings);
                } else {
                    Alert.alert("Algo ha salido mal, intente más tarde");
                }
            })
            .catch(function (error) { console.log(error); });
    }

    if (cliente !== null) {
        return (
            <View style={styles.bdyHome}>
                <NavBar Client={cliente} />
                <ScrollView
                    style={styles.productoDetalle.descriptionContent}>

                    <Text style={styles.productoDetalle.tittle}>Bienvenido {cliente.nombre}</Text>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("littleCar", { client: cliente })}>
                            <View style={[styles.buttons, { height: 110, flexDirection: "row" }]}>
                                <Icon name="shopping-bag" size={50} color="#FFF" style={{ paddingLeft: 15, paddingTop: 20 }} />
                                <View>
                                    <Text style={{
                                        backgroundColor: "#1DB2E5",
                                        color: "white",
                                        width: "45%",
                                        height: 30,
                                        margin: 5,
                                        borderRadius: 5,
                                        textAlign: "center",
                                        fontSize: 18
                                    }}>Carrito de compras</Text>
                                    <Text style={[styles.littleText, { width: "50%", paddingLeft: 20 }]}>Ve al carrito de compras para adquirir tus productos deseados.</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("history", { client: cliente })}>
                            <View style={[styles.buttons, { height: 110, flexDirection: "row" }]}>
                                <Icon name="clock-o" size={50} color="#FFF" style={{ paddingLeft: 15, paddingTop: 20 }} />
                                <View>
                                    <Text style={{
                                        backgroundColor: "#1DB2E5",
                                        color: "white",
                                        width: "45%",
                                        height: 30,
                                        margin: 5,
                                        borderRadius: 5,
                                        textAlign: "center",
                                        fontSize: 18
                                    }}>Historial de compras</Text>
                                    <Text style={[styles.littleText, { width: "50%", paddingLeft: 20 }]}>Observa todos los productos que has adquirido con nosotros.</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setModalSettings(true); console.log(JSON.stringify(cliente)); }}>
                            <View style={[styles.buttons, { height: 110, flexDirection: "row" }]}>
                                <Icon name="cog" size={50} color="#FFF" style={{ paddingLeft: 15, paddingTop: 20 }} />
                                <View>
                                    <Text style={{
                                        backgroundColor: "#1DB2E5",
                                        color: "white",
                                        width: "45%",
                                        height: 30,
                                        margin: 5,
                                        borderRadius: 5,
                                        textAlign: "center",
                                        fontSize: 18
                                    }}>Ajustes de cuenta</Text>
                                    <Text style={[styles.littleText, { width: "60%", paddingLeft: 20 }]}>Observa y verifica que tus datos son correctos.</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            Alert.alert("Confirmación", "¿Está seguro de  cerrar sesión?", [{
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'OK', onPress: () =>
                                    navigation.navigate("main", { client: null })
                            },])
                        }}>
                            <Text style={styles.buttons.close}>Cerrar sesión</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("main", { client: cliente })}>
                            <Text style={styles.buttons.close}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal id="Ajustes"
                        animationType="slide"
                        transparent={true}
                        visible={modalSettings}
                        onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalSettings(!modalSettings); }}>

                        <View
                            style={styles.productoDetalle.modal}>
                            <ScrollView>
                                <TouchableOpacity onPress={() => setModalSettings(!modalSettings)}>
                                    <Text style={styles.buttons.close}>Volver</Text>
                                </TouchableOpacity>

                                <Text style={styles.productoDetalle.modal.text}>Nombre:</Text>
                                <TextInput
                                    style={stylesI}
                                    onChange={(value) => setNombre(value.nativeEvent.text)}
                                    value={nombre}
                                />
                                <Text style={styles.littleText}>Primer Apellido:</Text>
                                <TextInput
                                    style={stylesI}
                                    onChange={(value) => setPrimerApellido(value.nativeEvent.text)}
                                    value={primerApellido}
                                />
                                <Text style={styles.littleText}>Segundo Apellido:</Text>
                                <TextInput
                                    style={stylesI}
                                    onChange={(value) => setSegundoApellido(value.nativeEvent.text)}
                                    value={segundoApellido}
                                />
                                <Text style={styles.littleText}>Edad:</Text>
                                <TextInput
                                    style={stylesI}
                                    onChange={(value) => setEdad(value.nativeEvent.text)}
                                    value={edad}
                                />
                                <Text style={styles.littleText}>Nombre de usuario:</Text>
                                <TextInput
                                    style={stylesI}
                                    onChange={(value) => setNombreUsuario(value.nativeEvent.text)}
                                    value={nombreUsuario}
                                />
                                <Text style={styles.littleText}>Contraseña:</Text>
                                <TextInput
                                    style={stylesI}
                                    secureTextEntry={true}
                                    onChange={(value) => setContrasenia(value.nativeEvent.text)}
                                    value={contrasenia}
                                />
                                <Text style={styles.littleText}>Calle:</Text>
                                <TextInput
                                    style={stylesI}
                                    onChange={(value) => setCalle(value.nativeEvent.text)}
                                    value={calle}
                                />
                                <Text style={styles.littleText}>Colonia:</Text>
                                <TextInput
                                    style={stylesI}
                                    onChange={(value) => setColonia(value.nativeEvent.text)}
                                    value={colonia}
                                />
                                <Text style={styles.littleText}>Pais:</Text>
                                <TextInput
                                    style={stylesI}
                                    onChange={(value) => setPais(value.nativeEvent.text)}
                                    value={pais}
                                />
                                <Text style={styles.littleText}>Número de celular:</Text>
                                <TextInput
                                    style={stylesI}
                                    onChange={(value) => setTelefonoMovil(value.nativeEvent.text)}
                                    value={telefonoMovil}
                                />
                                <Text style={styles.littleText}>Número de teléfono de casa:</Text>
                                <TextInput
                                    style={stylesI}
                                    onChange={(value) => setTelefonoCasa(value.nativeEvent.text)}
                                    value={telefonoCasa}
                                />
                                <Text style={styles.littleText}>Email:</Text>
                                <TextInput
                                    style={stylesI}
                                    onChange={(value) => setEmail(value.nativeEvent.text)}
                                    value={email}
                                />
                                <TouchableOpacity onPress={actualizarCliente}>
                                    <Text style={styles.buttons}>Guardar cambios</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </Modal>
                </ScrollView>
                <SubNavBar cliente={cliente} />
            </View >
        )
    } else return navigation.navigate("main", { client: null })
}
export default Profile;