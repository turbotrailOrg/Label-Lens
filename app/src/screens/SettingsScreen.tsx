import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../store/useSettings';
import { ChevronLeft } from 'lucide-react-native';

export default function SettingsScreen() {
  const navigation = useNavigation<any>();
  const { settings, updateSettings } = useSettings();

  const [country, setCountry] = useState(settings.country);
  const [dietary, setDietary] = useState(settings.dietaryPreferences.join(', '));
  const [allergies, setAllergies] = useState(settings.allergies.join(', '));

  const saveSettings = () => {
    updateSettings({
      country,
      dietaryPreferences: dietary.split(',').map(s => s.trim()).filter(s => s),
      allergies: allergies.split(',').map(s => s.trim()).filter(s => s),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#1F2937" size={24} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Preferences</Text>
        <Text style={styles.description}>
          Adding these details helps contextualize the research. The app will never guarantee a product is 100% safe for you.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Country / Region</Text>
          <TextInput
            style={styles.input}
            value={country}
            onChangeText={setCountry}
            placeholder="e.g. United States, EU, Australia"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Dietary Preferences (comma separated)</Text>
          <TextInput
            style={styles.input}
            value={dietary}
            onChangeText={setDietary}
            placeholder="e.g. Vegan, Halal, Keto"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Allergies (comma separated)</Text>
          <TextInput
            style={styles.input}
            value={allergies}
            onChangeText={setAllergies}
            placeholder="e.g. Peanuts, Dairy, Gluten"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 4,
    fontWeight: '500',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  saveButton: {
    backgroundColor: '#111827',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
