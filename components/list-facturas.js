import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { HStack, ScrollView, Center, Button, Text, Container, Box, VStack, Divider, Icon, Input } from "native-base";
import { ListItem } from 'react-native-elements'
import { MaterialIcons } from "@expo/vector-icons";
import { GetInvoices } from '../api/api';
import Detalle from "./detalle-factura";
import DetalleCompletada from "./detalle-factura-completada";
export default function Main(props) {

    const [info, setInfo] = useState([])
    const [loading, setLoading] = useState(true)
    const [recive, setRecive] = useState([])
    const [idPro, setIdPro] = useState([])
    const [step, setStep] = useState(1)
    const [selected, setSelected] = useState(1)
    const [tab, setTab] = useState(1)



    const Listar = () => {
        GetInvoices(props.route.params.sessionId).then((res) => {
            setInfo(res.data.result)
            setLoading(false)
        })
    }
    useEffect(() => {
        Listar()
    }, [])

    return (
        <View>
            {
                loading ? <Text>Cargando</Text> :
                    step === 1 ?
                        <View style={styles.container}>
                            <Center bg="#DE6C16" flex={1} styles={styles.header}>
                                <Text fontSize='xl' style={{ fontFamily: "Poppins", color: '#FFFFFF' }}>Listado de facturas</Text>
                            </Center>
                            <View backgroundColor="#DE6C16">
                                <HStack space={4} style={{ display: 'flex', flexDirection: "row" }}>
                                    <Container style={{ borderBottomColor: 'blue', justifyContent: 'center', flex: 4, display: "flex", flexDirection: "column", }}>
                                        <Button onPress={() => { setTab(1) }} backgroundColor="#DE6C16">Pendientes</Button>
                                        {tab === 1 && <View onPress={() => { setTab(1) }} style={{ backgroundColor: "blue", borderRadius: 1, width: "100%", height: 3 }}></View>}
                                    </Container>
                                    <Container style={{ borderBottomColor: 'blue', justifyContent: 'center', flex: 4, display: "flex", flexDirection: "column", }}>
                                        <Button onPress={() => { setTab(2) }} backgroundColor="#DE6C16">Completadas</Button>
                                        {tab === 2 && <View onPress={() => { setTab(2) }} style={{ backgroundColor: "blue", borderRadius: 1, width: "100%", height: 3 }}></View>}
                                    </Container>
                                </HStack>
                            </View>

                            <Box bg="#E5E5E5" flex={5}>
                                <Center mt={3} mb={3}>
                                    <Input
                                        mx="3"
                                        placeholder="Buscar"
                                        w={{
                                            base: "90%",
                                        }}
                                        bg="#FFFFFF"
                                    />
                                </Center>

                                <ScrollView
                                    _contentContainerStyle={{
                                        mt: "2px",
                                        minW: "72",
                                        bg: "lime.300",
                                    }}
                                >

                                    {
                                        tab === 1 ?
                                            info.map((l, i) => (
                                                <ListItem key={i} containerStyle={{ backgroundColor: '#E5E5E5' }}
                                                    onPress={() => {
                                                        setSelected(i)
                                                        setTimeout(() => {
                                                            setStep(2)
                                                        }, 200);
                                                    }}>
                                                        {console.log(l)}
                                                    {!l.check_done && <Item datos={l} style={styles.card}></Item>}
                                                </ListItem>
                                            )) :
                                            info.map((l, i) => (
                                                <ListItem key={i} containerStyle={{ backgroundColor: '#E5E5E5' }}
                                                    onPress={() => {
                                                        setSelected(i)
                                                        setTimeout(() => {
                                                            setStep(2)
                                                        }, 200);
                                                    }}>
                                                    {l.check_done && <Item datos={l} style={styles.card}></Item>}
                                                </ListItem>
                                            ))

                                    }


                                </ScrollView>
                            </Box>
                            <Button backgroundColor="#F08626" style={styles.roundButton1}><Icon
                                as={<MaterialIcons name="assignment-turned-in" />}
                                size={8}
                                color="white"
                                onPress={() => props.navigation.navigate('Inventario', { recived: recive, infoTotal:info, sessionId: props.route.params.sessionId })}
                            /></Button>

                        </View> :
                        <View>
                            {tab === 1 ?
                                <Detalle id={info[selected].id} infoTotal={info} sessionId={props.route.params.sessionId} back={() => { setStep(1) }} />
                                :
                                <DetalleCompletada id={info[selected].id} infoTotal={info} sessionId={props.route.params.sessionId} back={() => { setStep(1) }} />
                            }
                        </View>
            }
        </View>

    );
}

export function Item(props) {
    return (
        <View style={styles.card}>
            <Box borderWidth="0" borderColor="coolGray.200" bg="white" rounded="sm" >
                <VStack space="4" divider={<Divider />}>
                    <Box px="4" pt="4">
                        <HStack space={4} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: "PoppinsMedium", }}>Factura ID {props.datos.id}</Text>
                            <Icon
                                as={<MaterialIcons name="arrow-forward" />}
                                size={5}
                                mr="2"
                                color="muted.400"
                            />
                        </HStack>
                    </Box>
                    <Box px="4" pb="4">
                        <HStack space={4} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box style={{ display: 'flex', flex: 3 }}>
                                <HStack>
                                    <Text fontSize="xs" style={{ fontFamily: "Poppins", color: "#A1A2B4" }}>Proveedor</Text>
                                </HStack>
                                <Text fontSize="sm" style={{ fontFamily: "Poppins", color: "#757575" }}>{props.datos.partner_id.name}</Text>
                            </Box>
                            <Box style={{ display: 'flex', flex: 3 }}>
                                <HStack>
                                    <Text fontSize="xs" style={{ fontFamily: "Poppins", color: "#A1A2B4" }}>Fecha</Text>
                                </HStack>
                                <Text fontSize="sm" style={{ fontFamily: "Poppins", color: "#757575" }}>{props.datos.date_invoice ? props.datos.date_invoice : "Sin Fecha"}</Text>
                            </Box>
                        </HStack>
                    </Box>
                </VStack>
            </Box>
        </View>

    )
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
    },
    roundButton1: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        position: 'absolute', bottom: 30, alignSelf: 'center'
    },
    card: {
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 6,
        shadowRadius: 0,
        shadowColor: '#C2C2C2',
        width: "100%"
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