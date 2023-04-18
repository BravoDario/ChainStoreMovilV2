import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { ScrollView, Button, Text, View, Image, TouchableOpacity } from "react-native";
import * as Location from 'expo-location';
import Product from "./Product";
import NavBar from "./NavBar";
import axios from "axios";
import styles from "../data/Styles";
import SubNavBar from "./SubNavBar";

const History = ({ route }) => {
    const navigation = useNavigation();

    let cliente;
    route.params ? cliente = route.params.client : cliente = null;

    const [compras, setCompras] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [location, setLocation] = useState(null);
    let coords = {
        lat: 0,
        long: 0
    }, store = {
        lat: 21.1259214,
        long: -101.6832418
    }


    useEffect(() => {
        axios.get("http://10.16.9.63:8080/shopping/getBoughts?idCliente=" + cliente.idCliente)
            .then(function (response) {
                setCompras(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })
    }, []);

    const calculateDistance = () => {
        if (errorMsg) {
            Alert.alert(errorMsg);
        } else if (location) {
            coords = {
                lat: location.coords.latitude,
                long: location.coords.longitude
            }
        }
    }

    const calcularPrecio = (precio, cantidad) => {
        calculateDistance();
        let theta = store.long - coords.long;
        let distance = 60 * 1.1515 * (180 / Math.PI) * Math.acos(Math.sin(store.lat * (Math.PI / 180)) * Math.sin(coords.lat * (Math.PI / 180)) + Math.cos(store.lat * (Math.PI / 180)) * Math.cos(coords.lat * (Math.PI / 180)) * Math.cos(theta * (Math.PI / 180)));
        let distancia = Math.round(distance * 1.609344, 4)
        let costoKM = 19.36;
        let costoEnvio = distancia * costoKM;
        let costoTot;
        let costoTemp;

        costoTemp = precio * cantidad;

        costoTot = costoEnvio + costoTemp
        return costoTot;
    }

    return (
        <View style={styles.body}>
            <NavBar Client={cliente} />
            <ScrollView style={styles.body.grandContainer}>
                <Text style={styles.productoDetalle.tittle}>Historial de compras {"\n"}
                    Bienvenido {cliente.nombre}</Text>
                {compras.map((compra, index) => {
                    return (
                        <View style={{ flexDirection: "row", backgroundColor: "white", borderRadius: 5, marginBottom: 10 }} key={compra.idCompra}>

                            <Product videoGame={compra} cliente={cliente} />

                            <View style={{ width: 140, paddingTop: 30 }}>
                                <TouchableOpacity>
                                    <Text style={[styles.buttons, { height: 50 }]} onPress={() => {/*
                                        Alert.alert('Confirmación', 'Usted comprará este producto de nuevo', [{
                                            text: 'Cancelar',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel',
                                        },
                                        { text: 'OK', onPress: () => comprarAhora(data) },]);*/
                                        
                                        console.log(calcularPrecio(compra.producto.precio, 1));
                                    }}>
                                        Comprar de nuevo
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.littleText}>Usted compró {compra.cantidad} el día: {compra.fecha
                                }</Text>
                            </View>
                        </View>
                    )
                })}
                <Text style={styles.buttons.close} onPress={() => navigation.navigate("main", { client: cliente })}>Volver</Text>

            </ScrollView>
            <SubNavBar cliente={cliente}/>
        </View>
    )
}

export default History;