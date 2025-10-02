import React from 'react';

interface EmailTemplateProps {
  subject: string;
  body: string;
  isPreview?: boolean;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ 
  subject, 
  body, 
  isPreview = false 
}) => {
  return (
    <div className={`${isPreview ? 'border border-gray-600 rounded-lg overflow-hidden' : ''}`}>
      <div className="bg-white text-gray-900 max-w-4xl mx-auto">
        {/* Email Header with SolvSpot Branding */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
          <div className="text-center">
            {/* <h1 className="text-white text-3xl font-bold mb-2">SolvSpot</h1> */}
            <img src="https://www.solvspot.com/logo.png" alt="SolvSpot Logo" className="w-full" />
            <p className="text-purple-100 text-lg">We Don't Just Build Software, We Solve Stories</p>
          </div>
        </div>
        
        {/* Hero Section */}
        <div className="bg-gray-50 px-8 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {subject || 'Transform Your Digital Presence with SolvSpot'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-purple-700 rounded mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              At SolvSpot, we specialize in crafting tailor-made websites and applications that drive growth and streamline your operations. Our expertise turns your digital challenges into seamless solutions.
            </p>
          </div>
          
          {/* Hero Image */}
          <div className="text-center mb-8">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=center" 
              alt="Digital Solutions" 
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        {/* Email Body */}
        <div className="px-8 py-8">
          <div className="prose prose-gray max-w-none mb-8">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
              {body || `Dear [Client Name],

I hope this email finds you well. I'm reaching out from SolvSpot, a leading software development agency that specializes in transforming businesses through innovative digital solutions.

We've been following your company's growth and are impressed by your vision. We believe we can help accelerate your digital transformation with our comprehensive suite of services.

Here's how SolvSpot can help your business thrive:`}
            </div>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { name: 'Website Development', icon: '🌐', desc: 'Custom websites that convert' },
              { name: 'Mobile App Development', icon: '📱', desc: 'Native & cross-platform apps' },
              { name: 'AI Integration', icon: '🤖', desc: 'Smart automation solutions' },
              { name: 'AI Development', icon: '🧠', desc: 'Custom AI models & systems' },
              { name: 'MVP Development', icon: '🚀', desc: 'Fast-track your ideas' },
              { name: 'Chatbot Development', icon: '💬', desc: 'Intelligent customer support' },
              { name: 'SaaS Development', icon: '☁️', desc: 'Scalable cloud solutions' },
              { name: 'CRM Integration', icon: '📊', desc: 'Streamline your workflow' }
            ].map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{service.icon}</div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{service.name}</h3>
                <p className="text-xs text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Why Choose Us Section */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Why Choose SolvSpot?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-semibold text-gray-800 mb-2">Fast Delivery</h4>
                <p className="text-sm text-gray-600">Quick turnaround without compromising quality</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-800 mb-2">Tailored Solutions</h4>
                <p className="text-sm text-gray-600">Custom-built for your specific needs</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🤝</div>
                <h4 className="font-semibold text-gray-800 mb-2">Ongoing Support</h4>
                <p className="text-sm text-gray-600">24/7 support and maintenance</p>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Ready to Transform Your Business?</h3>
              <p className="mb-4">Let's discuss how we can help you achieve your digital goals</p>
              <a href="mailto:contact@solvspot.com" className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started Today
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="bg-gray-900 text-white px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="mr-2">🌐</span>
                  <a href="https://www.solvspot.com" className="hover:text-purple-300">www.solvspot.com</a>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📞</span>
                  <span>+92 344 5363899</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">✉️</span>
                  <a href="mailto:contact@solvspot.com" className="hover:text-purple-300">contact@solvspot.com</a>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">✉️</span>
                  <a href="mailto:solvspot@gmail.com" className="hover:text-purple-300">solvspot@gmail.com</a>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Location</h4>
              <div className="flex items-start">
                <span className="mr-2 mt-1">📍</span>
                <span className="text-sm">
                  Shop 1, Fifth Plaza, Road E, Block C,<br />
                  Naval Anchorage, Islamabad
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">
              Best regards,<br />
              <span className="font-semibold text-white">The SolvSpot Team</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// HTML version for actual email sending
export const getEmailHTML = (subject: string, body: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          background-color: #f8f9fa;
        }
        .email-container {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #c147e9 0%, #9333ea 100%);
          padding: 32px 24px;
          text-align: center;
        }
        .header h1 {
          color: white;
          margin: 0 0 8px 0;
          font-size: 32px;
          font-weight: bold;
        }
        .header p {
          color: #e9d5ff;
          margin: 0;
          font-size: 18px;
        }
        .hero {
          background-color: #f9fafb;
          padding: 32px 24px;
          text-align: center;
        }
        .hero h2 {
          font-size: 28px;
          font-weight: bold;
          color: #1f2937;
          margin: 0 0 16px 0;
        }
        .divider {
          width: 96px;
          height: 4px;
          background: linear-gradient(135deg, #c147e9 0%, #9333ea 100%);
          border-radius: 2px;
          margin: 0 auto 24px auto;
        }
        .hero-description {
          font-size: 18px;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto 32px auto;
        }
        .hero-image {
          max-width: 600px;
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .content {
          padding: 32px 24px;
        }
        .body {
          color: #374151;
          line-height: 1.7;
          white-space: pre-wrap;
          font-size: 16px;
          margin-bottom: 32px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }
        .service-card {
          background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          transition: box-shadow 0.2s;
        }
        .service-icon {
          font-size: 24px;
          margin-bottom: 8px;
        }
        .service-name {
          font-weight: 600;
          color: #1f2937;
          font-size: 14px;
          margin-bottom: 4px;
        }
        .service-desc {
          font-size: 12px;
          color: #6b7280;
        }
        .why-choose {
          background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 32px;
        }
        .why-choose h3 {
          font-size: 20px;
          font-weight: bold;
          color: #1f2937;
          text-align: center;
          margin: 0 0 24px 0;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
        }
        .feature {
          text-align: center;
        }
        .feature-icon {
          font-size: 32px;
          margin-bottom: 8px;
        }
        .feature-title {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }
        .feature-desc {
          font-size: 14px;
          color: #6b7280;
        }
        .cta {
          background: linear-gradient(135deg, #c147e9 0%, #9333ea 100%);
          color: white;
          padding: 32px 24px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 32px;
        }
        .cta h3 {
          font-size: 20px;
          font-weight: bold;
          margin: 0 0 8px 0;
        }
        .cta p {
          margin: 0 0 16px 0;
          opacity: 0.9;
        }
        .cta-button {
          display: inline-block;
          background-color: white;
          color: #c147e9;
          padding: 12px 24px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .contact {
          background-color: #1f2937;
          color: white;
          padding: 32px 24px;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }
        .contact h4 {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 16px 0;
        }
        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          font-size: 14px;
        }
        .contact-icon {
          margin-right: 8px;
        }
        .contact a {
          color: #d1d5db;
          text-decoration: none;
        }
        .contact a:hover {
          color: #c147e9;
        }
        .signature {
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid #374151;
          font-size: 14px;
          color: #9ca3af;
        }
        .signature strong {
          color: white;
        }
        @media (max-width: 600px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .features-grid {
            grid-template-columns: 1fr;
          }
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header with SolvSpot Branding -->
        <div class="header">
          <h1>SolvSpot</h1>
          <p>We Don't Just Build Software, We Solve Stories</p>
        </div>
        
        <!-- Hero Section -->
        <div class="hero">
          <h2>${subject || 'Transform Your Digital Presence with SolvSpot'}</h2>
          <div class="divider"></div>
          <p class="hero-description">
            At SolvSpot, we specialize in crafting tailor-made websites and applications that drive growth and streamline your operations. Our expertise turns your digital challenges into seamless solutions.
          </p>
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=center" alt="Digital Solutions" class="hero-image" />
        </div>
        
        <!-- Content -->
        <div class="content">
          <div class="body">${body || `Dear [Client Name],

I hope this email finds you well. I'm reaching out from SolvSpot, a leading software development agency that specializes in transforming businesses through innovative digital solutions.

We've been following your company's growth and are impressed by your vision. We believe we can help accelerate your digital transformation with our comprehensive suite of services.

Here's how SolvSpot can help your business thrive:`}</div>
          
          <!-- Services Grid -->
          <div class="services-grid">
            <div class="service-card">
              <div class="service-icon">🌐</div>
              <div class="service-name">Website Development</div>
              <div class="service-desc">Custom websites that convert</div>
            </div>
            <div class="service-card">
              <div class="service-icon">📱</div>
              <div class="service-name">Mobile App Development</div>
              <div class="service-desc">Native & cross-platform apps</div>
            </div>
            <div class="service-card">
              <div class="service-icon">🤖</div>
              <div class="service-name">AI Integration</div>
              <div class="service-desc">Smart automation solutions</div>
            </div>
            <div class="service-card">
              <div class="service-icon">🧠</div>
              <div class="service-name">AI Development</div>
              <div class="service-desc">Custom AI models & systems</div>
            </div>
            <div class="service-card">
              <div class="service-icon">🚀</div>
              <div class="service-name">MVP Development</div>
              <div class="service-desc">Fast-track your ideas</div>
            </div>
            <div class="service-card">
              <div class="service-icon">💬</div>
              <div class="service-name">Chatbot Development</div>
              <div class="service-desc">Intelligent customer support</div>
            </div>
            <div class="service-card">
              <div class="service-icon">☁️</div>
              <div class="service-name">SaaS Development</div>
              <div class="service-desc">Scalable cloud solutions</div>
            </div>
            <div class="service-card">
              <div class="service-icon">📊</div>
              <div class="service-name">CRM Integration</div>
              <div class="service-desc">Streamline your workflow</div>
            </div>
          </div>
          
          <!-- Why Choose Us -->
          <div class="why-choose">
            <h3>Why Choose SolvSpot?</h3>
            <div class="features-grid">
              <div class="feature">
                <div class="feature-icon">⚡</div>
                <div class="feature-title">Fast Delivery</div>
                <div class="feature-desc">Quick turnaround without compromising quality</div>
              </div>
              <div class="feature">
                <div class="feature-icon">🎯</div>
                <div class="feature-title">Tailored Solutions</div>
                <div class="feature-desc">Custom-built for your specific needs</div>
              </div>
              <div class="feature">
                <div class="feature-icon">🤝</div>
                <div class="feature-title">Ongoing Support</div>
                <div class="feature-desc">24/7 support and maintenance</div>
              </div>
            </div>
          </div>
          
          <!-- Call to Action -->
          <div class="cta">
            <h3>Ready to Transform Your Business?</h3>
            <p>Let's discuss how we can help you achieve your digital goals</p>
            <a href="mailto:contact@solvspot.com" class="cta-button">Get Started Today</a>
          </div>
        </div>
        
        <!-- Contact Information -->
        <div class="contact">
          <div class="contact-grid">
            <div>
              <h4>Get in Touch</h4>
              <div class="contact-item">
                <span class="contact-icon">🌐</span>
                <a href="https://www.solvspot.com">www.solvspot.com</a>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <span>+92 344 5363899</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">✉️</span>
                <a href="mailto:contact@solvspot.com">contact@solvspot.com</a>
              </div>
              <div class="contact-item">
                <span class="contact-icon">✉️</span>
                <a href="mailto:solvspot@gmail.com">solvspot@gmail.com</a>
              </div>
            </div>
            <div>
              <h4>Our Location</h4>
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span>Shop 1, Fifth Plaza, Road E, Block C,<br />Naval Anchorage, Islamabad</span>
              </div>
            </div>
          </div>
          
          <div class="signature">
            Best regards,<br />
            <strong>The SolvSpot Team</strong>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};
