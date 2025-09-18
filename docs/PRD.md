Product Requirements Document (PRD)
===================================

1\. Overview
------------

The goal is to create a **simple email-sending platform** that allows users to send emails to multiple recipients, preview them within a styled template, and keep a history of sent emails.

The platform will be a **single-page web app built with Next.js**. It will use **Resend** as the email delivery service and offer a user-friendly interface to craft, send, and track emails.

2\. Objectives
--------------

*   Provide a **minimalistic, single-page UI**.
    
*   Enable sending emails to **multiple recipients** using **Resend API**.
    
*   Offer a **pre-styled HTML/CSS email template** where users can only edit the **subject** and **body**.
    
*   Maintain an **email history log** with subject, recipients, timestamp, and status.
    

3\. Features
------------

### 3.1 Email Composition

*   **Subject Input Field** – Plain text input for email subject.
    
*   **Body Input Area** – Textarea or rich-text editor for email body.
    
*   **Recipients Field** – Comma-separated list of email addresses.
    
*   **Email Template** – Static React component with HTML/CSS styling. The user’s input (subject + body) is injected into predefined sections.
    

### 3.2 Email Sending

*   Integrate with **Resend API** for sending emails.
    
*   Handle **bulk recipients**.
    
*   Provide **success/failure feedback** after sending.
    

### 3.3 Email History

*   Display a list of previously sent emails with:
    
    *   Subject
        
    *   Recipients (truncated if too many)
        
    *   Date/Time sent
        
    *   Status (Success/Failed)
        
*   History stored in a lightweight local DB (e.g., SQLite via Prisma, or even JSON storage for MVP).
    

### 3.4 UI/UX

*   Clean, minimal UI with a **single-page layout**.
    
*   Responsive design.
    
*   Template styling in **HTML + CSS inside React component** (no external editing by user).
    

4\. Tech Stack
--------------

*   **Frontend**: Next.js (React framework)
    
*   **Styling**: CSS Modules / Tailwind CSS (for UI)
    
*   **Email Service**: Resend API
    
*   **Database**: SQLite (via Prisma ORM) or local JSON (for MVP history storage)
    
*   **Deployment**: Vercel (ideal for Next.js)
    

5\. User Flow
-------------

1.  User lands on the main page.
    
2.  Inputs **recipients**, **subject**, and **body**.
    
3.  Sees a **live preview** of the email inside the styled HTML template.
    
4.  Clicks **Send Email**.
    
5.  Resend API sends the email to all recipients.
    
6.  The result (success/failure) is logged into **Email History**.
    
7.  User can view history in the same page.
    

6\. Non-Functional Requirements
-------------------------------

*   **Security**: Basic validation for emails.
    
*   **Scalability**: Supports multiple recipients efficiently.
    
*   **Usability**: Simple and intuitive UI.
    
*   **Performance**: Email send should be near-instant via Resend API.
    

7\. Future Enhancements (Optional, Not in MVP)
----------------------------------------------

*   Add **authentication** (to restrict access).
    
*   Add **attachments support**.
    
*   Rich-text editor for the body.
    
*   Categorized history (filter by date/recipient).
    
*   Export history as CSV.