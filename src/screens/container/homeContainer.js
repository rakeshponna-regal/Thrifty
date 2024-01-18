import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetails from '../ProductDetails';
import HomeScreen from '../HomeScreen';
import ProductInfo from '../ProductInfoScreen';
const Stack = createNativeStackNavigator();

export default function HomeContainer({ navigation }) {
    return (
        <ContainerView />
    );
}

function ContainerView() {
    return (
        <Stack.Navigator initialRouteName='home' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="homeProdItems" component={ProductDetails} />
            <Stack.Screen name="homeProdInfo" component={ProductInfo} />
            <Stack.Screen name="sellerProductDetails" component={ProductDetails} />
        </Stack.Navigator>
    );
}