import axios from 'axios';
import { AnalysisResponse, UserSettings } from '../types';

// Use local machine IP for testing on physical device/emulator
// E.g. 'http://192.168.x.x:3000/api'
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export const analyseImage = async (
  imageUri: string,
  preferences: UserSettings
): Promise<AnalysisResponse> => {
  const formData = new FormData();
  
  // Extract filename and type
  const filename = imageUri.split('/').pop() || 'image.jpg';
  const match = /\\.(\\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : 'image/jpeg';

  formData.append('image', {
    uri: imageUri,
    name: filename,
    type,
  } as any);

  formData.append('preferences', JSON.stringify(preferences));

  const response = await axios.post<AnalysisResponse>(`${API_URL}/analyse`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 30000, // 30 seconds timeout for AI processing
  });

  return response.data;
};
