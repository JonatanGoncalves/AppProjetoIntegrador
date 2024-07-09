import { Text, View, Image, ScrollView, Pressable } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import OfferCard from "../components/OfferCard";
import NewArrivalsCard from "../components/NewArrivalsCard";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "../features/authContext";
import ProductContext from "../features/productContext";
import { getProducts } from "../features/firebase/product";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import {selectedImage} from '../screens/ProfileScreen';

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  const { products, setProducts } = useContext(ProductContext);
  const [profileImage, setProfileImage] = useState(null);

  const fetchAllProducts = async () => {
    const result = await getProducts()
    setProducts(result)
  }

  const loadProfileImage = async () => {
    try {
      const imageUri = await AsyncStorage.getItem('profileImage');
      if (imageUri) {
        setProfileImage(imageUri);
      }
    } catch (error) {
      console.error('Error loading profile image:', error);
    }
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
      await AsyncStorage.setItem('profileImage', result.uri);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    fetchAllProducts()
    loadProfileImage();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="flex-row px-5 mt-6 justify-between items-center">
          {isLoggedIn && (
            <Pressable onPress={() => setModalVisible(!modalVisible)} className="flex-row items-center justify-center border border-slate-400 rounded-full ">
              <Image
                source={{ uri: selectedImage }}
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: "#aaaaaa",
                  borderRadius: 50,
                }}
              />
              <Text className="font-semibold py-2 pr-4 pl-2">Teste</Text>
            </Pressable>
          )}
        </View>

        <View className="mt-6 p-5">
          <OfferCard />
        </View>
        <View className="mt-4">
          <View className="flex-row justify-between items-center px-5">
            <Text className="text-lg font-extrabold">New Arrivals</Text>
            <Pressable onPress={() => navigation.navigate("productlistscreen")}>
              <Text className="text-xs text-gray-500">View All</Text>
            </Pressable>
          </View>
          <ScrollView
            className="mt-4 ml-5"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {products?.map(product =>
              <Pressable key={product.id}
                onPress={() => navigation.navigate("detailscreen",
                  { productId: product.id })}>
                <NewArrivalsCard title={product.title} image={product.image} price={product.price} brand={product.brand} />
              </Pressable>
            )}
          </ScrollView>
        </View>
      </ScrollView>
      <Pressable
        style={{ position: 'absolute', bottom: 20, right: 20 }}
        onPress={() => navigation.navigate("cartscreen")}>
        <View className="bg-orange-500 rounded-full p-2">
          <MaterialIcons name="shopping-cart" size={24} color={"#fff"} />
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;