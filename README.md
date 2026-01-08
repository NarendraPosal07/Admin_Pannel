🛠️ Admin Panel with Authentication & Blog Management
A full-featured Admin Panel built with secure authentication, email-based OTP verification, blog management, image uploads, and interactive charts for a clean and modern UI.
This project is suitable for real-world admin dashboards, learning full-stack development, and portfolio showcase.

🚀 Features -----------
🔐 Authentication System
User Registration
Login & Logout
Forgot Password
OTP-based Email Verification
Secure Password Handling
Token-based Authentication

📝 Blog Management-----------
Create Blog Posts
Edit Blog Posts
Delete Blog Posts
Upload Blog Images
Store and Manage Blog Data from Admin Panel

📊 Admin Dashboard------------
Interactive Charts for UI Analytics
Clean and Responsive Admin Interface
Easy Navigation and User-Friendly Layout

Frontend-----------
HTML / CSS / JavaScript
Bootstrap (for responsive UI)
Chart Library (Charts.js or similar)

Backend----------
Node.js
Express.js
Database
MongoDB (with Mongoose)
Authentication & Utilities
Coockies / Sessions
bcrypt (Password Hashing)
Nodemailer (Email & OTP)
Multer (Image Upload)

Project Structure -------------
├── controllers
├── routes
├── models
├── middleware
├── views
├── public
│   ├── css
│   ├── js
│   └── uploads
├── config
├── .env
├── app.js

.ejs-----------
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

🧪 Testing the Application-----
Register a new user
Verify OTP received on email
Login using credentials
Access Admin Dashboard
Create / Edit / Delete Blogs
Upload images for blogs
View charts in dashboard
Logout securely

🔒 Security Highlights-----
Passwords are hashed
OTP expires after limited time
Protected routes using middleware
Secure image upload handling

📸 Screenshots
Main Page --- <img width="1902" height="925" alt="image" src="https://github.com/user-attachments/assets/790cdae8-d42f-460a-89ba-62a537e43c89" />
Blog Upload --- <img width="1529" height="897" alt="image" src="https://github.com/user-attachments/assets/a897ce72-35a6-49e0-953a-36af12253167" />
View Blogs --- <img width="1855" height="818" alt="image" src="https://github.com/user-attachments/assets/bcc71b5b-4cac-45bb-80cb-2fcef8566cbe" /> -> You can update or delet the blog. <-
Update Blogs --- <img width="794" height="759" alt="image" src="https://github.com/user-attachments/assets/545d796d-624c-4146-8889-e017d04fd51e" /> -> in update, if you dont update any IMG, you get error. <-

