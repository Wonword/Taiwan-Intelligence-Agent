import React from 'react';
import { AlertTriangle, Key, RefreshCw, X } from 'lucide-react';

interface ErrorBannerProps {
  error: string | null;
  onDismiss: () => void;
  onRetry?: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  error,
  onDismiss,
  onRetry,
}) => {
  if (!error) return null;

  const isKeyError =
    error.includes('GEMINI_API_KEY') ||
    error.includes('API_KEY_INVALID') ||
    error.includes('PERMISSION_DENIED');

  const isQuotaError =
    error.includes('RESOURCE_EXHAUSTED') || error.includes('429');

  return (
    <div className="bg-rose-50 border border-rose-300 p-4 mb-6 shadow-xs text-rose-900">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
              Analysis Execution Halted
            </h4>
            <p className="text-xs text-rose-800 leading-relaxed font-sans">{error}</p>

            {isKeyError && (
              <div className="mt-2 text-xs bg-rose-100/70 p-2.5 border border-rose-200 text-rose-900">
                <span className="font-semibold block mb-0.5">Configuration Notice:</span>
                Ensure <code>GEMINI_API_KEY</code> is properly configured in your server environment variables or in the AI Studio Secrets panel.
              </div>
            )}

            {isQuotaError && (
              <div className="mt-2 text-xs bg-rose-100/70 p-2.5 border border-rose-200 text-rose-900">
                <span className="font-semibold block mb-0.5">Rate Limit Notice:</span>
                The Gemini API rate limit or quota has been reached. Please pause a moment before retrying.
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-800 hover:bg-rose-900 text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          )}
          <button
            onClick={onDismiss}
            className="p-1 text-rose-500 hover:text-rose-800 transition-colors cursor-pointer"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
