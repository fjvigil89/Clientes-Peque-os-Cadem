import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { HStack, ScrollView, Center, Button, Text, Input, Box, VStack, Divider, Icon, Checkbox } from "native-base";
import { ListItem } from 'react-native-elements'
import { MaterialIcons } from "@expo/vector-icons";
import { GetFactura, UpdInvoices, UpdRecieve } from '../api/api';
export default function Main(props) {

    const [info, setInfo] = useState(null);
    const [recive, setRecive] = useState([]);
    const [idProd, setIdProd] = useState([])

    const updRecive = (index, cant, id) => {
        let listaId = recive;
        let prodId = idProd;
        listaId[index] = cant;
        prodId[index] = id

        setRecive(listaId);
        setIdProd(prodId)
        
    }

    const Confirmar = () => {
        let Peticiones = [];
        idProd.forEach((data, index) => {
            Peticiones.push(UpdRecieve(props.sessionId, idProd[index], recive[index]))
        })
        console.log(props)
        UpdInvoices(props.sessionId, props.id).then((res)=>{
            Promise.all(Peticiones).then((res) => {
                props.back()
            })
        })
       
    }

    useEffect(() => {
        GetFactura(props.id, props.sessionId)
            .then((res) => {
                setInfo(res.data.result)
                let aux = []
                let aux2 = []
                res.data.result.map((data) => {
                    aux.push(-1)
                    aux2.push(res.data.result.id)
                })
                setRecive(aux)
                setIdProd(aux2)
            })
    }, [])


    return (
        <View>
            {
                info ?
                    <View style={styles.container}>

                        <HStack style={styles.header}>
                            <Center>
                                <Icon
                                    as={<MaterialIcons name="arrow-back-ios" />}
                                    size={6}
                                    color="white"
                                    onPress={() => props.back()}
                                />
                            </Center>
                            <Center >
                                <Box
                                >
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: 'center', width: "100%" }}>
                                        <Text fontSize='xl' style={{ fontFamily: "Poppins", color: '#FFFFFF' }}>Factura ID {props.id}</Text>
                                    </View>
                                </Box>
                            </Center>
                        </HStack>

                        <Box bg="#E5E5E5" flex={5}>
                            <Box mt={3} mb={3} px={4}>
                                <HStack>
                                    <Center>
                                        <Icon
                                            as={<MaterialIcons name="category" />}
                                            size={6}
                                            color="#757575"
                                        />
                                    </Center>
                                    <Center >
                                        <Box
                                        >
                                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: 'center', width: "100%" }}>
                                                <Text fontSize='xl' style={{ fontFamily: "Poppins", color: '#757575' }}>Ítems</Text>
                                            </View>
                                        </Box>
                                    </Center>
                                </HStack>
                            </Box>

                            <ScrollView
                                _contentContainerStyle={{
                                    mt: "2px",
                                    minW: "72",
                                    bg: "lime.300",
                                }}
                            >
                                {
                                    info.map((l, i) => (
                                        <ListItem key={i} containerStyle={{ backgroundColor: '#E5E5E5' }}>
                                            <Item datos={l} index={i} fun={updRecive} style={styles.card}></Item>
                                        </ListItem>
                                    ))
                                }

                                <Button onPress={Confirmar} style={{height:60}}>Confirmar</Button>

                            </ScrollView>

                        </Box>
                    </View > :
                    <View>
                        <Text>Cargando</Text>
                    </View>
            }
        </View>


    );
}

export function Item(props) {
    const [cant, setCant] = useState(props.datos.quantity_receive?props.datos.quantity_receive.toString():"0")

    return (
        <View style={styles.card}>
            <Box borderWidth="0" borderColor="coolGray.200" bg="white" rounded="sm" >
                <VStack space="4" divider={<Divider />}>
                    <Box px="4" pt="4">
                        <HStack space={4} style={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
                            <VStack style={{ fontFamily: "PoppinsMedium", flex: 3 }}>
                                <Text style={{ fontFamily: "PoppinsMedium", flex: 3 }}>[Producto ID {props.datos.product_id.id}]</Text>
                                <Text style={{ fontFamily: "PoppinsMedium", flex: 2 }}>{props.datos.product_id.name}</Text>
                            </VStack>
                            <HStack style={{ fontFamily: "PoppinsMedium", flex: 2 }}>
                                <Text fontSize="xs" px={2} style={{ fontFamily: "Poppins", color: "#CECECE" }}>Revisado</Text>
                                {cant ? cant>=0 ? <Checkbox accessibilityLabel="Revisado" isChecked _disabled={true} style={{ backgroundColor: 'white', borderColor: '#72DFB1' }} _icon={{ color: '#72DFB1' }}></Checkbox> : <Checkbox style={{ backgroundColor: 'white', borderColor: '#FFE3C9' }} _invalid={true} accessibilityLabel="Revisado" ></Checkbox>: <Checkbox style={{ backgroundColor: 'white', borderColor: '#FFE3C9' }} _invalid={true} accessibilityLabel="Revisado" ></Checkbox>}
                            </HStack>
                        </HStack>
                    </Box>
                    <Box px="4" pb="4">
                        <HStack space={4} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <HStack>
                                    <Text fontSize="xs" style={{ fontFamily: "Poppins", color: "#A1A2B4" }}>Cantidad esperada:</Text>
                                </HStack>
                                <Text fontSize="sm" style={{ fontFamily: "Poppins", color: "#757575" }}>{cant} Unidad(es)</Text>
                            </Box>
                            <Box>
                                <HStack>
                                    <Text fontSize="xs" style={{ fontFamily: "Poppins", color: "#A1A2B4" }}>Cantidad recibida:</Text>
                                </HStack>
                                <HStack>
                                    <Center>
                                        <Input variant="outline" value={cant} onChangeText={(e) => { setCant(e); props.fun(props.index, e, props.datos.id) }} />
                                    </Center>
                                    <Center>
                                        <Text fontSize="xs" style={{ fontFamily: "PoppinsMedium", color: "#757575" }}>Unidad(es)</Text>

                                    </Center>
                                </HStack>
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