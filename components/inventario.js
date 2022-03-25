import React, { useEffect, useReducer, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { HStack, ScrollView, Center, Button, Text, Input, Box, VStack, Divider, Icon, Checkbox } from "native-base";
import { ListItem } from 'react-native-elements'
import { MaterialIcons } from "@expo/vector-icons";
import { GetInvoices, GetProducts, GetFactura, GetSpace, UbicarProd, UpdCompletadas } from '../api/api';
import { add } from 'react-native-reanimated';
export default function Main(props) {

    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const [added, setAdded] = useState([])
    const [loading,setLoading] = useState(false)


    useEffect(() => {
        let peticiones = [];
        let aux = {}
        GetProducts(props.route.params.sessionId, page).then((res) => {
            GetInvoices(props.route.params.sessionId).then((resp) => {
                resp.data.result.map((data, index) => {
                    peticiones.push(GetFactura(data.id, props.route.params.sessionId))
                })
                Promise.all(peticiones).then((lista) => {
                    lista.map((info) => {
                        info.data.result.map((respu) => {
                            if (aux[respu.product_id.id]) {
                                respu.check_done ? aux[respu.product_id.id] = (Number(aux[respu.product_id.id]) + Number(respu.quantity)).toString() : true
                            }
                            else {
                                aux[respu.product_id.id] = respu.quantity
                            }
                        })
                    })
                    setAdded(aux)
                    setData(res.data)
                    setTimeout(() => {
                        added
                    }, 500);

                })

            })

        })

    }, [])

    const Next = () => {
        setPage(page + 1);
        GetProducts(props.route.params.sessionId, page + 1).then((res) => {
            setData(res.data)

        })
    }
    const Back = () => {
        setPage(page - 1);
        GetProducts(props.route.params.sessionId, page - 1).then((res) => {
            setData(res.data)

        })
    }

    const Syncro = () => {
        setLoading(true)
        let llaves = Object.entries(added)

        Guardar(0, llaves.length - 1, llaves)

    }

    const Guardar = (ini, fin, llaves) => {
        if (ini < fin) {
            GetSpace(props.route.params.sessionId).then((res) => {
                UbicarProd(props.route.params.sessionId, res.data.result[0].id, llaves[ini][0], llaves[ini][1]).then((data) => {
                    console.log("se va guardando asi", res.data.result[0].id, llaves[ini][0], llaves[ini][1], data.data);
                    Guardar(ini + 1, fin, llaves)
                })

            })
        }
        if (ini === fin) {
            let completadas = [];
            //paso cada factura a completada
            props.infoTotal.map((l, i) => {
                !l.check_done && completadas.push(UpdCompletadas(props.route.params.sessionId, l.id))
            })
            Promise.all(completadas).then(() => {
                props.navigation.navigate('List', { sessionId: props.route.params.sessionId })
                
            })
            props.navigation.navigate('List', { sessionId: props.route.params.sessionId })

        }
    }


    return (
        <View>
            {data && !loading ?

                <View style={styles.container}>

                    <HStack style={styles.header}>
                        <Center>
                            <Icon
                                as={<MaterialIcons name="arrow-back-ios" />}
                                size={6}
                                color="white"
                                onPress={() => props.navigation.navigate('List')}
                            />
                        </Center>
                        <Center >
                            <Box
                            >
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: 'center', width: "100%" }}>
                                    <Text fontSize='xl' style={{ fontFamily: "Poppins", color: '#FFFFFF' }}>Inventario <Text fontSize='xs' style={{ fontFamily: "Poppins", color: '#FFFFFF' }}>{data.fecha ? data.fecha : ""}</Text></Text>
                                </View>
                            </Box>
                        </Center>
                    </HStack>

                    <Box bg="#E5E5E5" flex={5}>

                        <ScrollView
                            _contentContainerStyle={{
                                mt: "2px",
                                minW: "72",
                                bg: "lime.300",
                            }}
                        >
                            {
                                data.result.map((l, i) => (
                                    <ListItem key={i} containerStyle={{ backgroundColor: '#E5E5E5' }}>
                                        <Item datos={l} style={styles.card} added={added}></Item>
                                    </ListItem>
                                ))
                            }
                            <View style={{ display: "flex", flexDirection: "column", marginBottom: 10, backgroundColor: "#E5E5E5", width: "100%", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                <Text style={{ backgroundColor: "transparent" }}>Pagina {page}</Text>
                                <View style={{ display: "flex", flexDirection: "row", width: "60%" }} >
                                    <Button style={{ flex: 1, backgroundColor: "transparent", borderRadius: 4, borderColor: '#F08626' }} disabled={page === 1} onPress={Back}>Back</Button>
                                    <Button style={{ flex: 1, backgroundColor: "transparent", borderRadius: 4, borderColor: '#F08626' }} disabled={page === data.total_pages} onPress={Next}>Next</Button>
                                </View>
                                <Button backgroundColor="#F08626" style={{ width: "80%", alignSelf: 'center', marginBottom: 10, height: 60 }} onPress={Syncro}>Sincronizar </Button>
                            </View>


                        </ScrollView>
                    </Box>
                </View >
                :
                <Text>Cargando</Text>

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
                            <VStack style={{ flex: 3 }}>
                                <Text style={{ fontFamily: "PoppinsMedium", }}>[{props.datos.name}]</Text>
                            </VStack>
                            <VStack style={{ flex: 1 }}>
                            </VStack>
                        </HStack>
                    </Box>
                    <Box px="4" pb="4">
                        <HStack space={4} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <HStack>
                                    <Text fontSize="xs" style={{ fontFamily: "Poppins", color: "#A1A2B4" }}>Cantidad existente:</Text>
                                </HStack>
                                <Text fontSize="sm" style={{ fontFamily: "Poppins", color: "#757575" }}>{props.datos.qty_available} Unidad(es)</Text>
                            </Box>
                            <Box>
                                <HStack>
                                    <Text fontSize="xs" style={{ fontFamily: "Poppins", color: "#A1A2B4" }}>Cantidad recibida:</Text>
                                </HStack>
                                <Text fontSize="xs" style={{ fontFamily: "PoppinsMedium", color: "#757575" }}>{props.added[props.datos.id] ? props.added[props.datos.id] : "No modificado"}</Text>

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
        backgroundColor: '#DE6C16',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 6,
        shadowRadius: 0,
        shadowColor: '#C2C2C2',
        paddingEnd: 20,
        paddingStart: 15,
        flex: 1
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