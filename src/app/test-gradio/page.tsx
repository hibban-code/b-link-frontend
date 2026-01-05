'use client';

import { useState } from 'react';
import { Client } from '@gradio/client';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export default function TestGradioPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [testTitle, setTestTitle] = useState('Muhammad: Sang Yatim');

  const testGradio = async () => {
    setLoading(true);
    setResult(null);

    try {
      console.log('🤖 Testing with:', testTitle);
      const client = await Client.connect('ZakyAlf/Compros');
      
      const response = await client.predict('/lambda_1', { 
        title: testTitle,
        k: 10,
      });

      console.log('📦 Response:', response);
      setResult(response);
    } catch (err: any) {
      console.error('❌ Error:', err);
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">🧪 Test AI Recommendations</h1>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Book Title:</label>
            <input
              type="text"
              value={testTitle}
              onChange={(e) => setTestTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter book title from your database..."
            />
          </div>

          <Button onClick={testGradio} disabled={loading} className="w-full">
            {loading ? '⏳ Testing...' : '🚀 Test AI'}
          </Button>
        </div>

        {result && (
          <div className="space-y-4">
            {result.error ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">Error: {result.error}</p>
              </div>
            ) : (
              <>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-semibold">✅ Success!</p>
                </div>

                <div className="p-4 bg-gray-50 border rounded-lg">
                  <p className="font-semibold mb-2">AI Response:</p>
                  <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-96">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>

                {Array.isArray(result.data) && result.data.length > 0 && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-semibold mb-2">Parsed Recommendations:</p>
                    <div className="space-y-2">
                      {(Array.isArray(result.data[0]) ? result.data[0] : result.data)
                        .slice(0, 5)
                        .map((item: any, i: number) => (
                          <div key={i} className="bg-white p-2 rounded border text-sm">
                            <p className="font-medium">{i + 1}. {item.title}</p>
                            <p className="text-xs text-gray-600">{item.general_category}</p>
                            <p className="text-xs text-gray-500">📍 {item.library}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">💡 Tips:</p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Gunakan judul buku yang ada di database Anda</li>
            <li>• Space: ZakyAlf/Compros</li>
            <li>• Endpoint: /lambda_1</li>
            <li>• Returns: Array of books with title, category, library</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
