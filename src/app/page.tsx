'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { EmailComposer } from '@/components/EmailComposer';
import { EmailHistory, EmailRecord } from '@/components/EmailHistory';
import { EmailTemplate } from '@/components/EmailTemplate';

export default function Home() {
  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [previewData, setPreviewData] = useState({
    subject: '',
    body: ''
  });

  // Load emails from localStorage on component mount
  useEffect(() => {
    const savedEmails = localStorage.getItem('email-history');
    if (savedEmails) {
      try {
        const parsedEmails = JSON.parse(savedEmails).map((email: any) => ({
          ...email,
          timestamp: new Date(email.timestamp)
        }));
        setEmails(parsedEmails);
      } catch (error) {
        console.error('Error loading email history:', error);
      }
    }
  }, []);

  // Save emails to localStorage whenever emails state changes
  useEffect(() => {
    localStorage.setItem('email-history', JSON.stringify(emails));
  }, [emails]);

  const handleSendEmail = useCallback(async (data: { recipients: string[]; subject: string; body: string }) => {
    setIsSending(true);
    console.log('🚀 Starting email send process...', { data });
    
    try {
      console.log('📤 Sending request to API...');
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('📥 Received response:', { 
        status: response.status, 
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      // Check if response is ok and is JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ HTTP Error Response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Non-JSON response:', text);
        throw new Error('Server returned non-JSON response. Please check your API configuration.');
      }

      const result = await response.json();
      console.log('✅ API Response:', result);

      // Create email record
      const emailRecord: EmailRecord = {
        id: Date.now().toString(),
        subject: data.subject,
        recipients: data.recipients,
        timestamp: new Date(),
        status: result.success ? 'success' : 'failed',
        error: result.error,
      };

      // Add to history
      setEmails(prev => [emailRecord, ...prev]);

      // Show success/error message
      if (result.success) {
        console.log('🎉 Email sent successfully!', { messageId: result.messageId });
        alert('Email sent successfully!');
      } else {
        console.error('❌ Email send failed:', result.error);
        alert(`Failed to send email: ${result.error}`);
      }
    } catch (error) {
      console.error('💥 Error sending email:', error);
      
      // Create failed email record
      const emailRecord: EmailRecord = {
        id: Date.now().toString(),
        subject: data.subject,
        recipients: data.recipients,
        timestamp: new Date(),
        status: 'failed',
        error: error instanceof Error ? error.message : 'Network error or server unavailable',
      };

      setEmails(prev => [emailRecord, ...prev]);
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to send email: ${errorMessage}`);
    } finally {
      console.log('🏁 Email send process completed');
      setIsSending(false);
    }
  }, []);

  const handlePreviewUpdate = useCallback((subject: string, body: string) => {
    setPreviewData({ subject, body });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">SolvSpot Email Campaign</h1>
              <p className="text-gray-400 mt-1">Send beautiful cold emails to potential clients</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Powered by Resend</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Email Composer */}
          <div className="space-y-6">
            <EmailComposer onSend={handleSendEmail} isSending={isSending} onPreviewUpdate={handlePreviewUpdate} />
            
            {/* Email Preview */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Email Preview</h2>
              <div className="transform scale-75 origin-top-left w-[133.33%] h-[133.33%]">
                <EmailTemplate 
                  subject={previewData.subject} 
                  body={previewData.body} 
                  isPreview={true} 
                />
              </div>
            </div>
          </div>

          {/* Right Column - Email History */}
          <div>
            <EmailHistory emails={emails} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-400 text-sm">
            <p>SolvSpot - We Don't Just Build Software, We Solve Stories</p>
            <p className="mt-1">Built with Next.js, Tailwind CSS, and Resend API</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
