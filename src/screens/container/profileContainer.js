import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileTab from '../ProfileTab';
import OrderHistroy from '../orderHistroy';
import CreditCardInfoScreen from '../CreditCardInfoScreen';
import ProductInfo from '../ProductInfoScreen';
import SellerVerificationScreen from '../SellerVerificationScreen';
const Stack = createNativeStackNavigator();

export default function ProfileContainer({ navigation }) {
    return (
        <ContainerView />
    );
}

function ContainerView() {
    return (
        <Stack.Navigator initialRouteName='profile' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="profile" component={ProfileTab} />
            <Stack.Screen name="profileOrders" component={OrderHistroy} />
            <Stack.Screen name="profilePayment" component={CreditCardInfoScreen} />
            <Stack.Screen name="profileProductInfo" component={ProductInfo} />
            <Stack.Screen name="profileSellerVerify" component={SellerVerificationScreen} />



        </Stack.Navigator>
    );
}