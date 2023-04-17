import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text,TextInput, View, Image } from "react-native";
import client from "../data/Client";
import NavBar from "./NavBar";

const Settings = ({route})=>{
    const navigation = useNavigation();

    let cliente;
    route.params ? cliente = route.params.client : cliente = null;

    if (client !== null) {
    return (
        <View>
            <NavBar Verificate={verification} />
        <View
        style={{paddingTop:30}}>
            
            <Text>Editar perfil</Text>
            <Image source={client.imagen}
                    style={{ width: 200, height: 200, alignSelf:"center" }} />
            
            <Text style = {{paddingTop:10}}>Nombre:</Text>
            <TextInput
                placeholder={client.name}
            />
            <Text style = {{paddingTop:10}}>Primer Apellido:</Text>
            <TextInput
                placeholder={client.firstLastName}
            />
            <Text style = {{paddingTop:10}}>Edad:</Text>
            <TextInput
                placeholder={client.age}
            />
            <Text style = {{paddingTop:10}}>Género:</Text>
            <TextInput
                placeholder={client.gender}
            />
            <Text style = {{paddingTop:10}}>Número de celular:</Text>
            <TextInput
                placeholder={client.mobilePhone}
            />
            <Text style = {{paddingTop:10}}>Email:</Text>
            <TextInput
                placeholder={client.email}
            />
            <Button title="Cambiar información" ></Button>
            <View>
                
                <Button title="Volver" onPress={() => navigation.navigate("profile", {verification:true})}/>
                <Button title="Cerrar sesión" onPress={() => navigation.navigate("main", {verification:false})}/>
            </View>
        </View>
        </View>
    )
    } else return () => navigation.navigate("main", { client: client })
}
export default Settings;