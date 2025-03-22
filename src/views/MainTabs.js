import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Estatisticas from './Estatisticas';
import Calendario from './Calendario'
import Jogadores from './Jogadores';
import Videos from './Videos';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Estatisticas') {
                        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                    } else if (route.name === 'Calendario') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    } else if (route.name === 'Jogadores') {
                        iconName = focused ? 'shirt' : 'shirt-outline';
                    } else if (route.name === 'Videos') {
                        iconName = focused ? 'play-circle' : 'play-circle-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#1A2D5A',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,

            })}
        >
            <Tab.Screen name="Estatisticas" component={Estatisticas} />
            <Tab.Screen name="Calendario" component={Calendario} />
            <Tab.Screen name="Jogadores" component={Jogadores} />
            <Tab.Screen name="Videos" component={Videos} />
        </Tab.Navigator>
    );
};

export default MainTabs;