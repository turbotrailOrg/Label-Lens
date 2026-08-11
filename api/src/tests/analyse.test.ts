import { describe, it, expect, vi } from 'vitest';
import { analyseIngredients } from '../services/openai';

vi.mock('openai', () => {
  return {
    default: class {
      chat = {
        completions: {
          create: vi.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: JSON.stringify({
                    scan_status: "complete",
                    rescan_guidance: null,
                    product_name: "Mock Product",
                    label_transcription: {
                      ingredients_raw: "Water, Sugar",
                      declared_allergens_raw: null,
                      confidence: "high"
                    },
                    at_a_glance: {
                      headline: "Generally fine",
                      summary: "Basic ingredients.",
                      limitations: []
                    },
                    ingredients: [],
                    declared_allergens: [],
                    possible_allergens_to_verify: [],
                    personal_context: [],
                    research_summary: "No issues.",
                    disclaimer: "Disclaimer text"
                  })
                }
              }
            ]
          })
        }
      }
    }
  }
});

describe('analyseIngredients', () => {
  it('should return a structured response', async () => {
    const buffer = Buffer.from('fake-image-data');
    const result = await analyseIngredients(buffer, 'image/jpeg', {});
    
    expect(result.scan_status).toBe('complete');
    expect(result.product_name).toBe('Mock Product');
  });
});
