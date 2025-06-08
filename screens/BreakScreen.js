import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/theme';
import { SessionContext } from '../context/SessionContext';

export default function BreakScreen() {
  const {
    currentSession,
    totalSessions,
    setCurrentSession,
    breakTimeMinutes,
  } = useContext(SessionContext);
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(breakTimeMinutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (currentSession + 1 > totalSessions) {
            navigation.navigate('Completion');
          } else {
            setCurrentSession((prev) => prev + 1);
            navigation.navigate('Timer');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min}:${s < 10 ? '0' + s : s}`;
  };

  const handleSkip = () => {
    if (currentSession < totalSessions) {
      navigation.navigate('Timer');
    } else {
      navigation.navigate('Completion');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Break Time 🧘</Text>
      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (currentSession + 1 > totalSessions) {
            navigation.navigate('Completion');
          } else {
            setCurrentSession((prev) => prev + 1);
            navigation.navigate('Timer');
          }
        }}
      >
        <Text style={styles.buttonText}>Skip Break</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 230,},
  session: { fontSize: 20, color: colors.text, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.accent, marginBottom: 20 },
  timer: { fontSize: 48, fontWeight: 'bold', color: colors.text, marginBottom: 20 },
  button: { backgroundColor: colors.accent, padding: 14, borderRadius: 10 },
  buttonText: { color: colors.background, fontSize: 16, fontWeight: 'bold' },
});
