import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-3xl shadow-xl">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="h-10 w-10" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-gray-900">404</h1>
          <h2 className="text-xl font-semibold text-gray-700">Page Not Found</h2>
          <p className="text-gray-500">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <Link href="/">
          <Button className="w-full btn-primary">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
