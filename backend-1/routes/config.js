require('dotenv').config();  // Load environment variables from .env file


// Now you can access your environment variables using process.env
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const adminEmail = process.env.ADMIN_EMAIL;
const JWT_SECRET = 'abc3477@!23'

console.log(emailUser, emailPass, adminEmail); // Check if the values are being loaded correctly

