import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { colors } from '../constants/theme';

export default function PlanScreen() {
  const navigation = useNavigation();
  const [preference, setPreference] = useState(null);
  const [studyHours, setStudyHours] = useState('');
  const [subjects, setSubjects] = useState([{ name: '', date: new Date() }]);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerIndex, setPickerIndex] = useState(null);

  const updateSubjectName = (index, value) => {
    const updated = [...subjects];
    updated[index].name = value;
    setSubjects(updated);
  };

  const updateExamDate = (date) => {
    if (pickerIndex !== null) {
      const updated = [...subjects];
      updated[pickerIndex].date = date;
      setSubjects(updated);
    }
    setShowPicker(false);
    setPickerIndex(null);
  };

  const handleGenerate = () => {
    if (preference && studyHours && subjects.every(s => s.name && s.date)) {
      navigation.navigate('Generated Plan', {
        preference,
        studyHours,
        subjects,
      });
    }
  };

  const addSubject = () => {
    if (subjects.length < 6) {
      setSubjects([...subjects, { name: '', date: new Date() }]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Personalize Your Study Plan</Text>

        <View style={styles.questionBox}>
          <Text style={styles.question}>When do you prefer to study?</Text>
          <View style={styles.squareContainer}>
            <TouchableOpacity
              style={[styles.squareOption, preference === 'morning' && styles.selected]}
              onPress={() => setPreference('morning')}
            >
              <Text style={styles.emoji}>🌅</Text>
              <Text style={styles.label}>Morning</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.squareOption, preference === 'night' && styles.selected]}
              onPress={() => setPreference('night')}
            >
              <Text style={styles.emoji}>🌙</Text>
              <Text style={styles.label}>Night</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.questionBox}>
          <Text style={styles.question}>How many hours a day do you want to study?</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 3"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={studyHours}
            onChangeText={setStudyHours}
          />
        </View>

        <View style={styles.questionBox}>
          <Text style={styles.question}>Add Subjects & Exam Dates</Text>
          {subjects.map((subject, index) => (
            <View key={index} style={styles.card}>
              <TextInput
                style={styles.input}
                placeholder={`Subject ${index + 1}`}
                placeholderTextColor="#aaa"
                value={subject.name}
                onChangeText={(text) => updateSubjectName(index, text)}
              />
              <TouchableOpacity
                onPress={() => {
                  setPickerIndex(index);
                  setShowPicker(true);
                }}
                style={styles.dateButton}
              >
                <Text style={styles.dateText}>Exam Date: {subject.date.toDateString()}</Text>
              </TouchableOpacity>
            </View>
          ))}

          <DateTimePicker
            isVisible={showPicker}
            mode="date"
            onConfirm={updateExamDate}
            onCancel={() => setShowPicker(false)}
            date={pickerIndex !== null ? subjects[pickerIndex].date : new Date()}
          />

          <TouchableOpacity onPress={addSubject} style={styles.addButton}>
            <Text style={styles.addText}>+ Add Another Subject</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !(preference && studyHours && subjects.every(s => s.name && s.date)) && styles.disabled]}
          onPress={handleGenerate}
          disabled={!(preference && studyHours && subjects.every(s => s.name && s.date))}
        >
          <Text style={styles.nextText}>Generate Study Plan</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: colors.background, alignItems: 'center', },
  title: { fontSize: 24, color: colors.accent, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', },
  
  questionBox: { width: '100%', backgroundColor: '#1e1e2f', padding: 16, borderRadius: 12, marginBottom: 20, },
  question: { fontSize: 18, color: colors.text, marginBottom: 12, textAlign: 'left', },
  
  squareContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', },
  squareOption: { backgroundColor: '#2e2e40', width: 120, height: 120, borderRadius: 12, justifyContent: 'center', alignItems: 'center', },
  
  selected: { backgroundColor: colors.accent, },
  emoji: { fontSize: 40, marginBottom: 8, },
  label: { color: colors.text, fontSize: 16, textAlign: 'center', },
  input: { width: '100%', padding: 10, borderWidth: 1, borderColor: colors.accent, borderRadius: 10, color: colors.text, backgroundColor: '#1e1e2f', },
  card: { width: '100%', marginBottom: 20, },
  
  dateButton: { paddingVertical: 12, paddingHorizontal: 10, borderRadius: 10, backgroundColor: '#1e1e2f', marginTop: 10, },
  dateText: { color: colors.accent, fontSize: 14, },
  
  addButton: { marginBottom: 10, },
  addText: { color: colors.accent, fontSize: 16, },
  
  nextButton: { backgroundColor: colors.accent, paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30, marginTop: 20, marginBottom: 30, },
  nextText: { color: colors.background, fontSize: 16, fontWeight: 'bold', }, 
  
  disabled: { opacity: 0.5, },
});
