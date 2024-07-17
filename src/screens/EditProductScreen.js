import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import ImagePickerComponent from '../components/ImagePickerComponent';
import { getFirestore, collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditProductScreen = ({ navigation }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [images, setImages] = useState([null, null, null, null]);
  const storage = getStorage(); // Initialize Firebase Storage
  const db = getFirestore(); // Initialize Firebase Firestore

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

  const handleSave = async () => {
    if (!productName || !productDescription || !productPrice || images.filter(image => image !== null).length === 0) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos e adicione pelo menos uma imagem.');
      return;
    }

    try {
      // Array para armazenar as URLs das imagens após o upload
      const uploadedImageUrls = [];

      // Realiza o upload de cada imagem para o Firebase Storage
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (image) {
          const imageRef = ref(storage, `products/${productName}_${i}`);
          const response = await fetch(image);
          const blob = await response.blob();
          await uploadBytes(imageRef, blob);
          const downloadURL = await getDownloadURL(imageRef);
          uploadedImageUrls.push(downloadURL);
        }
      }

      // Objeto com os dados do produto a serem salvos no Firestore
      const productData = {
        name: productName,
        description: productDescription,
        price: productPrice,
        images: uploadedImageUrls,
      };

      // Salva os dados do produto no Firestore
      const docRef = await addDoc(collection(db, 'products'), productData);

      // Exibe mensagem de sucesso e retorna para a tela anterior
      Alert.alert('Sucesso', 'Produto salvo com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);

    } catch (error) {
      console.error('Erro ao salvar o produto:', error);
      Alert.alert('Erro', 'Houve um erro ao tentar salvar o produto.');
    }
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
    paddingTop: 40,
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

export default EditProductScreen;
