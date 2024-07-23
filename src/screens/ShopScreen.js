import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import ProductContext from "../features/productContext";
import NewArrivalsCard from "../components/NewArrivalsCard";
import { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderContext from "../features/orderContext";
import OrderItem from "../components/OrderItem";

const ShopScreen = ({ navigation }) => {
  const { products, setProducts } = useContext(ProductContext);
  const { orders, setOrders } = useContext(OrderContext);
  const userId = 'user-123'; // substitua com o ID de usuário real

  useEffect(() => {
    AsyncStorage.getItem(`products-${userId}`)
      .then(products => {
        if (products) {
          setProducts(JSON.parse(products));
        } else {
          setProducts([]);
        }
      });
  }, [userId]);

  useEffect(() => {
    setProducts(products);
  }, [products]);

  const handleAdd = () => {
    navigation.navigate("produtoScreen");
  }

  const handleSaveProduct = (product) => {
    const newProducts = [...localProducts, product];
    AsyncStorage.setItem(`products-${userId}`, JSON.stringify(newProducts));
    setProducts(newProducts);
  }

  return (
    <SafeAreaView className="bg-white">
      <Text>{"\n\n"}</Text>
      <View className="mt-4">
        <View className="flex-row justify-between items-center px-5">
          <Text className="text-lg font-extrabold">Meus Produtos</Text>
        </View>
        <ScrollView
          className="mt-4 ml-5"
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {products?.map(order =>
            <Pressable>
              <OrderItem key={order.id} brand={order.brand} qty={order.qty}
                title={order.title} date={order.date} orderId={order.orderId}
                image={order.image} price={order.price} />
            </Pressable>
          )}
        </ScrollView>
      </View>
      <Text>{"\n\n\n\n\n\n"}</Text>
      <View>
        <Pressable onPress={handleAdd} className="bg-black w-3/4 left-12 py-4 rounded-lg mb-28 mt-36">
          <Text className="font-semibold text-white text-center ">Publicar novo Produto</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default ShopScreen;