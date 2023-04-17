import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "./NavBar";

const BuyNow = () => {

    const navigation = useNavigation();

    return (
        <Modal
            id="Compra"
            animationType="slide"
            transparent={true}
            visible={modalCompras}
            onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalCompras(!modalCompras); }}>
            <View style={styles.productoDetalle.modal}>
                <Text style={styles.productoDetalle.modal.text}>Usted comprará: {videojuego.producto.titulo + "\n"}¿Cuántos comprará?</Text>
                <View style={{ flexDirection: "row", width: 200, margin: 10 }}>
                    <Text style={styles.productoDetalle.modal.cantidad} onPress={() => getCantidadCompra("-", cantCompra)}>-</Text>
                    <Text style={styles.productoDetalle.modal.cantidad}>{cantCompra}</Text>
                    <Text style={styles.productoDetalle.modal.cantidad} onPress={() => getCantidadCompra("+", cantCompra)}>+</Text>
                </View>
                <Text style={styles.productoDetalle.modal.text}>{text}</Text>
                <Text style={styles.buttons} onPress={() => {
                    Alert.alert('Confirmación', 'Usted comprará este producto ahora', [{
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => comprarAhora() },]);
                }}>Comprar ahora</Text>
                <Text style={[styles.buttons.close]} onPress={() => setModalCompras(!modalCompras)}>Volver</Text>
            </View>
        </Modal>
    )
}

export default BuyNow;