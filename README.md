# Bulk Email Sending Application with Express.js and Nodemailer

This project is a Node.js application built with Express.js for sending personalized emails to multiple recipients using Gmail's SMTP server. The app provides a simple web interface for inputting email credentials, recipient information, and the email content.

## Key Features
- **Email Sending**: Uses Nodemailer to send emails via Gmail's SMTP server.
- **Bulk Email Functionality**: Send personalized or generic emails to a list of recipients.
- **Dynamic Email Content**: Customize email body for each recipient by replacing a placeholder (`[NAME]`) with their name.
- **Middleware Functions**: Handles form submission with Express middleware functions to extract and process data from the request.
- **Simple Web Interface**: Serves static HTML files that allow the user to input email credentials and recipient details.

## Technologies Used
- **Node.js**: Backend framework for handling server-side logic.
- **Express.js**: Web framework for creating the server and routing.
- **Nodemailer**: Node.js library for sending emails.
- **Body-Parser**: Middleware for parsing incoming form data.
- **HTML**: Frontend form to gather email data from the user.

## How It Works
1. The server renders a form for the user to input their email credentials and recipient details.
2. The user provides a list of recipient emails, names, email subject, and body content.
3. The email body can be personalized by replacing `[NAME]` in the body text with each recipient's name.
4. The server sends emails using Nodemailer and displays a message once all emails are sent.

## Setup and Installation
1. Clone this repository.
2. Run `npm install` to install the required dependencies.
3. Create the necessary `index.html`, `mails.html`, and `sending.html` files inside a `public` directory.
4. Start the server using `node app.js` or `npm start`.
5. Visit `http://localhost:3000` to access the web interface.
