#  FLIXO CART

A modern, responsive e-commerce web application built with **Next.js (App Router)**  
This project demonstrates a polished UI, protected pages with authentication, and a simple Express.js backend for product management.

---

## 🌐 Live Demo

  https://filxo-cart.vercel.app/

---

## 🛠 Technologies Used

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Framer Motion  
- **Authentication:** firebase  
- **Backend:** Express.js (Simple API for product management)  
- **Forms & Validation:** react-hook-form, react-hot-toast  
- **Icons:** lucide-react  
- **Deployment:** Vercel  

---

## 📌 Features

### Landing Page
- Sticky, responsive Navbar with logo, routes, and login/register  
- Hero section with headline, subtitle, and primary CTA  
- 4 thematic sections:
  - About Us  
  - Trust & Features  
  - Mission & Vision  
  - Final Call-to-Action  
- Uniform cards with hover/focus states  
- Footer with links, social icons, and copyright  

### Authentication
- Login/Register using Google OAuth or credentials  
- Protected routes for logged-in users  
- Redirects after login/logout  

### Product Management
- **Item List Page:** Grid of products with images, title, short description, price, and details button  
- **Item Details Page:** Large image/banner, full description, meta info, and back navigation  
- **Add Product (Protected):** Accessible only for logged-in users, with toast notification on success  
- **Manage Products (Protected):** View, delete, and manage all products in a responsive table/grid  

### Contact Page
- Modern gradient hero section  
- Contact info cards with hover animations  
- Interactive contact form with validation and toast notifications  
- Embedded Google Map and support hours card  

---

## 🔒 Protected Pages
- `/add-product` → Add new products  
- `/manage-products` → Manage existing products  
- Users must be authenticated to access these pages  

---
Installation

1. Clone the repository:

```bash
git clone https://github.com/tamim127/flixo-cart-client.git
cd flixo-cart-client

2. npm install
3. npm run dev

⚙ Routes Summary

| Route              | Description                  | Access    |
| ------------------ | ---------------------------- | --------- |
| `/`                | Landing Page                 | Public    |
| `/login`           | Login/Register Page          | Public    |
| `/products`        | Item List Page               | Public    |
| `/products/[id]`   | Product Details Page         | Public    |
| `/add-product`     | Add Product (Form)           | Protected |
| `/manage-products` | Manage Products (Table/Grid) | Protected |
| `/contact`         | Contact Page with form & map | Public    |

# UI/UX Highlights

- Responsive design (mobile, tablet, desktop)
- Consistent color palette, typography, spacing
- Interactive hover/focus states
- Modern gradients and glassmorphism elements
- Framer Motion animations for smooth transitions

# Future Enhancements

- Full backend CRUD operations for products
- Category filter & search functionality
- User roles & permissions


