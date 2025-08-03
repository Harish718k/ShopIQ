# 🛒 ShopIQ — MERN E-commerce Platform

ShopIQ is a modern e-commerce platform built using the **MERN Stack**. It supports full shopping features including user authentication, product management, cart system, payment gateway using **Stripe**, and forgot password emails via **Mailtrap**.

---

## 🚀 Tech Stack

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT, Cookies
- **Payment**: Stripe
- **Email Service**: Mailtrap
- **File Uploads**: Multer
- **Admin Dashboard**: Protected routes and impersonation control

---

## Instructions

after cloning, run this command in the root folder
```bash
npm install
```
navigate to "frontend" folder, run these commands 
```bash
npm install
```
after that open the backend/config/config.env
and update the MongoDB connection string

navigate back to "root" folder and run this command for loading demo data
```bash
npm run seed:admin
npm run seed:products
```

run this below command to run on root and frontend
```bash
npm run dev
```


## Test
open the http://localhost:8000 and test the 

## Screen Record
watch this record if you face an problem.

> 📺 [Click here to view the demo](https://drive.google.com/file/d/1ziFI3gja7NMggFq1xweVkuq0oyyTqnFR/view?usp=drivesdk)
