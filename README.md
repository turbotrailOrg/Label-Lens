# Label Lens MVP

Label Lens is an AI-powered packaged-food ingredient analyser. Users can scan ingredient panels with their phone camera to get an evidence-aware, plain-language explanation of what is in their food.

This MVP is built with an Android-first philosophy using Expo (React Native) for the mobile app and Node.js (Fastify) for the backend.

## Project Structure

- `/api` - Fastify Node.js Backend
- `/app` - React Native Expo Application

## Backend Setup (/api)

The backend handles the securely authenticated calls to OpenAI using Structured Outputs. It parses the uploaded image and enforces a strict response schema.

### 1. Environment Configuration
Navigate to the `api` directory and copy the `.env.example`:

```bash
cd api
cp .env.example .env
```

Edit the `.env` file and insert your chosen API keys:
- For **OpenAI**: Set `AI_PROVIDER=openai` and add your `OPENAI_API_KEY`. (Optional: Set `SERP_API_KEY` for web search capabilities via third-party).
- For **Gemini**: Set `AI_PROVIDER=gemini` and add your `GEMINI_API_KEY`. Gemini uses native Google Search Grounding for evidence-based research.

### 2. Installation and Running
```bash
cd api
npm install
npm run dev
```
The server will start on `http://localhost:3000`.

### 3. Testing
To run the mocked Vitest test suite:
```bash
npm run test
```

## Mobile App Setup (/app)

The mobile application is built with Expo and communicates with the Fastify API.

### 1. Environment Configuration
Ensure your device/emulator and the computer running the backend are on the same network.
You can optionally define the API URL. By default, it will attempt to use `http://localhost:3000/api`. If you test on a physical Android device, you may need to use your machine's local IP address (e.g., `http://192.168.1.X:3000/api`). To do this, create a `.env` in the `app` folder with `EXPO_PUBLIC_API_URL=http://your-ip:3000/api`.

### 2. Installation and Running
```bash
cd app
npm install
npm run android
```

Follow the Expo CLI instructions to open the app on your connected Android device via the Expo Go app or an Android Emulator.

## Known Limitations (MVP)
- No user authentication or cloud synchronization. User preferences are stored locally on the device (via Zustand/memory for this session).
- Only works dynamically with a running backend server.
- Web search functionality is modeled via a tool and expects either SERP API to be set, or assumes the `gpt-5.6-terra` model is capable of resolving search intent autonomously.
