import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

export default function CompletionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Well Done!</Text>
      <Text style={styles.message}>You've completed all your sessions.</Text>
      <Text style={styles.message}>Keep the rhythm going!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, color: colors.accent, marginBottom: 10, },
  image: { width: 80, height: 80, marginBottom: 20 },
  message: { fontSize: 16, color: colors.text },
});
