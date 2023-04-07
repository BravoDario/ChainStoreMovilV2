import React from "react";
import { useState, useEffect } from 'react';
import { ScrollView, Text, View } from "react-native";
import axios from "axios";

import NavBar from "./NavBar";
import SubNavBar from "./SubNavBar";
import styles from "../data/Styles";
import Product from "./Product";

export default function Main({ route }) {
    let cliente;
    route.params ? cliente = route.params.client : cliente = null;

    const [videojuegos, setVideojuegos] = useState([]);
    const [consolas, setConsolas] = useState([]);
    const [controles, setControles] = useState([]);
    const [accesorios, setAccesorios] = useState([]);

    useEffect(() => {
        const path = "http://192.168.0.9:8080";

        axios.get(path + "/accesorio/get?plataform=0&filter=0")
            .then(function (response) {
                setAccesorios(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get(path + "/videoJuego/get?plataform=0&filter=0")
            .then(function (response) {
                setVideojuegos(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get(path + "/consola/get?plataform=0&filter=0")
            .then(function (response) {
                setConsolas(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get(path + "/control/get?plataform=0&filter=0")
            .then(function (response) {
                setControles(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <View style={styles.body}>
            <NavBar Client={cliente} />
            <ScrollView>
                <View style={styles.body.grandContainer}>
                    <Text style={styles.body.textTittle}>Videojuegos</Text>
                    <ScrollView horizontal={true} style={{
                        flexDirection: 'row'
                    }}>
                        {videojuegos.map((videojuego, index) => {
                            return <Product key={index} videoGame={videojuego} cliente={cliente} />;
                        })}
                    </ScrollView>
                </View>
                <View style={styles.body.grandContainer}>
                    <Text style={styles.body.textTittle}>Consolas</Text>
                    <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                        {consolas.map((consola, index) => {
                            return <Product key={index} videoGame={consola} cliente={cliente} />;
                        })}
                    </ScrollView>
                </View>
                <View style={styles.body.grandContainer}>
                    <Text style={styles.body.textTittle}>Controles</Text>
                    <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                        {controles.map((control, index) => {
                            return <Product key={index} videoGame={control} cliente={cliente} />;
                        })}
                    </ScrollView>
                </View>
                <View style={styles.body.grandContainer}>
                    <Text style={styles.body.textTittle}>Accesorios</Text>
                    <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                        {accesorios.map((accesorio, index) => {
                            return <Product key={index} videoGame={accesorio} cliente={cliente} />;
                        })}
                    </ScrollView>
                </View>
            </ScrollView>
            <SubNavBar cliente={cliente} />
        </View>
    )
}