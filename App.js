import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { SessionProvider } from './context/SessionContext';

import BreakScreen from './screens/BreakScreen';
import CompletionScreen from './screens/CompletionScreen';
import GeneratedPlanScreen from './screens/GeneratedPlanScreen';
import HomeScreen from './screens/HomeScreen';
import MoodCheckScreen from './screens/MoodCheckScreen';
import PlanScreen from './screens/PlanScreen';
import SessionSetupScreen from './screens/SessionSetupScreen';
import TimerScreen from './screens/TimerScreen';

const Stack = createNativeStackNavigator();

function CustomBackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 10 }}>
      <Ionicons name="arrow-back" size={24} color="#FFD700" />
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <SessionProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#0A0F24' },
            headerTintColor: '#FFD700',
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: () => <CustomBackButton />,  
          }}
        >
          <Stack.Screen name="Session Setup" component={SessionSetupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Timer" component={TimerScreen} />
          <Stack.Screen name="Break" component={BreakScreen} />
          <Stack.Screen name="Completion" component={CompletionScreen} />
          <Stack.Screen name="Mood Check-in" component={MoodCheckScreen} />
          <Stack.Screen name="Study Plan" component={PlanScreen} />
          <Stack.Screen name="Generated Plan" component={GeneratedPlanScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SessionProvider>
  );
}
