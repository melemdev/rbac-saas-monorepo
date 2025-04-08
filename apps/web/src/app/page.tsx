import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">YourSaaS</div>
        <div className="flex gap-4">
          <Link href="/auth/signin">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Your SaaS Solution
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Streamline your workflow, boost productivity, and achieve more with our powerful platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Feature 1</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Description of your amazing feature goes here.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Feature 2</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Description of your amazing feature goes here.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Feature 3</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Description of your amazing feature goes here.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 YourSaaS. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
