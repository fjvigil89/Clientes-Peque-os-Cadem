import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Input, Stack, Center, Button, Text } from "native-base";
import { Reset } from '../api/api';
export default function Main(props) {
    const [email, setEmail] = useState("")

    const lol = (x) => {
        setEmail(x);
    }
    const Send = () => {
        Reset(props.route.params.sessionId, email).then((res) => {
            res.data.error ? Alert.alert("El correo electrónico no esta registrado") :
                props.navigation.navigate('Login')
        })
    }
    
    return (
        <View style={styles.container}>
            <Center bg="#DE6C16" flex={1} style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                    <Image
                        style={{ marginTop: 20 }}
                        source={require('../assets/img/icon.png')}

                    />
                </TouchableOpacity>

            </Center>
            <Center flex={5} px="3">
                <Text fontSize="xl" style={{ fontFamily: 'PoppinsMedium' }}>Olvidaste  tu contraseña?</Text>
                <Text fontSize="md" px="6" style={{ fontFamily: 'Poppins' }}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed di</Text>
                <Stack
                    space={4}
                    w={{
                        base: "90%",
                        md: "25%",
                    }}
                >


                    <Input type="email" size="2xl" style={{ marginTop: 60 }} _text={{ fontFamily: "Poppins" }}
                        variant="underlined" placeholder="Email" value={email} onChangeText={() => { lol(e) }} />


                    <Button style={{ marginTop: 70, marginBottom: 50 }} _text={{ fontFamily: "Poppins" }} backgroundColor="#F08626" size="lg"
                        onPress={Send}>Enviar</Button>
                    <Button onPress={() => lol("jejeje")}>pepe</Button>
                </Stack>

            </Center>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 6,
        shadowRadius: 0,
        shadowColor: '#C2C2C2',
        minHeight: 30
    },
    body: {
        marginEnd: 40,
        marginStart: 40,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
});