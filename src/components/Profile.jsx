import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Button, Text, View, ScrollView, Modal, TextInput, TouchableOpacity } from "react-native";
import NavBar from "./NavBar";
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
            //           setComp("Agregue los datos necesarios.");
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
        }
    }

    if (cliente !== null) {
        return (
            <View style={styles.bdyHome}>
                <NavBar Client={cliente} />
                <ScrollView
                    style={{
                        margin: 15,
                        marginBottom: 90,
                    }}>

                    <Text>Bienvenido {cliente.nombre}</Text>

                    <View>
                        <Button title="Carrito de compras" onPress={() => navigation.navigate("littleCar", { client: cliente })}></Button>
                        <Button title="Historial" onPress={() => navigation.navigate("history", { client: cliente })}></Button>

                        <Button title="Ajustes de cuenta" onPress={() => { setModalSettings(true); console.log(JSON.stringify(cliente)); }}></Button>
                        <Button title="Cerrar sesión" onPress={() => navigation.navigate("main", { client: null })} />
                        <Button title="Volver" onPress={() => navigation.navigate("main", { client: cliente })} />
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
            </View >
        )
    } else return navigation.navigate("main", { client: null })
}
export default Profile;