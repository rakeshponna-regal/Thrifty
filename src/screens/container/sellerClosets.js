import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileTab from '../ProfileTab';
import SellerClosets from '../SellerClosets';
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
        </Stack.Navigator>
    );
}