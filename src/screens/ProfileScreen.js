import React, { useContext, useState, useEffect } from "react";
import { Text, View, Image, Pressable, ToastAndroid, ProgressBarAndroid } from "react-native";
import * as ImagePicker from 'expo-image-picker'; // Importando a biblioteca para escolha de imagem
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "../features/authContext";
import { logout } from "../features/firebase/userAuth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const ProfileScreen = () => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para armazenar a imagem selecionada
  const storage = getStorage(); // Initialize Firebase Storage
  const db = getFirestore(); // Initialize Firebase Firestore

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
  
    try {
      const imageRef = ref(storage, `users/${currentUser.uid}`);
      const blob = await fetch(selectedImage).then(res => res.blob());
      const uploadTask = uploadBytes(imageRef, blob);
  
      const uploadPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          async () => {
            // Upload completed successfully
            const url = await getDownloadURL(uploadTask.snapshot.ref);
  
            // Atualiza o perfil do usuário no Firebase Auth
            await updateProfile(currentUser, { photoURL: url });
  
            // Atualiza o documento do usuário no Firestore
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, { profileImage: url });
  
            // Atualiza o estado do usuário localmente
            setCurrentUser({
             ...currentUser,
              photoURL: url,
            });
  
            // Mostra a mensagem de sucesso
            ToastAndroid.show('Imagem de perfil salva com sucesso no perfil!', ToastAndroid.BOTTOM);
            resolve(url);
          }
        );
      });
  
      await uploadPromise; // Await the upload promise
    } catch (error) {
      // Handle error
    }
  };

  // Função para recuperar a imagem de perfil do Firebase Storage
  const fetchProfileImage = async () => {
    try {
      const imageRef = ref(storage, `users/${currentUser.uid}`);
      const url = await getDownloadURL(imageRef);
      setSelectedImage(url); // Define o URI da imagem no estado
    } catch (error) {
      console.error('Erro ao recuperar imagem:', error.message);
      ToastAndroid.show('Erro ao recuperar imagem.', ToastAndroid.BOTTOM);
    }
  };

  // Chame a função para recuperar a imagem quando o componente é montado
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      fetchProfileImage();
    }
  }, [isLoggedIn, currentUser]);

  return (
    <SafeAreaView className="bg-white h-full p-6 justify-between">
      <View>
        <View className="mt-16 justify-center items-center">
          <View className="border border-slate-200 rounded-lg">
            <Image source={selectedImage ? { uri: selectedImage } : null} className="h-32 w-32 object-cover" />
          </View>
          <Pressable onPress={handlePickImage} className="mt-2 bg-gray-200 w-full py-2 rounded-lg">
            <Text className="font-bold text-center">Escolher Imagem da Galeria</Text>
          </Pressable>
        </View>
        <View className="mt-6">
          {isLoggedIn ? (
            <View className="items-center justify-center">
              <Text className="text-lg font-bold">{currentUser?.displayName}</Text>
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