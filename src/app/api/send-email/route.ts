import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, SendEmailData } from '@/lib/resend';
import { z } from 'zod';

// Add GET method for testing
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Email API endpoint is working',
    timestamp: new Date().toISOString(),
  }, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

const sendEmailSchema = z.object({
  recipients: z.array(z.string().email()).min(1, 'At least one recipient is required'),
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Body is required'),
});

export async function POST(request: NextRequest) {
  console.log('🚀 API: Email send request received');
  
  try {
    // Ensure we always return JSON
    const headers = {
      'Content-Type': 'application/json',
    };

    console.log('📥 API: Parsing request body...');
    const body = await request.json();
    console.log('📋 API: Request body:', { 
      recipients: body.recipients?.length || 0, 
      subject: body.subject?.substring(0, 50) + '...', 
      bodyLength: body.body?.length || 0 
    });
    
    console.log('✅ API: Validating request data...');
    // Validate request body
    const validatedData = sendEmailSchema.parse(body);
    console.log('✅ API: Validation passed');
    
    console.log('📧 API: Calling sendEmail function...');
    // Send email
    const result = await sendEmail(validatedData as SendEmailData);
    console.log('📧 API: SendEmail result:', result);
    
    if (result.success) {
      console.log('🎉 API: Email sent successfully!');
      return NextResponse.json({
        success: true,
        messageId: result.messageId,
        message: 'Email sent successfully',
      }, { headers });
    } else {
      console.log('❌ API: Email send failed:', result.error);
      return NextResponse.json({
        success: false,
        error: result.error,
      }, { status: 400, headers });
    }
  } catch (error) {
    console.error('💥 API: Error occurred:', error);
    console.error('💥 API: Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Ensure we always return JSON, even for errors
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (error instanceof z.ZodError) {
      console.log('❌ API: Validation error:', error.issues);
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        details: error.issues,
      }, { status: 400, headers });
    }
    
    if (error instanceof SyntaxError) {
      console.log('❌ API: JSON parsing error');
      return NextResponse.json({
        success: false,
        error: 'Invalid JSON in request body',
      }, { status: 400, headers });
    }
    
    console.log('❌ API: Internal server error');
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    }, { status: 500, headers });
  }
}
