import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

export default function MoodCheckScreen() {
  const [energy, setEnergy] = useState(0.5); 
  const [mood, setMood] = useState(0.5);     

  const handleCheck = () => {
    let zone = '';
    let message = '';

    if (energy > 0.66 && mood < 0.33) {
      zone = '🔴 Red Zone';
      message = 'High energy + negative mood. You might feel frustrated or anxious. Try some grounding techniques.';
    } else if (energy > 0.66 && mood > 0.66) {
      zone = '🟡 Yellow Zone';
      message = 'High energy + positive mood. Great time to tackle challenges or creative work!';
    } else if (energy < 0.33 && mood < 0.33) {
      zone = '🔵 Blue Zone';
      message = 'Low energy + negative mood. Consider rest, journaling, or a calming activity.';
    } else if (energy < 0.33 && mood > 0.66) {
      zone = '🟢 Green Zone';
      message = 'Low energy + positive mood. Reflect, read, or do light planning.';
    } else {
      zone = '⚖️ Neutral Zone';
      message = 'You seem balanced. Listen to what your body and mind need most right now.';
    }

    Alert.alert(zone, message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Mood Check-In</Text>

      <Text style={styles.label}>Energy Level</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={energy}
        minimumTrackTintColor="#FFD700"
        maximumTrackTintColor="#888"
        onValueChange={setEnergy}
      />
      <View style={styles.sliderLabels}>
        <Text style={styles.axisText}>Low</Text>
        <Text style={styles.axisText}>High</Text>
      </View>

      <Text style={styles.label}>Mood</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={mood}
        minimumTrackTintColor="#FFD700"
        maximumTrackTintColor="#888"
        onValueChange={setMood}
      />
      <View style={styles.sliderLabels}>
        <Text style={styles.axisText}>Negative</Text>
        <Text style={styles.axisText}>Positive</Text>
      </View>

      <Text style={styles.checkButton} onPress={handleCheck}>Check My Mood</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: 24, },
  title: { fontSize: 24, color: colors.text, fontWeight: 'bold', marginBottom: 30, },
  label: { fontSize: 16, color: colors.text, marginTop: 20, },
  slider: { width: '90%', height: 40, },
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between', width: '90%', },
  axisText: { color: colors.text, fontSize: 14, },
  checkButton: { marginTop: 40, backgroundColor: colors.accent, color: colors.background, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 30, fontWeight: 'bold', fontSize: 16, },
});
