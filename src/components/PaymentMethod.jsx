import React, { useState } from "react"
import { StyleSheet, Alert, Button, Pressable, View, Modal, Text, Image, ScrollView, TouchableOpacity, TextInput, TouchableOpacityComponent } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "./NavBar";
import styles from "../data/Styles";

const PaymentMethod = ({ route }) => {
    const navigation = useNavigation();

    let cliente;
    route.params ? cliente = route.params.client : cliente = null;

    const [modalPaypal, setModalPaypal] = useState(false);
    const [modalTarget, setModalTarget] = useState(false);

    return (
        <View style={styles.bdyHome}>
            <NavBar Client={cliente} />
            <Modal
                id="Paypal"
                animationType="slide"
                transparent={true}
                visible={modalPaypal}
                onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalPaypal(!modalPaypal); }}>
                <View style={styles.productoDetalle.modal}>
                    <TouchableOpacity onPress={() => setModalPaypal(!modalPaypal)}>
                        <Text style={styles.buttons.close}>Cambiar método de pago</Text>
                    </TouchableOpacity>

                    <Text style={styles.productoDetalle.modal.text}>Ingrese Correo</Text>
                    <TextInput style={styles.login.inputNormal} placeholder="email" />
                    <Text style={styles.productoDetalle.modal.text}>Ingrese contraseña</Text>
                    <TextInput style={styles.login.inputNormal} placeholder="Contraseña" secureTextEntry={true} />
                    <TouchableOpacity onPress={() => navigation.navigate("main", { client: cliente })}>
                        <Text style={styles.buttons}>
                            Listo!
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal
                id="Credito"
                animationType="slide"
                transparent={true}
                visible={modalTarget}
                onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalTarget(!modalTarget); }}>
                <View style={styles.productoDetalle.modal}>
                    <TouchableOpacity onPress={() => setModalTarget(!modalTarget)}>
                    <Text style={styles.buttons.close}>Cambiar método de pago</Text>
                    </TouchableOpacity>

                    <Text style={styles.productoDetalle.modal.text}>Número de su tarjeta</Text>
                    <TextInput style={styles.login.inputNormal} placeholder="****" />
                    <Text style={styles.productoDetalle.modal.text}>Nombre de la tarjeta</Text>
                    <TextInput style={styles.login.inputNormal} placeholder="Nombre" />

                    <Text style={styles.productoDetalle.modal.text}>Fecha de vencimiento</Text>
                    <TextInput style={styles.login.inputNormal} placeholder="Fecha" />
                    <Text style={styles.productoDetalle.modal.text}>Código de seguridad</Text>
                    <TextInput style={styles.login.inputNormal} placeholder="Código" secureTextEntry={true} />

                    <TouchableOpacity onPress={() => navigation.navigate("main", { client: cliente })}>
                        <Text style={styles.buttons}>
                            Listo!
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={styles.productoDetalle.descriptionContent}>
                <View style={{ paddingTop: 10 }}>
                    <Image source={{ uri: 'https://1000marcas.net/wp-content/uploads/2019/12/logo-Paypal.png' }}
                        style={{ width: 200, height: 50 }} />   
                    <TouchableOpacity onPress={() => {
                        setModalPaypal(!modalPaypal);
                    }} >
                        <Text style={styles.buttons}>Pagar con PayPal</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingTop: 10 }}>
                    <Image source={{ uri: 'https://www.behomemadrid.com/wp-content/uploads/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos-705x210.png' }}
                        style={{ width: 200, height: 50 }} />
                        <TouchableOpacity onPress={() => {
                            setModalTarget(!modalTarget);
                        }}>
                            <Text style={styles.buttons}>Pagar con tarjeta de crédito</Text>
                        </TouchableOpacity>
                </View>
                <View style={{ paddingTop: 10 }}>
                    <Image source={{ uri: 'https://www.behomemadrid.com/wp-content/uploads/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos-705x210.png' }}
                        style={{ width: 200, height: 50 }} />
                    <TouchableOpacity onPress={() => {
                        setModalTarget(!modalTarget);
                    }}>
                        <Text style={styles.buttons}>Pagar con tarjeta de débito</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("main", { client: cliente })} >
                    <Text style={styles.buttons.close}>Volver</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PaymentMethod;