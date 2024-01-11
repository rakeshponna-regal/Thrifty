import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetails from '../ProductDetails';
import CartTab from '../CartTab';
import CheckOutScreen from '../checkoutScreen';
import CreditCardInfoScreen from '../CreditCardInfoScreen';
const Stack = createNativeStackNavigator();

export default function CartContainer({ navigation }) {
    return (
        <ContainerView />
    );
}

function ContainerView() {
    return (
        <Stack.Navigator initialRouteName='cart' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="cart" component={CartTab} />
            <Stack.Screen name="cartProdItems" component={ProductDetails} />
            <Stack.Screen name="cartcheckout" component={CheckOutScreen} />
            <Stack.Screen name="cartCreditcardInfo" component={CreditCardInfoScreen} />

        </Stack.Navigator>
    );
}