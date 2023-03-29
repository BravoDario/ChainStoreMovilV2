import React from "react";
import { View, Text, Button} from "react-native";
import { useNavigation } from "@react-navigation/native";

const BuyAgain = () => {

    const navigation = useNavigation();
    return (
        <View>
            <Text>
                Comprar de nuevo
            </Text>
            <Button title="menú" onPress={() => navigation.navigate("main")}/>
        </View>
    )
}

export default BuyAgain;