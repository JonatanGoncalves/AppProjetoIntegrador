import { Text, View, Pressable, Image, ToastAndroid, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getProductById } from "../features/firebase/product";
import ProductContext from "../features/productContext";
import { ScrollView } from "react-native-gesture-handler";
import { addToCart } from "../features/firebase/cart";
import { SafeAreaView } from "react-native-safe-area-context";
import CartContext from "../features/cartContext";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const DetailScreen = ({ navigation, route }) => {
  const { currentProduct: product, setCurrentProduct } = useContext(ProductContext);
  const { setCartItems } = useContext(CartContext);
  const id = route.params.productId;
  const storage = getStorage(); // Initialize Firebase Storage
  const db = getFirestore(); // Initialize Firebase Firestore
  const abortController = new AbortController();
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetchProductById(id);
    return () => {
      abortController.abort();
    };
  }, [id]);

  useEffect(() => {
    if (product && product.images) {
      setImageUrl(product.images[0]); // Usar a primeira imagem do array
      setLoading(false);
    }
  }, [product]);

  const goBack = () => {
    navigation.goBack();
  };

  const addItemToCart = async () => {
    const res = await addToCart(id, 1);
    if (res.success === true) {
      ToastAndroid.show("Item added to cart", ToastAndroid.BOTTOM);
      setCartItems(res.data);
    }
  };

  const fetchProductById = async (id) => {
    const result = await getProductById(id);
    setCurrentProduct(result);
  };

  const handleThumbnailPress = (image) => {
    setImageUrl(image);
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="bg-black w-full">
        <Pressable onPress={goBack} className="mt-2 absolute z-10 top-4 justify-center items-center h-10 w-10 mx-4 rounded-full bg-black">
          <MaterialIcons name="chevron-left" size={34} color={"#fff"} />
        </Pressable>
        {loading ? (
          <ActivityIndicator />
        ) : (
          imageUrl ? (
            <Image source={{ uri: imageUrl }} style={{ resizeMode: "cover" }} className="h-[470]" />
          ) : (
            <Text>Loading...</Text>
          )
        )}
      </View>

      <View className="rounded-[30px] bg-white mt-[-20px] p-5">
        <View>
          <View className="flex-row justify-between">
            <View>
              <Text className="font-extrabold text-lg">{product?.name}</Text>
              <Text className="text-xs text-gray-500">{product?.brand}</Text>
            </View>
          </View>
          <View className="flex-row mt-4">
            {product?.images?.map((image, index) => (
              <Pressable key={index} onPress={() => handleThumbnailPress(image)} className="mr-2">
                <Image source={{ uri: image }} style={{ width: 50, height: 50, borderRadius: 5 }} />
              </Pressable>
            ))}
          </View>
          <View className="mt-6">
            <Text className="font-extrabold mb-3">Description</Text>
            <ScrollView className="h-36">
              <Text className="text-gray-500 text-xs">
                {product?.description}
              </Text>
            </ScrollView>
          </View>
        </View>
      </View>
      <View className="absolute bottom-4 left-0 w-full px-4">
        <View className="flex-row justify-between items-center mt-8">
          <View>
            <Text className="text-gray-500 mb-[-4px]">Total Price</Text>
            <Text className="font-bold text-lg">${product?.price}</Text>
          </View>
          <Pressable onPress={addItemToCart} className="items-center bg-black px-6 py-3 rounded-3xl">
            <Text className="text-white font-semibold">Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
