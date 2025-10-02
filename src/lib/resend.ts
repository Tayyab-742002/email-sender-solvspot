import { Resend } from 'resend';
import { getEmailHTML } from '@/components/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-testing');

export interface SendEmailData {
  recipients: string[];
  subject: string;
  body: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export const sendEmail = async (data: SendEmailData): Promise<SendEmailResult> => {
  console.log('📧 Resend: Starting email send process...');
  
  try {
    console.log('🔑 Resend: Checking environment variables...');
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ Resend: RESEND_API_KEY is not configured');
      throw new Error('RESEND_API_KEY is not configured');
    }
    console.log('✅ Resend: RESEND_API_KEY is configured');

    if (!process.env.FROM_EMAIL) {
      console.error('❌ Resend: FROM_EMAIL is not configured');
      throw new Error('FROM_EMAIL is not configured');
    }
    console.log('✅ Resend: FROM_EMAIL is configured:', process.env.FROM_EMAIL);

    const { recipients, subject, body } = data;
    console.log('📋 Resend: Email data:', {
      recipients: recipients.length,
      subject: subject.substring(0, 50) + '...',
      bodyLength: body.length
    });
    
    // Validate recipients
    if (!recipients || recipients.length === 0) {
      console.error('❌ Resend: No recipients provided');
      throw new Error('No recipients provided');
    }

    // Validate email format
    console.log('✅ Resend: Validating email addresses...');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = recipients.filter(email => !emailRegex.test(email));
    
    if (invalidEmails.length > 0) {
      console.error('❌ Resend: Invalid email addresses:', invalidEmails);
      throw new Error(`Invalid email addresses: ${invalidEmails.join(', ')}`);
    }
    console.log('✅ Resend: All email addresses are valid');

    console.log('📧 Resend: Generating email HTML...');
    const emailHTML = getEmailHTML(subject, body);
    console.log('✅ Resend: Email HTML generated, length:', emailHTML.length);

    console.log('📤 Resend: Sending email via Resend API...');
    // Send email using Resend
    const { data: result, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: recipients,
      subject: subject,
      html: emailHTML,
    });

    if (error) {
      console.error('❌ Resend: API error:', error);
      throw new Error(error.message || 'Failed to send email');
    }

    console.log('🎉 Resend: Email sent successfully!', { messageId: result?.id });
    return {
      success: true,
      messageId: result?.id,
    };
  } catch (error) {
    console.error('💥 Resend: Error occurred:', error);
    console.error('💥 Resend: Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};
