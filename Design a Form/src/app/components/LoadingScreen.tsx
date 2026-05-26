import { GraduationCap } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-[var(--brand-blue)] rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <div className="absolute inset-0 w-20 h-20 bg-[var(--brand-blue)] rounded-2xl mx-auto animate-ping opacity-20"></div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">BrightMind</h1>
        <p className="text-gray-600">Powered by Gemma 4</p>
        <div className="mt-6 flex justify-center">
          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[var(--brand-blue)] rounded-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">Initializing learning environment...</p>
      </div>
    </div>
  );
}
