import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../views/Home';
import Cadastro from '../views/Cadastro';
import MainTabs from '../views/MainTabs';
const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#F0F0F0' }
                }}
            >
                <Stack.Screen name="Login" component={Home} />
                <Stack.Screen name="Cadastro" component={Cadastro} />
                <Stack.Screen name="MainApp" component={MainTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;