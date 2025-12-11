// src/app/debug-env/page.tsx
export default function DebugEnvPage() {
  return (
    <div className="p-8">
      <h1>Environment Variables Debug</h1>
      <pre className="bg-gray-800 p-4 rounded">
        {JSON.stringify({
          FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing',
          FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ? '✅ Set' : '❌ Missing',
          FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? '✅ Set (first 20 chars)' : '❌ Missing'
        }, null, 2)}
      </pre>
    </div>
  );
}