import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const ImagePickerComponent = ({ image, onChangeImage }) => {
    const openPickerOptions = () => {
        Alert.alert(
            'Adicionar Imagem',
            'Escolha uma opção',
            [
                {
                    text: 'Usar Câmera',
                    onPress: pickImageFromCamera,
                },
                {
                    text: 'Escolher da Galeria',
                    onPress: pickImageFromGallery,
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };

    const pickImageFromCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão Negada', 'Precisamos de permissão para usar a câmera');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            onChangeImage(result.uri);
        }
    };

    const pickImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            onChangeImage(result.uri);
        }
    };

    return (
        <TouchableOpacity style={styles.imageBox} onPress={openPickerOptions}>
            {image ? (
                <Image source={{ uri: image }} style={styles.image} />
            ) : (
                <Ionicons name="camera" size={32} color="gray" />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    imageBox: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default ImagePickerComponent;
