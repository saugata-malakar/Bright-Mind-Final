export default function KnowledgeBase() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📚 Medical Knowledge Base</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600 mb-4">
            Access medical guidelines, protocols, and drug information
          </p>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded">
            <p className="text-sm text-blue-800">
              🚧 This will include WHO guidelines, CDC resources, and more
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
