import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or "outlook", "yahoo", etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Alternative SMTP configuration for other providers:
  // host: "smtp.gmail.com",
  // port: 587,
  // secure: false,
});

export const sendVerificationEmail = async (email, verificationToken) => {
  const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/verify-email?token=${verificationToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify Your Email - Chaty",
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3B82F6; margin: 0;">Chaty</h1>
          <p style="color: #6B7280; margin: 5px 0;">Realtime Chat Application</p>
        </div>
        
        <div style="background: #F9FAFB; padding: 30px; border-radius: 10px; text-align: center;">
          <h2 style="color: #1F2937; margin-bottom: 20px;">Verify Your Email Address</h2>
          <p style="color: #4B5563; margin-bottom: 30px; line-height: 1.6;">
            Thank you for signing up for Chaty! Please click the button below to verify your email address and complete your registration.
          </p>
          
          <div style="margin: 30px 0;">
            <p style="color: #1F2937; font-size: 24px; font-weight: bold; background: #E5E7EB; padding: 15px; border-radius: 8px; letter-spacing: 3px;">
              ${verificationToken}
            </p>
          </div>
          
          <a href="${verificationUrl}" 
             style="display: inline-block; background: #3B82F6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">
            Verify Email Address
          </a>
          
          <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
            Or copy and paste this link in your browser:<br>
            <a href="${verificationUrl}" style="color: #3B82F6; word-break: break-all;">${verificationUrl}</a>
          </p>
          
          <p style="color: #9CA3AF; font-size: 12px; margin-top: 30px;">
            This verification link will expire in 24 hours. If you didn't create an account with Chaty, please ignore this email.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

export const sendWelcomeEmail = async (email, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Welcome to Chaty! 🎉",
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3B82F6; margin: 0;">Chaty</h1>
          <p style="color: #6B7280; margin: 5px 0;">Realtime Chat Application</p>
        </div>
        
        <div style="background: #F0F9FF; padding: 30px; border-radius: 10px; text-align: center;">
          <h2 style="color: #1F2937; margin-bottom: 20px;">Welcome to Chaty, ${fullName}! 🎉</h2>
          <p style="color: #4B5563; margin-bottom: 20px; line-height: 1.6;">
            Your email has been successfully verified! You can now enjoy all the features of Chaty:
          </p>
          
          <div style="text-align: left; margin: 20px 0; background: white; padding: 20px; border-radius: 8px;">
            <ul style="color: #4B5563; line-height: 1.8;">
              <li>💬 Real-time messaging with friends</li>
              <li>📸 Share images and media</li>
              <li>🟢 See who's online</li>
              <li>🎨 Beautiful, modern interface</li>
            </ul>
          </div>
          
          <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}" 
             style="display: inline-block; background: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">
            Start Chatting Now
          </a>
          
          <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
            Thank you for joining our community! If you have any questions, feel free to reach out.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
