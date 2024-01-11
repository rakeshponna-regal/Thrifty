import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetails from '../ProductDetails';
import CartTab from '../CartTab';
import FavoriteTab from '../FavoriteTab';
const Stack = createNativeStackNavigator();

export default function FavoriteContainer({ navigation }) {
    return (
        <ContainerView />
    );
}

function ContainerView() {
    return (
        <Stack.Navigator initialRouteName='favorite' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="favorite" component={FavoriteTab} />
            <Stack.Screen name="favProdItems" component={ProductDetails} />
        </Stack.Navigator>
    );
}