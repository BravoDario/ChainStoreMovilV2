import React from "react";
import { Alert, Button, TouchableOpacity, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "./NavBar";
import Product from "./Product";

import videojuegos from "../data/VideoJuegos";
import consolas from "../data/Consoles";
import controles from "../data/Controls";

export default function Main({ route }) {
    const navigation = useNavigation();

    let cliente;
    route.params ? cliente = route.params.client : cliente = null;

    return (
        <View style={{
            backgroundColor: "#5C5C55", //Gris oscuro
            height: "100%"
        }}>
            <NavBar Client={cliente} />
            <ScrollView>
                <View style={{
                    padding: 15,
                    margin: 15,
                    backgroundColor: "#D9D9D9"
                }}>
                    <Text style={{ fontWeight: "bold", fontSize: 24 }}>Videojuegos</Text>
                    <ScrollView horizontal={true} style={{
                        flexDirection: 'row'
                    }}>
                        {videojuegos.map((videojuego, index) => {
                            return <Product key={index} videoGame={videojuego} client={cliente}/>;
                        })}
                    </ScrollView>

                </View>
                <View style={{
                    margin: 15,
                    padding: 15,
                    backgroundColor: "#D9D9D9"
                }}>
                    <Text style={{ fontWeight: "bold", fontSize: 24 }}>Consoles</Text>
                    <ScrollView horizontal={true} style={{
                        flexDirection: 'row'
                    }}>
                        {consolas.map((consola, index) => {
                            return <Product key={index} videoGame={consola} />;
                        })}
                    </ScrollView>
                </View>
                <View style={{
                    margin: 15,
                    padding: 15,
                    backgroundColor: "#D9D9D9"
                }}>
                    <Text style={{ fontWeight: "bold", fontSize: 24 }}>Controles</Text>
                    <ScrollView horizontal={true} style={{
                        flexDirection: 'row'
                    }}>
                        {controles.map((control, index) => {
                            return <Product key={index} videoGame={control} />;
                        })}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}