# 🏡 Real Estate Listing Web Application

A full-stack **Real Estate Listing Platform** where users can create accounts, post properties for sale or rent, upload images, manage listings, and directly contact property owners — all built using **MongoDB**, **Express**, **React**, **Redux**, **Multer**, and **Cloudinary**.

---

## 🔗 Live Demo

🚀 [Visit Live Site](https://real-estate-30cd.onrender.com/)

---

## ✨ Features Overview

| Feature                             | Description                                                  |
|-------------------------------------|--------------------------------------------------------------|
| 🔐 User Authentication              | Secure signup/login using JWT                                |
| 🏠 Property Listings                | Create, edit, and delete your property ads                   |
| 📷 Image Uploads                    | Upload multiple images via Multer + Cloudinary               |
| 🔍 Search & Filter                  | Find properties by keyword, type (rent/sale), and price      |
| 📧 Contact Owner                    | Contact listing owners directly via form                     |
| 🔑 Change Password                  | Update password securely via old password validation         |
| 🧠 State Management                 | Global state using Redux Toolkit                             |
| ⚙️ Protected Routes                 | Restrict create/edit/delete actions to logged-in users       |
| 📱 Responsive Design                | Mobile-first design with Tailwind CSS                        |

---

## 🔥 Elaborated Features

### 🔐 User Authentication
- Users can sign up and log in using email and password.
- Passwords are securely hashed using **bcrypt** before storing in MongoDB.
- Auth tokens are issued using **JWT** and validated for protected routes.
- Frontend stores auth info in Redux and/or localStorage for session persistence.

---

### 🏠 Create, Edit & Delete Property Listings
- Logged-in users can:
  - **Create** listings with details like title, description, address, price, category (rent/sale), and features.
  - **Edit** existing listings that they own.
  - **Delete** their own listings with one click.
- Listings are stored in **MongoDB**, with a reference to the owner's ID.

---

### 📷 Image Uploads using Multer & Cloudinary
- Users can upload **one or multiple images** when creating or editing listings.
- Backend uses **Multer** to accept image uploads in Express.
- Images are uploaded to **Cloudinary**, a cloud image hosting service.
- Image URLs returned by Cloudinary are saved in MongoDB and displayed on the frontend.

---

### 🔍 Search & Filter Listings
- Search by **title, address, or keyword**.
- Filter by:
  - Listing Type: Rent / Sale
  - Price Range
  - Features: Furnished, Parking, etc.
- Listings dynamically update based on filters without page reload.

---

### 📧 Contact the Owner of a Listing
- Each property listing has a **contact form** visible to other users.
- Users can **send a message directly to the listing owner's email** (or inbox depending on setup).
- Helps enable real interactions between buyers and sellers/renters.
- Built-in form validation for cleaner user experience.

---

### 🔑 Change Password Feature
- Authenticated users can securely **change their password**.
- Must provide current password for verification before updating to a new one.
- On success, the updated password is re-hashed and stored securely.
- Toast notifications provide feedback on success or failure.

---

### 🧠 Redux State Management
- Uses **Redux Toolkit** for handling:
  - Authentication state
  - User profile
  - Property listings
  - Loading and error states
- Centralized state makes app scalable and easier to debug.

---

### ⚙️ Protected Routes & Authorization
- Certain routes (e.g., `/create-listing`, `/edit/:id`, `/my-listings`) are **protected** and only accessible to logged-in users.
- Backend verifies **JWT tokens** before allowing sensitive actions.
- Users cannot edit or delete listings that they don’t own.

---

### 📱 Responsive UI with Tailwind CSS
- Clean and modern UI built with **Tailwind CSS** utility classes.
- Fully mobile-responsive layout with adaptive components.
- Works well on all screen sizes — mobile, tablet, desktop.

---


## 💻 Tech Stack Used


### 🧠 Frontend
- React.js – Core UI library
- Redux Toolkit – Global state management
- Tailwind CSS – Utility-first CSS framework

---

### 🖥️ Backend
- Node.js – Server runtime
- Express.js – Web framework for APIs
- Multer – Middleware for handling file uploads
- Cloudinary SDK – Cloud image hosting & optimization
- bcrypt.js – Password hashing
- jsonwebtoken (JWT) – Auth token creation and verification

---


### 🗄️ Database
- MongoDB 

---
