export interface UserSettings {
  country: string;
  dietaryPreferences: string[];
  allergies: string[];
}

export interface AnalysisResponse {
  scan_status: 'complete' | 'needs_rescan';
  rescan_guidance: string | null;
  product_name: string | null;
  label_transcription: {
    ingredients_raw: string;
    declared_allergens_raw: string | null;
    confidence: 'high' | 'medium' | 'low';
  };
  at_a_glance: {
    headline: string;
    summary: string;
    limitations: string[];
  };
  ingredients: {
    label_name: string;
    normalised_name: string | null;
    usual_role: string;
    plain_language_explanation: string;
    considerations: string[];
    evidence_confidence: 'high' | 'medium' | 'low' | 'unknown';
    source_note: string;
  }[];
  declared_allergens: string[];
  possible_allergens_to_verify: string[];
  personal_context: string[];
  research_summary: string;
  disclaimer: string;
}
