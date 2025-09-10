import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Join Competitions - GiG Geni",
  description: "Find and join competitions",
}

export default function JoinCompetitionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Join Competitions
      </h1>
      <div className="bg-secondary rounded-lg p-8">
        <p className="text-gray-500">
          🚧 Available competitions to join coming soon...
        </p>
        <p className="text-sm text-gray-400 mt-2">
          (Employee only page)
        </p>
      </div>
    </div>
  )
}