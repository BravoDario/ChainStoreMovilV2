import React from "react"
import { StyleSheet, Alert, Button, Pressable, View, Modal, Text, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "./NavBar";

const PaymentMethod = ({route}) => {
    const navigation = useNavigation();
    let cliente;
    route.params ? cliente = route.params.client : cliente = null;
    
    console.log(route.params);
    
    return (
        <View>
            <NavBar Verificate={verification} />
        <View style={{
            flexDirection: 'column',
            height: 150,
            width: 300, 
            padding: 10
        }}>
            <View style={{paddingTop:10}}>
                <Text>Paypal</Text>
                <Image source={{ uri: 'https://1000marcas.net/wp-content/uploads/2019/12/logo-Paypal.png' }}
                    style={{ width: 200, height: 50 }} />
                <Button title="Realizar compra" onPress={() => {
                        Alert.alert('Confirmación', 'Usted comprará este producto ahora', [{
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => comprarAhora() },]);
                }}/>
            </View> 
            <View style={{paddingTop:10}}>
                <Text>Tarjeta de débito</Text>
                <Image source={{ uri: 'https://www.behomemadrid.com/wp-content/uploads/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos-705x210.png' }}
                    style={{ width: 200, height: 50 }} />
                <Button title="Realizar compra" onPress={() => {
                        Alert.alert('Confirmación', 'Usted comprará este producto ahora', [{
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => comprarAhora() },]);
                }}/>
            </View>
            <View style={{paddingTop:10}}>
                <Text>Tarjeta de crédito</Text>
                <Image source={{ uri: 'https://www.behomemadrid.com/wp-content/uploads/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos-705x210.png' }}
                    style={{ width: 200, height: 50 }} />
                <Button title="Realizar compra" onPress={() => {
                        Alert.alert('Confirmación', 'Usted comprará este producto ahora', [{
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => comprarAhora() },]);
                }}/>
            </View>

            <View style={{
                flexDirection: 'column',
                padding: 10
            }}>
                <Button title="Volver" onPress={() => navigation.navigate("main", { client: cliente })} />
            </View>
            
        </View>
        </View>
    )
}

export default PaymentMethod;