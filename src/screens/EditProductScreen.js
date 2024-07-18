import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import ImagePickerComponent from '../components/ImagePickerComponent';

const EditProductScreen = ({ navigation }) => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [images, setImages] = useState([null, null, null, null]);

    const handleImageChange = (index, imageUri) => {
        const newImages = [...images];
        newImages[index] = imageUri;
        setImages(newImages);
    };

    const handleCancel = () => {
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setImages([null, null, null, null]);
        Alert.alert('Cancelado', 'Os campos foram limpos.');
    };

    const handleSave = () => {
        if (!productName || !productDescription || !productPrice || images.filter(image => image !== null).length === 0) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos e adicione pelo menos uma imagem.');
            return;
        }

        const product = {
            name: productName,
            description: productDescription,
            price: productPrice,
            images: images.filter(image => image !== null),
        };

        // Aqui você pode adicionar lógica para salvar o produto, se necessário
        console.log('Produto salvo:', product);
        Alert.alert('Salvo', 'Produto salvo com sucesso!', [
            {
                text: 'OK',
                onPress: () => navigation.goBack(),
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TextInput
                    style={[styles.input, styles.firstInput]}
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
                <TextInput
                    style={styles.input}
                    placeholder="Preço do Produto"
                    value={productPrice}
                    onChangeText={setProductPrice}
                    keyboardType="numeric"
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
        paddingTop: 10,
        backgroundColor: "#FFFF",
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
    firstInput: {
        marginTop: 40,
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
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export { EditProductScreen };
