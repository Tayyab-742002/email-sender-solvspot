'use client';

import React, { useState } from 'react';

interface EmailComposerProps {
  onSend: (data: { recipients: string[]; subject: string; body: string }) => Promise<void>;
  isSending: boolean;
  onPreviewUpdate?: (subject: string, body: string) => void;
}

export const EmailComposer: React.FC<EmailComposerProps> = ({ onSend, isSending, onPreviewUpdate }) => {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  // Update preview when subject or body changes
  React.useEffect(() => {
    if (onPreviewUpdate) {
      onPreviewUpdate(subject, body);
    }
  }, [subject, body, onPreviewUpdate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📝 EmailComposer: Form submitted');
    
    if (!recipients.trim() || !subject.trim() || !body.trim()) {
      console.log('❌ EmailComposer: Form validation failed - missing fields');
      alert('Please fill in all fields');
      return;
    }

    const recipientList = recipients
      .split(',')
      .map(email => email.trim())
      .filter(email => email.length > 0);

    if (recipientList.length === 0) {
      console.log('❌ EmailComposer: No valid recipients found');
      alert('Please enter at least one recipient');
      return;
    }

    console.log('✅ EmailComposer: Form validation passed', {
      recipients: recipientList,
      subject: subject.trim(),
      bodyLength: body.trim().length
    });

    try {
      console.log('📤 EmailComposer: Calling onSend...');
      await onSend({
        recipients: recipientList,
        subject: subject.trim(),
        body: body.trim()
      });
      
      console.log('✅ EmailComposer: Email sent successfully, clearing form');
      // Clear form after successful send
      setRecipients('');
      setSubject('');
      setBody('');
    } catch (error) {
      console.error('💥 EmailComposer: Error sending email:', error);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Compose Email</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipients Field */}
        <div>
          <label htmlFor="recipients" className="block text-sm font-medium text-gray-300 mb-2">
            Recipients
          </label>
          <input
            type="text"
            id="recipients"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            placeholder="email1@example.com, email2@example.com"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isSending}
          />
          <p className="text-xs text-gray-400 mt-1">Separate multiple emails with commas</p>
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isSending}
          />
        </div>

        {/* Body Field */}
        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-300 mb-2">
            Message
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter your message here..."
            rows={6}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
            disabled={isSending}
          />
        </div>

        {/* Send Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSending || !recipients.trim() || !subject.trim() || !body.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center"
          >
            {isSending ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              'Send Email'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
