import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Linking } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AnalysisResponse } from '../types';
import { AlertTriangle, Info, ShieldAlert, ChevronLeft, Search } from 'lucide-react-native';

export default function ResultsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { result } = route.params as { result: AnalysisResponse };

  const [rawIngredients, setRawIngredients] = useState(result.label_transcription.ingredients_raw);

  const openLink = (url: string) => {
    // Basic URL extraction for citations
    const urls = url.match(/https?:\/\/[^\s]+/g);
    if (urls && urls.length > 0) {
      Linking.openURL(urls[0]).catch(() => console.log('Invalid URL'));
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#1F2937" size={24} />
          <Text style={styles.backText}>Scan Again</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* At a Glance */}
        <View style={styles.section}>
          <Text style={styles.headline}>{result.at_a_glance.headline}</Text>
          <Text style={styles.summary}>{result.at_a_glance.summary}</Text>
        </View>

        {/* Extracted Text (Editable) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Label Text</Text>
          <View style={styles.editableContainer}>
            <TextInput
              style={styles.editableText}
              multiline
              value={rawIngredients}
              onChangeText={setRawIngredients}
            />
          </View>
          <Text style={styles.confidenceText}>
            Confidence: {result.label_transcription.confidence.toUpperCase()}
          </Text>
        </View>

        {/* Ingredients List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients Breakdown</Text>
          {result.ingredients.map((ing, idx) => {
            const hasConsiderations = ing.considerations && ing.considerations.length > 0;
            return (
              <View 
                key={idx} 
                style={[
                  styles.card, 
                  hasConsiderations && styles.cardWarning
                ]}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{ing.label_name}</Text>
                  {hasConsiderations && <AlertTriangle color="#DC2626" size={20} />}
                </View>
                <Text style={styles.cardRole}>{ing.usual_role}</Text>
                <Text style={styles.cardExplanation}>{ing.plain_language_explanation}</Text>
                
                {hasConsiderations && (
                  <View style={styles.considerationsBox}>
                    {ing.considerations.map((cons, i) => (
                      <Text key={i} style={styles.considerationText}>• {cons}</Text>
                    ))}
                  </View>
                )}

                {ing.source_note && (
                  <TouchableOpacity onPress={() => openLink(ing.source_note)}>
                    <Text style={styles.sourceText}>Source: {ing.source_note}</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        {/* Allergens */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Allergens</Text>
          <View style={styles.allergenBox}>
            <Text style={styles.allergenSubtitle}>Declared on label:</Text>
            {result.declared_allergens.length > 0 ? (
              result.declared_allergens.map((a, i) => <Text key={i} style={styles.allergenItem}>• {a}</Text>)
            ) : (
              <Text style={styles.allergenItem}>None explicitly declared.</Text>
            )}
            
            <View style={styles.spacer} />
            <Text style={styles.allergenSubtitle}>Inferred possible allergens:</Text>
            {result.possible_allergens_to_verify.length > 0 ? (
              result.possible_allergens_to_verify.map((a, i) => (
                <View key={i} style={styles.allergenWarningRow}>
                  <ShieldAlert color="#F59E0B" size={16} />
                  <Text style={styles.allergenWarningText}>{a}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.allergenItem}>None inferred.</Text>
            )}
          </View>
        </View>

        {/* Research Summary */}
        <View style={styles.section}>
          <View style={styles.flexRow}>
            <Search color="#4B5563" size={20} />
            <Text style={styles.sectionTitleRow}>Research Summary</Text>
          </View>
          <Text style={styles.researchText}>{result.research_summary}</Text>
        </View>

        {/* Limitations & Disclaimer */}
        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerTitle}>What this does not tell you</Text>
          {result.at_a_glance.limitations.map((lim, i) => (
            <Text key={i} style={styles.disclaimerText}>• {lim}</Text>
          ))}
          <View style={styles.spacer} />
          <View style={styles.flexRowStart}>
            <Info color="#6B7280" size={20} style={{marginTop: 2}} />
            <Text style={styles.disclaimerSubtext}>{result.disclaimer}</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Very light grey
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
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  section: {
    marginBottom: 28,
  },
  headline: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  summary: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  sectionTitleRow: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  editableContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
  },
  editableText: {
    fontSize: 14,
    color: '#1F2937',
    minHeight: 60,
  },
  confidenceText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 6,
    textAlign: 'right',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  cardWarning: {
    borderColor: '#FCA5A5', // Subtle red tone
    backgroundColor: '#FEF2F2',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  cardRole: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
    marginBottom: 8,
  },
  cardExplanation: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 12,
  },
  considerationsBox: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  considerationText: {
    fontSize: 14,
    color: '#B91C1C', // Dark red for text
    marginBottom: 4,
    lineHeight: 20,
  },
  sourceText: {
    fontSize: 12,
    color: '#3B82F6', // Blue link
    textDecorationLine: 'underline',
  },
  allergenBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  allergenSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  allergenItem: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  allergenWarningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  allergenWarningText: {
    fontSize: 14,
    color: '#B45309', // Amber-700
    marginLeft: 6,
  },
  spacer: {
    height: 16,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  flexRowStart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  researchText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  disclaimerBox: {
    backgroundColor: '#E5E7EB',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  disclaimerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  disclaimerSubtext: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
});
