import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native"
import User from "../../assets/user.png";
import ProductContext from "../features/productContext";
import { useContext } from "react";
import NewArrivalsCard from "../components/NewArrivalsCard";

const ShopScreen = ({ navigation }) => {
    const { products, setProducts } = useContext(ProductContext);

    const handleAdd = () => {
        navigation.navigate("produtoScreen");
    }

    return (
        <SafeAreaView>
            <View className="mt-16 pt-6 justify-center items-center">
                <View className="border border-slate-200 rounded-lg">
                    <Image source={User} className="h-20 w-20 object-cover" />
                </View>
                <Text className="flex-auto">Loja Teste</Text>
            </View>
            <Text>{"\n\n"}</Text>
            <View>
                <Text>Anunciados 20</Text>
                <Text>Doados 20</Text>
            </View>
            <Text>{"\n\n\n"}</Text>
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
            <Text>{"\n\n\n\n\n\n"}</Text>
            <View>
                <Pressable onPress={handleAdd} className="bg-black w-3/4 left-12 py-4 rounded-lg mt-6">
                    <Text className="font-semibold text-white text-center">Publicar novo Produto</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export { ShopScreen };