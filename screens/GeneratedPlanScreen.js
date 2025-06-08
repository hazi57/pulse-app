import { useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

export default function GeneratedPlanScreen() {
  const route = useRoute();
  const { preference, studyHours, subjects } = route.params || {};

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>📚 Your Study Plan</Text>

      <View style={styles.planBox}>
        <Text style={styles.label}>Preferred Study Time:</Text>
        <Text style={styles.value}>{preference === 'morning' ? '🌅 Morning' : '🌙 Night'}</Text>
      </View>

      <View style={styles.planBox}>
        <Text style={styles.label}>Study Hours per Day:</Text>
        <Text style={styles.value}>{studyHours} hours</Text>
      </View>

      <View style={styles.planBox}>
        <Text style={styles.label}>Subjects and Exam Dates:</Text>
        {subjects?.map((subj, index) => (
          <Text key={index} style={styles.subject}>
            {subj.name} — {new Date(subj.date).toDateString()}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ container: { padding: 20, backgroundColor: colors.background, alignItems: 'flex-start',},
  title: { fontSize: 24, color: colors.accent, fontWeight: 'bold', marginBottom: 20, },
  planBox: { width: '100%', backgroundColor: '#1e1e2f', padding: 16, borderRadius: 12, marginBottom: 20, },
  label: { fontSize: 16, color: colors.text, marginBottom: 6, },
  value: { fontSize: 18, color: colors.accent, fontWeight: '600', },
  subject: { color: colors.text, marginLeft: 10, marginTop: 6, },
  tip: { marginTop: 10, fontStyle: 'italic', color: '#ccc', },
});
