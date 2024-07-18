import { Text, View, Pressable, Image, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getProductById } from "../features/firebase/product";
import ProductContext from "../features/productContext";
import { ScrollView } from "react-native-gesture-handler";
import { addToCart } from "../features/firebase/cart";
import { SafeAreaView } from "react-native-safe-area-context";
import CartContext from "../features/cartContext";

// const sizes = ["S", "M", "L", "XL", "XXL"];

const DetailScreen = ({ navigation, route }) => {
  const { currentProduct: product, setCurrentProduct } = useContext(ProductContext);
  const { setCartItems } = useContext(CartContext)
  const id = route.params.productId;

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

  useEffect(() => {
    fetchProductById(id)
  }, [id])

  return (
    <SafeAreaView className="h-full bg-white">
      <View className=" bg-black w-full">
        <Pressable onPress={goBack} className="mt-2 absolute z-10 top-4 justify-center items-center
         h-10 w-10 mx-4 rounded-full bg-black">
          <MaterialIcons name="chevron-left" size={34} color={"#fff"} />
        </Pressable>
        <Image source={{ uri: product?.image }} style={{ resizeMode: "cover" }} className=" h-[470]" />
      </View>

      <View className="rounded-[30px]  bg-white mt-[-20px] p-5">
        <View>
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

