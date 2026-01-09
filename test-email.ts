// test-email.ts
// Run this to test your email configuration
// Usage: tsx test-email.ts

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function testEmail() {
  console.log('🧪 Testing email configuration...\n');

  // Check if environment variables are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Missing EMAIL_USER or EMAIL_PASS in .env file');
    console.log('\nPlease add these to your .env file:');
    console.log('EMAIL_USER=your-email@gmail.com');
    console.log('EMAIL_PASS=your-app-password');
    return;
  }

  console.log('📧 Email User:', process.env.EMAIL_USER);
  console.log('🔑 Password:', process.env.EMAIL_PASS ? '✓ Set' : '✗ Not set');
  console.log('📮 Notify Email:', process.env.NOTIFY_EMAIL);
  console.log('');

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Verify connection
    console.log('🔌 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');

    // Send test email
    console.log('📤 Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      subject: '✅ Email Configuration Test - Success!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #4CAF50; border-radius: 10px;">
          <h2 style="color: #4CAF50;">✅ Email Test Successful!</h2>
          <p>Your email configuration is working correctly.</p>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Configuration Details:</h3>
            <p><strong>SMTP Host:</strong> ${process.env.EMAIL_HOST || 'smtp.gmail.com'}</p>
            <p><strong>SMTP Port:</strong> ${process.env.EMAIL_PORT || '587'}</p>
            <p><strong>From Email:</strong> ${process.env.EMAIL_USER}</p>
            <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            You should now receive email notifications when customers submit quote requests.
          </p>
        </div>
      `,
      text: `
Email Test Successful!

Your email configuration is working correctly.

Configuration:
- SMTP Host: ${process.env.EMAIL_HOST || 'smtp.gmail.com'}
- SMTP Port: ${process.env.EMAIL_PORT || '587'}
- From: ${process.env.EMAIL_USER}
- Test Time: ${new Date().toLocaleString()}

You should now receive email notifications when customers submit quote requests.
      `,
    });

    console.log('✅ Test email sent successfully!');
    console.log('📬 Message ID:', info.messageId);
    console.log('\n✨ Check your inbox at:', process.env.NOTIFY_EMAIL);
    console.log('\n🎉 Your email setup is complete and working!\n');

  } catch (error: any) {
    console.error('\n❌ Email test failed!');
    console.error('\nError details:', error.message);
    
    if (error.message.includes('Invalid login')) {
      console.log('\n💡 Common fixes:');
      console.log('1. Make sure you\'re using an App Password, not your regular Gmail password');
      console.log('2. Enable 2-Factor Authentication on your Google account');
      console.log('3. Generate App Password: https://myaccount.google.com/apppasswords');
      console.log('4. Copy the 16-character password (remove spaces)');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Connection refused. Check:');
      console.log('1. EMAIL_HOST is correct (smtp.gmail.com for Gmail)');
      console.log('2. EMAIL_PORT is correct (587 for most providers)');
      console.log('3. Your firewall isn\'t blocking the connection');
    }
  }
}

// Run the test
testEmail().catch(console.error);