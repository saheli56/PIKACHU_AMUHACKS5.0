import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Civic Mirror
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          A decision-based civic simulation. Make choices. See the impact.
        </p>
        <Link
          href="/simulation"
          className="inline-block rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Start Simulation
        </Link>
      </div>
    </div>
  );
}
