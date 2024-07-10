import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Image, Text, TouchableOpacity, Alert } from 'react-native';
import ImagePickerComponent from '../components/ImagePickerComponent';

const EditProductScreen = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [images, setImages] = useState([null, null, null, null]);

    const handleImageChange = (index, imageUri) => {
        const newImages = [...images];
        newImages[index] = imageUri;
        setImages(newImages);
    };

    const handleCancel = () => {
        // Lógica para cancelar a postagem
        setProductName('');
        setProductDescription('');
        setImages([null, null, null, null]);
        Alert.alert('Cancelado', 'Os campos foram limpos.');
    };

    const handleSave = () => {
        // Lógica para salvar o produto
        const product = {
            name: productName,
            description: productDescription,
            images: images.filter(image => image !== null), // filtra imagens nulas
        };
        // Simulação de salvamento (aqui você pode fazer uma chamada a uma API, por exemplo)
        console.log('Produto salvo:', product);
        Alert.alert('Salvo', 'Produto salvo com sucesso!');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Produto"
                    value={productName}
                    onChangeText={setProductName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descrição do Produto"
                    value={productDescription}
                    onChangeText={setProductDescription}
                />
                <View style={styles.imageContainer}>
                    {images.map((image, index) => (
                        <ImagePickerComponent
                            key={index}
                            image={image}
                            onChangeImage={(uri) => handleImageChange(index, uri)}
                        />
                    ))}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                    <Text style={styles.buttonText}>Salvar Produto</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    scrollContainer: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    button: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: '#ff4d4d',
        marginRight: 10,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export {EditProductScreen} ;
