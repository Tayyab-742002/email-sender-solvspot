'use client';

import React from 'react';

export interface EmailRecord {
  id: string;
  subject: string;
  recipients: string[];
  timestamp: Date;
  status: 'success' | 'failed';
  error?: string;
}

interface EmailHistoryProps {
  emails: EmailRecord[];
}

export const EmailHistory: React.FC<EmailHistoryProps> = ({ emails }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const truncateRecipients = (recipients: string[], maxLength: number = 3) => {
    if (recipients.length <= maxLength) {
      return recipients.join(', ');
    }
    return `${recipients.slice(0, maxLength).join(', ')} +${recipients.length - maxLength} more`;
  };

  if (emails.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Email History</h2>
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-gray-400">No emails sent yet</p>
          <p className="text-gray-500 text-sm mt-1">Your email history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Email History</h2>
      
      <div className="space-y-3">
        {emails.map((email) => (
          <div
            key={email.id}
            className="bg-gray-800 border border-gray-600 rounded-lg p-4 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-white font-medium truncate">{email.subject}</h3>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      email.status === 'success'
                        ? 'bg-green-900 text-green-300'
                        : 'bg-red-900 text-red-300'
                    }`}
                  >
                    {email.status === 'success' ? (
                      <>
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Sent
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Failed
                      </>
                    )}
                  </span>
                </div>
                
                <div className="text-sm text-gray-400 mb-1">
                  <span className="font-medium">To:</span> {truncateRecipients(email.recipients)}
                </div>
                
                <div className="text-sm text-gray-500">
                  {formatDate(email.timestamp)}
                </div>
                
                {email.error && (
                  <div className="mt-2 text-sm text-red-400 bg-red-900/20 border border-red-800 rounded px-2 py-1">
                    <span className="font-medium">Error:</span> {email.error}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
