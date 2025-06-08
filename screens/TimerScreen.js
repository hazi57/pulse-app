import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/theme';
import { SessionContext } from '../context/SessionContext';

export default function TimerScreen() {
  const navigation = useNavigation();
  const {
    currentSession,
    totalSessions,
    setCurrentSession,
    studyTimeMinutes
  } = useContext(SessionContext);

  const [timeLeft, setTimeLeft] = useState(studyTimeMinutes * 60);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          if (currentSession < totalSessions) {
            navigation.navigate('Break'); 
          } else {
            navigation.navigate('Completion');
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);



  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min}:${s < 10 ? '0' + s : s}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sessionText}>
        Session {currentSession} / {totalSessions}
      </Text>
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setIsRunning(!isRunning)}>
        <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Resume'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => {
          if (currentSession < totalSessions) {
            navigation.navigate('Break');
          } else {
            navigation.navigate('Completion');
          }
        }}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 230,},
  sessionText: { fontSize: 20, color: colors.text, marginBottom: 10, },
  timerText: { fontSize: 64, fontWeight: 'bold', color: colors.accent, marginBottom: 30, },
  button: { backgroundColor: colors.accent, paddingVertical: 14, paddingHorizontal: 32, borderRadius: 30, marginBottom: 20, },
  buttonText: { color: colors.background, fontSize: 18, fontWeight: 'bold', },
  skipButton: { marginTop: 10, },
  skipText: { color: colors.accent, fontSize: 16, },
});
