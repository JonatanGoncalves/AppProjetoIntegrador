import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Modal, Text, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const ImagePickerComponent = ({ image, onChangeImage }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleAddPhoto = async (source) => {
        let result;
        if (source === 'camera') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status === 'granted') {
                result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
            }
        } else if (source === 'library') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status === 'granted') {
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
            }
        }

        if (!result?.canceled) {
            onChangeImage(result.assets[0].uri);
        }
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={() => setModalVisible(true)}
            >
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <View style={styles.iconContainer}>
                        <Ionicons name="camera" size={30} color="black" />
                    </View>
                )}
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Escolha a origem da foto</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Tirar Foto" onPress={() => handleAddPhoto('camera')} color="#007BFF" />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Escolher da Galeria" onPress={() => handleAddPhoto('library')} color="#007BFF" />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#ff4d4d" />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 100,  // Tamanho do quadradinho
        height: 100, // Tamanho do quadradinho
        backgroundColor: '#f8f8f8',  // Fundo mais claro para um visual mais clean
        borderRadius: 10,
        borderWidth: 2,  // Borda sutil
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,  // Espaçamento entre quadradinhos
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',  // Fundo do modal mais escuro
    },
    modalContainer: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 10,  // Sombra para um visual mais moderno
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '100%',
        marginVertical: 5,
    },
});

export default ImagePickerComponent;
