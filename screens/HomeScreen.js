import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/theme';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PULSE</Text>
      <Text style={styles.subtitle}>Study with Rhythm</Text>

      <TouchableOpacity
        style={styles.fullButton}
        onPress={() => navigation.navigate('Session Setup')}
      >
        <Text style={styles.fullButtonText}>Start Study Timer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fullButton}
        onPress={() => navigation.navigate('Mood Check-in')}
      >
        <Text style={styles.fullButtonText}>Check-in (Mood)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fullButton}
        onPress={() => navigation.navigate('Study Plan')}
      >
        <Text style={styles.fullButtonText}>Study Plan</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Generated Plan')}>
        <Text style={styles.studyPlanText}>📘 View My Study Plan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 230, },
  session: { fontSize: 20, color: colors.text, marginBottom: 10, },
  
  title: { fontSize: 42, fontWeight: 'bold', color: colors.accent, marginBottom: 10, },
  subtitle: { fontSize: 18, color: colors.text, marginBottom: 40, },
  
  fullButton: { backgroundColor: colors.accent, paddingVertical: 14, paddingHorizontal: 32, borderRadius: 30, marginTop: 16, width: '70%', alignItems: 'center', },
  fullButtonText: { color: colors.background, fontSize: 18, fontWeight: 'bold', },
  
  studyPlanText: { color: '#FFD700', fontSize: 16, marginTop: 16, textDecorationLine: 'underline', },
});
