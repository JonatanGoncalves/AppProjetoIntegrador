import React, { useContext, useState } from "react";
import { Text, View, Image, Pressable, ToastAndroid, ProgressBarAndroid } from "react-native";
import * as ImagePicker from 'expo-image-picker'; // Importando a biblioteca para escolha de imagem
import { SafeAreaView } from "react-native-safe-area-context";
import User from "../../assets/user.png";
import AuthContext from "../features/authContext";
import { logout } from "../features/firebase/userAuth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

// Função para upload no Firebase Storage

const ProfileScreen = () => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para armazenar a imagem selecionada
  const storage = getStorage(); // Initialize Firebase Storage

  // Função para selecionar uma imagem da galeria
  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      ToastAndroid.show("Permissão para acessar a galeria foi negada.", ToastAndroid.BOTTOM);
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri); // Armazena o URI da imagem selecionada
    }
  };

  // Função para lidar com o logout
  const handleLogout = async () => {
    const res = await logout();
    if (res.success === true) {
      ToastAndroid.show("Logged Out Successfully", ToastAndroid.BOTTOM);
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  // Função para salvar a imagem no Firebase Storage
  const handleSaveImage = async () => {
    if (!selectedImage) {
      ToastAndroid.show('Selecione uma imagem primeiro.', ToastAndroid.BOTTOM);
      return;
    }

    //try {
    const imageRef = ref(storage, `users/${currentUser.id}`); // Create a reference to the image in Storage
    const uploadTask = uploadBytes(imageRef, await fetch(selectedImage).then(res => res.blob())); // Upload the image to Storage

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Handle upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
      },
      (error) => {
        ToastAndroid.show('Erro ao salvar imagem.', ToastAndroid.BOTTOM); // Show error toast here
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref); // Get the download URL of the uploaded image
          const userId = firebase.auth().currentUser.uid;
          const userProfileRef = firebase.firestore().collection('users/').doc(currentUser.id);
          await userProfileRef.update({ profileImage: url }); // Update the user's profile image URL in Firestore

          setCurrentUser({
            ...currentUser,
            profileImage: url,
          });
          ToastAndroid.show('Imagem de perfil atualizada com sucesso.', ToastAndroid.BOTTOM);

        } catch (error) {
          console.error('Erro ao salvar imagem:', error.message);
          ToastAndroid.show('Erro ao salvar imagem.', ToastAndroid.BOTTOM); // Show error toast here
        }
      }
    );
  };

  return (
    <SafeAreaView className="bg-white h-full p-6 justify-between">
      <View>
        <View className="mt-16 justify-center items-center">
          <View className="border border-slate-200 rounded-lg">
            <Image source={selectedImage ? { uri: selectedImage } : User} className="h-32 w-32 object-cover" />
          </View>
          <Pressable onPress={handlePickImage} className="mt-2 bg-gray-200 w-full py-2 rounded-lg">
            <Text className="font-bold text-center">Escolher Imagem da Galeria</Text>
          </Pressable>
        </View>
        <View className="mt-6">
          {isLoggedIn ? (
            <View className="items-center justify-center">
              <Text className="text-lg font-bold">{currentUser?.name}</Text>
              <Text className="text-xs font-bold text-gray-500">{currentUser?.email}</Text>
            </View>
          ) : (
            <View className="items-center justify-center">
              <Text className="text-lg font-bold">Login para ver seu perfil!</Text>
            </View>
          )}
        </View>
      </View>
      {isLoggedIn && (
        <View className="justify-center items-center">
          <Pressable onPress={handleLogout} className="bg-black w-full py-4 rounded-lg">
            <Text className="font-bold text-white text-center">Sair</Text>
          </Pressable>
          {selectedImage && (
            <Pressable onPress={handleSaveImage} className="mt-4 bg-blue-500 w-full py-2 rounded-lg">
              <Text className="font-bold text-white text-center">Salvar Imagem de Perfil</Text>
            </Pressable>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;