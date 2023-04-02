import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text, View, Image, ScrollView } from "react-native";
import clients from "../data/Client";
import NavBar from "./NavBar";

const Profile = ({ route }) => {
    const navigation = useNavigation();
    let verification;
    route.params ? verification = route.params.verification : verification = null;

    let client;
    route.params ? client = route.params.cliente : client = null;

    if (client !== null) {
        return (
            <View>
                <NavBar Client={client} />
                <ScrollView
                    style={{ paddingTop: 30 }}>

                    <Text>Perfil</Text>
                    <Image source={{ uri: 'https://cdmx.com/wp-content/uploads/2019/08/pedro-sola-65433.png' }}
                        style={{ width: 100, height: 100, alignItems: "center" }} />
                    <Text style={{ paddingTop: 10 }}>Nombre:</Text>
                    <Text>{client.nombre}</Text>
                    <Text style={{ paddingTop: 10 }}>Primer Apellido:</Text>
                    <Text>{client.primerApellido}</Text>
                    <Text style={{ paddingTop: 10 }}>Segundo Apellido:</Text>
                    <Text>{client.segundoApellido}</Text>
                    <Text style={{ paddingTop: 10 }}>Edad:</Text>
                    <Text>{client.edad}</Text>

                    <Text style={{ paddingTop: 10 }}>Nombre de usuario:</Text>
                    <Text>{client.nombreUsuario}</Text>
                    <Text style={{ paddingTop: 10 }}>Contraseña:</Text>
                    <Text>****</Text>
                    <Text style={{ paddingTop: 10 }}>Calle:</Text>
                    <Text>{client.calle}</Text>
                    <Text style={{ paddingTop: 10 }}>Colonia:</Text>
                    <Text>{client.colonia}</Text>
                    <Text style={{ paddingTop: 10 }}>Pais:</Text>
                    <Text>{client.pais}</Text>

                    <Text style={{ paddingTop: 10 }}>Número de celular:</Text>
                    <Text>{client.telefonoMovil}</Text>
                    <Text style={{ paddingTop: 10 }}>Número de teléfono de casa:</Text>
                    <Text>{client.telefonoCasa}</Text>
                    <Text style={{ paddingTop: 10 }}>Email:</Text>
                    <Text>{client.email}</Text>
                    <View>
                        <Button title="Carrito de compras" onPress={() => navigation.navigate("adLittleCar", { client: client })}></Button>
                        <Button title="Lista de Deseos" onPress={() => navigation.navigate("wish", { client: client })}></Button>
                        <Button title="Historial" onPress={() => navigation.navigate("history", { client: client })}></Button>
                        <Button title="Volver" onPress={() => navigation.navigate("main", { client: client })} />
                        <Button title="Cerrar sesión" onPress={() => navigation.navigate("main", { client: null })} />
                    </View>
                </ScrollView>
            </View>
        )
    } else return () => navigation.navigate("main", { client: client })
}
export default Profile;