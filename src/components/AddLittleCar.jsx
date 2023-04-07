import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "./NavBar";

const Cont2 = StyleSheet.create({
    width: 250,
    height: 250,
    marginTop: 50,
    marginLeft: 150,
    backgroundColor: "yellow",
})

const AddLittleCar = ({ route }) => {
    const [style, setStyle] = useState("cont");

    const changeStyle = () => {
        console.log("you just clicked");

        setStyle(Cont2);
    };
    return (
        <View>
            <View className="App"><Text>CHANGE CSS STYLING WITH ONCLICK EVENT</Text></View>
            <View className="si" style={style}>
                <Button className="button" onPress={changeStyle} title="Click me!" />
            </View>
        </View>
    )
}


export default AddLittleCar;