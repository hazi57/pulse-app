import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/theme';
import { SessionContext } from '../context/SessionContext';

export default function SessionSetupScreen() {
  const { setTotalSessions, resetSession } = useContext(SessionContext);
  const [input, setInput] = useState('');
  const navigation = useNavigation();

  const handleStart = () => {
    const num = parseInt(input);
    if (!isNaN(num) && num > 0) {
      setTotalSessions(num);
      resetSession();
      navigation.navigate('Timer');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Study Sessions</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of sessions"
        keyboardType="numeric"
        value={input}
        onChangeText={setInput}
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 230,},
  session: { fontSize: 20, color: colors.text, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.accent, marginBottom: 20, },
  input: { width: '80%', borderWidth: 1, borderColor: colors.accent, padding: 12, borderRadius: 10, marginBottom: 20, color: colors.text, fontSize: 16, textAlign: 'center', },
  button: { backgroundColor: colors.accent, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25, },
  buttonText: { color: colors.background, fontSize: 16, fontWeight: 'bold', },
});
