import { Text, View, Pressable, Image, ToastAndroid, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getProductById } from "../features/firebase/product";
import ProductContext from "../features/productContext";
import { ScrollView } from "react-native-gesture-handler";
import { addToCart } from "../features/firebase/cart";
import { SafeAreaView } from "react-native-safe-area-context";
import CartContext from "../features/cartContext";
import { getFirestore, collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const DetailScreen = ({ navigation, route }) => {
  const { currentProduct: product, setCurrentProduct } = useContext(ProductContext);
  const { setCartItems } = useContext(CartContext);
  const id = route.params.productId;
  const storage = getStorage(); // Initialize Firebase Storage
  const db = getFirestore(); // Initialize Firebase Firestore
  const abortController = new AbortController();
  const [loading, setLoading] = useState(true); // Add this line
  const [imageUrl, setImageUrl] = useState(null); // Define imageUrl a



  useEffect(() => {
    fetchProductById(id);
    fetchImage();
    return () => {
      abortController.abort();
    };
  }, [id]);

  const fetchImage = async () => {
    if (abortController.signal.aborted) return;
    setLoading(true);
    if (product && product.images) {
      const imageRef = ref(storage, product.images);
      getDownloadURL(imageRef, { signal: abortController.signal })
        .then((url) => {
          setImageUrl(url);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao obter URL da imagem:', error);
          setLoading(false);
        });
    }
  };



  const goBack = () => {
    navigation.goBack()
  }

  const addItemToCart = async () => {
    const res = await addToCart(id, qty)
    if (res.success === true) {
      ToastAndroid.show("item added to cart", ToastAndroid.BOTTOM)
      setCartItems(res.data)
    }
  }

  const fetchProductById = async (id) => {
    const result = await getProductById(id)
    setCurrentProduct(result)
  }




  return (
    <SafeAreaView className="h-full bg-white">
      <View className=" bg-black w-full">
        <Pressable onPress={goBack} className="mt-2 absolute z-10 top-4 justify-center items-center h-10 w-10 mx-4 rounded-full bg-black">
          <MaterialIcons name="chevron-left" size={34} color={"#fff"} />
        </Pressable>
        {loading ? (
          <ActivityIndicator />
        ) : (
          imageUrl ? (
            <Image source={{ uri: imageUrl }} style={{ resizeMode: "cover" }} className=" h-[470]" />
          ) : (
            <Text>Loading...</Text>
          )
        )}
      </View>

      <View className="rounded-[30px]  bg-white mt-[-20px] p-5">
        <View>
          <View className="flex-row justify-between">
            <View>
              <Text className="font-extrabold text-lg">{product?.name}</Text>
              <Text className="text-xs text-gray-500">{product?.brand}</Text>
            </View>

          </View>
          {/* <View className="mt-6">
          <Text className="font-extrabold mb-3">Size</Text>
          <View className="flex-row justify-evenly">
          {sizes.map((size) => (
            <View className="justify-center items-center rounded-full w-10 h-10 bg-white border border-gray-300">
                <Text>{size}</Text>
            </View>
          ))}
          </View>
        </View> */}
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
          <View >
            <Text className="text-gray-500 mb-[-4px]">Total Price</Text>
            <Text className="font-bold text-lg">${product?.price}</Text>
          </View>
          <Pressable onPress={addItemToCart} className="items-center bg-black px-6 py-3 rounded-3xl" >
            <Text className="text-white font-semibold">Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

