import React from 'react';
import { StyleSheet } from 'react-native';

//@import url('https://fonts.googleapis.com/css2?family=Contrail+One&display=swap');

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#797970",
        height: "100%",
        grandContainer: {
            borderRadius: 7,
            padding: 15,
            margin: 15,
            backgroundColor: "#D9D9D9"
        },
        textTittle: { fontWeight: "bold", fontSize: 24 }
    },
    bdyHome: {
        //paddingTop: 30,
        width: "100%",
        backgroundColor: "#797970",
        height: "100%",
    },
    bdyHome2: {
        //paddingTop: 30,
        width: "100%",
        backgroundColor: "#00BFFF",
        height: "100%",
    },
    navBar: {
        flexDirection: 'row',
        height: 60,
        marginTop: 30,
        padding: 2,
        backgroundColor: "#00BFFF",
        image: { width: 100, justifyContent: 'center', alignItems: 'center', height: '100%' },
        input: { padding: 7, backgroundColor: "white", borderRadius: 5, fontSize: 15, height: "100%" },
        buscar: { margin: 5, flex: 0.7, },
        textProfil: { textAlign: "center", color: "#474743", fontSize: 17, paddingTop: 7 },
        contProfil: { margin: 3, flex: 0.3, }
    },
    subNavBar: {
        flexDirection: "row",
        backgroundColor: "#F9F9F9EE",
        marginBottom: 0,
        height: 50,
        borderTopWidth: 4,
        borderBottomWidth: 4,
        borderColor: "#F9F9F9EE",
        text: { paddingTop: 6, textAlign: "center", color: "#00BFFF", fontSize: 18, borderColor: "gray", borderRightWidth: 2, flex: 0.5 }
    },
    producto: {
        backgroundColor: "white",
        padding: 10,
        height: 220,
        borderRadius: 5,
        width: 130,
    },
    productoDetalle: {
        margin: 2,
        flex: 0.5,
        backgroundColor: "#1DB2E5",
        text: {
            margin: 0,
            color: "#E6FAFF",
            fontSize: 17,
            fontWeight: "bold",
            textAlign: "center"
        },
        allButton: {
            marginHorizontal: 15,
            paddingBottom: 0,
            height: 120,
            backgroundColor: "#FFF",
        },
        littleButtons: {
            flexDirection: 'row',
            margin: 10
        },
        tittle: { fontWeight: "bold", fontSize: 27, paddingTop: 15, paddingLeft: 15 },
        descriptionContent: {
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            margin: 15,
            marginBottom: 0,
            backgroundColor: "white"
        },
        modal: {
            backgroundColor: "#F9F9F9EE",
            marginTop: 60,
            height: "100%",
            padding: 30,
            alignItems: "center",

            cantidad: {
                borderWidth: 3,
                textAlign: "center",
                fontSize: 20,
                padding: 5,
                flex: 0.5,
                width: 40,
                height: 40,
                backgroundColor: "#F9F9F9EE",
                borderColor: "#1DB2E5",
                borderRadius: 5
            },
            text: {
                textAlign: "justify",
                fontSize: 20,
                padding: 5,
            }
        }
    },
    login: {
        borderRadius: 5,
        backgroundColor: "white",
        margin: 30,
        marginTop: 60,
        padding: 20,
        paddingBottom: 60,
        error: {
            text: {
                textAlign: "center",
                color: "#EB2300"
            },
            inputError: {
                height: 40,
                margin: 15,
                padding: 5,
                fontSize: 20,
                borderBottomWidth: 2,
                borderColor: "#EB2300"
            }
        },
        inputNormal: {
            height: 40,
            margin: 15,
            padding: 5,
            fontSize: 20,
            borderBottomWidth: 2,
            borderColor: "#797970"
        },
        text: { fontWeight: "bold", fontSize: 27 }
    },
    buttons: {
        backgroundColor: "#1DB2E5",
        color: "white",
        width: "95%",
        height: 30,
        margin: 5,
        borderRadius: 5,
        textAlign: "center",
        fontSize: 18,
        close: {
            backgroundColor: "#F9F9F9EE",
            borderColor: "#1DB2E5",
            color: "#1DB2E5",
            width: "95%",
            height: 30,
            margin: 5,
            borderRadius: 5,
            textAlign: "center",
            fontSize: 16,
            borderWidth: 3,
            marginBottom: 20,
            paddingTop: 5
        }
    },
    littleText: {
        fontWeight: "bold", 
        fontSize: 15
    }
})

export default styles;