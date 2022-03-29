import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import { Input, Stack, Center, Button, Link, Text, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { LogIn, Test } from '../api/api';

export default function Main(props) {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState("test");
    const [pass, setPass] = useState("");
    const [load, setLoad] = useState(false);

    const handleClick = () => setShow(!show)


    const Login = () => {
        setLoad(true),
        LogIn({
            user: user,
            pass: pass
        }).then((res) => {
            if (res.data.result) 
                
                        props.navigation.navigate('List',{sessionId:res.data.result.session_id})
                
            else
                Alert.alert("Credenciales Incorrectas")
                setLoad(false)


        })
    }
    const Tester = () => {
        Alert.alert("entra")
        Test({
            user: user,
            pass: pass
        }).then((res) => {
            res.status === 200 && props.route.params.setSessionId("esoooooo")
            res.status === 200 ? setUser(res.status.toString()) : setUser("pepe")
            res.status === 200 ? Alert.alert(`${JSON.stringify(res)} resp 200 test`) : Alert.alert(`${JSON.stringify(res)}otra cosa test`);
            Alert.alert(JSON.stringify(res))
        })
    }

    return (
        <View>
            {
                load===true ? <Text>Cargando</Text> :
                    <View style={styles.container}>
                        <Center bg="#DE6C16" flex={1} style={styles.header}>
                            <Image
                                style={{ marginTop: 20 }}
                                source={require('../assets/img/icon.png')}
                            />
                        </Center>
                        <Center flex={5} px="3">
                            <Stack
                                space={4}
                                w={{
                                    base: "90%",
                                    md: "25%",
                                }}
                            >
                                <Input
                                    size="2xl"
                                    _text={{ fontFamily: "Poppins" }}
                                    variant="underlined" placeholder="Usuario"
                                    onChangeText={(e) => { setUser(e);  console.log(pass); setTimeout(() => {
                                        console.log(pass);
                                    }, 200);}}
                                    value={user} />
                                <Input size="2xl" _text={{ fontFamily: "Poppins" }}
                                    type={show ? "text" : "password"}
                                    variant="underlined"
                                    value={pass}
                                    onChangeText={(e) => { setPass(e);  console.log(pass); setTimeout(() => {
                                        console.log(pass);
                                    }, 200);}}
                                    InputRightElement={
                                        <Icon
                                            as={<MaterialIcons name={show ? "visibility-off" : "visibility"} />}
                                            size={5}
                                            mr="2"
                                            color="muted.400"
                                            onPress={handleClick}
                                        />
                                    }
                                    placeholder="Contraseña"
                                />
                                <Link
                                    onPress={() => props.navigation.navigate('Lost')}
                                    isExternal
                                    style={{
                                        alignSelf: 'flex-end',
                                    }}
                                    _text={{
                                        fontFamily: "Poppins",
                                        color: "#757575",
                                        textDecoration: 'none',
                                    }}
                                    mt={-0.5}
                                    _web={{
                                        mb: -2,
                                    }}
                                >
                                    Olvidaste tu contraseña?
                                </Link>

                                <Button style={{ marginTop: 50 }} _text={{ fontFamily: "Poppins" }} onPress={Login} backgroundColor="#F08626" size="lg">Entrar</Button>

                                <Text style={{ fontFamily: "Poppins", marginTop: 50 }}>Aún no tienes una cuenta? <Link
                                    href="#"
                                    isExternal
                                    _text={{
                                        fontFamily: "Poppins",
                                        color: "#DE6C16",
                                    }}
                                    mt={-0.5}
                                    _web={{
                                        mb: -2,
                                    }}
                                >
                                    Regístrate
                                </Link></Text>
                            </Stack>

                        </Center>
                    </View>
            }
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