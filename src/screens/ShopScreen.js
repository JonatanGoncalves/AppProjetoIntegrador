import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native"
import ProductContext from "../features/productContext";
import { useContext } from "react";
import NewArrivalsCard from "../components/NewArrivalsCard";

const ShopScreen = ({ navigation }) => {
    const { products, setProducts } = useContext(ProductContext);

    const handleAdd = () => {
        navigation.navigate("produtoScreen");
    }

    return (
        <SafeAreaView className="bg-white">
            <Text>{"\n"}</Text>
            <View className="mt-4">
                <View className="flex-row justify-between items-center px-5">
                    <Text className="text-lg font-extrabold">Meus Produtos</Text>
                    <Pressable onPress={() => navigation.navigate("productlistscreen")}>
                        <Text className="text-xs text-gray-500">Ver Tudo</Text>
                    </Pressable>
                </View>
                <ScrollView
                    className="mt-4 ml-5 mb-40"
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    
                </ScrollView>
            </View>
            <Text>{"\n\n\n\n\n\n"}</Text>
            <View>
                <Pressable onPress={handleAdd} className="bg-black w-3/4 left-12 py-4 rounded-lg mb-64 mt-36">
                    <Text className="font-semibold text-white text-center">Publicar novo Produto</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export { ShopScreen };