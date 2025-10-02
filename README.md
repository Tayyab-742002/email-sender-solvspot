# SolvSpot Email Campaign Platform

A professional cold email platform built for SolvSpot agency. Send beautiful, engaging emails to potential clients with our comprehensive suite of services showcased in a stunning template.

## Features

- ✉️ **Professional Email Composition**: Clean form with subject, body, and recipients fields
- 👀 **Live Preview**: Real-time preview of your SolvSpot branded email template
- 📧 **Multiple Recipients**: Send to multiple potential clients at once
- 📊 **Email History**: Track all sent cold emails with status and timestamps
- 🎨 **SolvSpot Branding**: Beautiful design with your agency's purple theme (#c147e9)
- 🚀 **Service Showcase**: Highlight all 8 SolvSpot services with engaging visuals
- 📱 **Responsive Design**: Perfect display on all devices
- ⚡ **Fast & Reliable**: Powered by Resend API for reliable email delivery

## Tech Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS v4
- **Email Service**: Resend API
- **Validation**: Zod
- **Storage**: LocalStorage (for email history)

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Resend account and API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd email-sender
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Resend credentials:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   FROM_EMAIL=your_verified_email@yourdomain.com
   ```

4. **Get your Resend API key**
   - Sign up at [resend.com](https://resend.com)
   - Go to API Keys section
   - Create a new API key
   - Add your sending domain and verify it

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Compose Email**: Fill in the recipients, subject, and message body
2. **Preview**: See a live preview of your email in the styled template
3. **Send**: Click "Send Email" to deliver to all recipients
4. **Track**: View your email history with delivery status

## Project Structure

```
src/
├── app/
│   ├── api/send-email/     # API route for sending emails
│   ├── globals.css         # Global styles with custom theme
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main application page
├── components/
│   ├── EmailComposer.tsx   # Email composition form
│   ├── EmailHistory.tsx    # Email history display
│   └── EmailTemplate.tsx   # Styled email template
└── lib/
    └── resend.ts           # Resend API integration
```

## Customization

### Colors
The app uses a custom color scheme defined in `src/app/globals.css`:
- **Primary**: `#c147e9` (Purple)
- **Background**: `#0F0E0E` (Dark)

### Email Template
Modify the email template in `src/components/EmailTemplate.tsx` to customize the email design.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY`
   - `FROM_EMAIL`
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## API Reference

### Send Email Endpoint

**POST** `/api/send-email`

**Request Body:**
```json
{
  "recipients": ["email1@example.com", "email2@example.com"],
  "subject": "Your Email Subject",
  "body": "Your email content here..."
}
```

**Response:**
```json
{
  "success": true,
  "messageId": "resend_message_id",
  "message": "Email sent successfully"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Check the [Resend documentation](https://resend.com/docs)
- Open an issue in this repository
- Contact the development team

---

Built with ❤️ using Next.js and Resend