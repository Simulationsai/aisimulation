export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-20">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-gray-300">
          AISimulation only collects information required for participation, security, and platform integrity.
        </p>
        <div className="space-y-4 text-gray-400">
          <p>We do not sell personal data. Optional wallet or social connections are always opt-in.</p>
          <p>Data is used for authentication, anti-sybil protection, and contribution tracking.</p>
          <p>For requests related to data access or deletion, contact support.</p>
        </div>
      </div>
    </main>
  )
}
