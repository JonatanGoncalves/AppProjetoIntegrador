import React, { useContext, useState, useEffect } from "react";
import { Text, View, Image, Pressable, ToastAndroid, TextInput } from "react-native";
import * as ImagePicker from 'expo-image-picker'; // Importando a biblioteca para escolha de imagem
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "../features/authContext";
import { logout } from "../features/firebase/userAuth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const ProfileScreen = ({ navigation }) => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para armazenar a imagem selecionada
  const [newName, setNewName] = useState(currentUser?.name); // Estado para armazenar o novo nome
  const [isEditingName, setIsEditingName] = useState(false); // Estado para controlar se o nome está sendo editado
  const storage = getStorage(); // Initialize Firebase Storage
  const db = getFirestore(); // Initialize Firebase Firestore

  const handleShop = () => {
    navigation.navigate("vendasScreen");
  }

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
    navigation.navigate('login');
  };

  // Função para salvar a imagem no Firebase Storage
  const handleSaveImage = async () => {
    if (!selectedImage) {
      ToastAndroid.show('Selecione uma imagem primeiro.', ToastAndroid.BOTTOM);
      return;
    }

    try {
      const imageRef = ref(storage, `users/${currentUser?.uid}`);
      const blob = await fetch(selectedImage).then(res => res.blob());
      const uploadTask = uploadBytes(imageRef, blob);

      const uploadPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          async () => {
            // Upload completed successfully
            const url = await getDownloadURL(uploadTask.snapshot.ref);

            // Update user profile
            await updateProfile(currentUser, { photoURL: url });

            // Update user document
            const userDocRef = doc(db, 'users', currentUser?.uid);
            await updateDoc(userDocRef, { profileImage: url });

            // Update local user state
            setCurrentUser({ ...currentUser, photoURL: url });

            // Show success message
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
      const imageRef = ref(storage, `users/${currentUser?.uid}`);
      const url = await getDownloadURL(imageRef);
      setSelectedImage(url); // Define o URI da imagem no estado
    } catch (error) {
 
    }
  };

  // Chame a função para recuperar a imagem quando o componente é montado
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      fetchProfileImage();
    }
  }, [isLoggedIn, currentUser]);

  const handleSaveName = async () => {
    if (newName === currentUser?.name) {
      ToastAndroid.show('Nenhuma alteração no nome.', ToastAndroid.BOTTOM);
      return;
    }

    try {
      await updateProfile(currentUser, { name: newName });
      await updateDoc(doc(db, 'users', currentUser?.uid), { name: newName });
      setCurrentUser({ ...currentUser, name: newName });
      setIsEditingName(false);
      ToastAndroid.show('Nome atualizado com sucesso!', ToastAndroid.BOTTOM);
    } catch (error) {
      console.error('Erro ao atualizar nome:', error.message);
      ToastAndroid.show('Erro ao atualizar nome.', ToastAndroid.BOTTOM);
    }
  };

  const handleSaveChanges = async () => {
    if (selectedImage) {
      await handleSaveImage();
    }
    if (newName !== currentUser?.name) {
      await handleSaveName();
    }
    ToastAndroid.show('Todas as alterações salvas com sucesso!', ToastAndroid.BOTTOM);
  };

  return (
    <SafeAreaView className="bg-white h-full p-6 justify-between">
      <View>
        <View className="mt-16 justify-center items-center">
          <View className="border border-slate-200 rounded-lg">
            <Image source={selectedImage ? { uri: selectedImage } : null} className="h-32 w-32 object-cover" />
          </View>
          <Pressable onPress={handlePickImage} className="mt-2 bg-gray-200 w-1/3 py-2 rounded-lg ">
            <Text className="font-bold text-center">Editar imagem</Text>
          </Pressable>
        </View>
        <View className="mt-6">
          {isLoggedIn ? (
            <View className="items-center justify-center">
              <View>
                <Pressable onPress={() => setIsEditingName(true)} style={{ right: 0, top: 0, alignSelf: "flex-start" }}>

                  <Text className="text-lg font-bold"><Text className="text-lg font-bold">{currentUser?.name}</Text><Text style={{ fontSize: 16, marginRight: 3 }}>✏️</Text></Text>
                </Pressable>


              </View>
              {isEditingName ? (
                <TextInput
                  value={newName}
                  onChangeText={(text) => setNewName(text)}
                  placeholder="Novo nome"
                  className="w-1/3 p-2 border-hide border-gray-200 rounded-lg"
                />
              ) : null}
              <Text className="text-xs font-bold text-gray-500">{currentUser?.email}</Text>
              <Text>{"\n\n\n"}</Text>
              <Pressable onPress={handleShop} className="bg-black p-3 w-32 right-32 rounded-lg mt-6">
                <Text className="font-semibold text-white text-center">Histórico</Text>
              </Pressable>
            </View>
          ) : (
            <View className="items-center justify-center">
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
            <Pressable onPress={handleSaveChanges} className="mt-4 bg-blue-500 w-full py-2 rounded-lg">
              <Text className="font-bold text-white text-center">Salvar alterações</Text>
            </Pressable>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;