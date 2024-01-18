import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileTab from '../ProfileTab';
import SellerClosets from '../SellerClosets';
import ProductInfo from '../ProductInfoScreen';
import ProductDetails from '../ProductDetails';
import SellerClosetsInfo from '../SellerClosetsInfo';
import SearchScreen from '../searchScreen';
const Stack = createNativeStackNavigator();

export default function SellerclosetsContainer({ navigation }) {
    return (
        <ContainerView />
    );
}

function ContainerView() {
    return (
        <Stack.Navigator initialRouteName='sellerClosets' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="sellerClosets" component={SellerClosets} />
            <Stack.Screen name="sellerProducts" component={ProductInfo} />
            <Stack.Screen name="sellerProductDetails" component={ProductDetails} />
            <Stack.Screen name="sellerClosetsInfo" component={SellerClosetsInfo} />
            <Stack.Screen name="sellerSearchScreen" component={SearchScreen} />
        </Stack.Navigator>
    );
}