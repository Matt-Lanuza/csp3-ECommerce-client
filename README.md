# Capstone 3 Full-Stack Application

## Application Name: Demo-App

## Team Members:
- **Matt Aldred Lanuza**
- **Reymark Angelino**

---

## User Credentials
### Admin User
- **email**: admin@mail.com
- **password**: admin123

### Dummy Customers
- **email**: matt@mail.com
- **password**: matt1234 <br><br>

- **email**: teemo@mail.com
- **password**: teemo1234

---

## Table of Contents

- [Register Page](#register-page)
- [Login Page](#login-page)
- [Products Catalog Page](#products-catalog-page)
- [Cart View](#cart-view)
- [Order History](#order-history)
- [Profile Page](#profile-page)

---

## Register Page

The **Register Page** allows users to create an account by providing basic information like name, email, mobile number, and password. Once the registration form is submitted, users will be redirected to the login page.

### Features:
- Name, email, mobile number, and password input fields.
- Form validation for required fields.
- User registration API integration.
- Redirect to login page after successful registration.

**Contributed by:** Matt Lanuza

---

## Login Page

The **Login Page** allows users to authenticate with their credentials. Upon successful login, the user is redirected to the products catalog page or their profile page if they are already logged in.

### Features:
- Email and password input fields.
- JWT-based authentication.
- Login form validation.
- Error handling for incorrect credentials.

**Contributed by:** Matt Lanuza

---

## Products Catalog Page

The **Products Catalog Page** displays a list of available products that users can browse. Each product card includes essential details like product name, price, and an option to add to the cart.

### Features:
- List of all products
- Retrieve all active products
- Retrieve single product details
- Admin Dashboard (for managing products)
  - Option to add products to the shopping cart (Admin Dashboard)
  - Retrieve and update all products
  - Deactivate or reactivate products
- View detailed product information

**Contributed by:** Matt Lanuza

---

## Cart View

The **Cart View** allows users to view their shopping cart, manage product quantities, and proceed with checkout. It also calculates the subtotal for each product and the total price for all items in the cart.

### Features:
- **Add to Cart**: Users can add products to their cart with specific quantities.
- **Get All Cart Items**: Users can view all products added to their cart.
- **Update Product Quantity**: Modify the quantity of a specific product in the cart.
- **Subtotal for Each Item**: Automatically calculates the price for each product based on its quantity.
- **Total Price**: Displays the total price for all items in the cart.
- **Remove Product from Cart**: Users can remove any item from their cart.
- **Clear All Products**: Option to clear the entire cart.
- **Checkout Order**: Proceed to checkout where users provide their shipping details and finalize the purchase.

### Admin Features:
- Admins can view all users' carts, update items, and assist users with issues related to their cart.

**Contributed by:** Matt Lanuza

---

## Order History

The **Order History** section allows users to view all of their past orders and manage order details.

### Features:
- **Non-admin User Checkout**: Non-admin users can see their own past orders, including order details such as products, quantities, and total price.
- **Admin View All Orders**: Admin users can view all orders made by non-admin users, allowing them to manage orders, update status, and track shipping.
  
### Additional Admin Features:
- **View All Orders**: Admins have the ability to view all orders made across the platform.
- **Manage Order Status**: Admins can update the status of orders (e.g., "Pending," "Shipped," "Delivered").

**Contributed by:** Matt Lanuza

---

## Profile Page

The **Profile Page** is where users can manage their personal information, view their past orders, and reset their password if needed. This page provides access to the user's account settings and order history.

### Features:
- **User's Profile**: Displays user details such as name, email, and mobile number. The user can update these details from this page.
- **Update Profile Information**: Users can edit and update their profile information, including name, email, and mobile number.
- **Reset Password**: If users forget their password or wish to change it, they can reset it from the Profile Page. The user is prompted to enter their current password and the new password.
- **JWT-based Authentication**: The page ensures that only authenticated users can access their profile information.
  
### Additional Features:
- **Profile Security**: The profile page includes mechanisms for securing the user’s personal information, with the ability to log out or manage account settings.
- **Admin Features**: Admins may have the ability to update or deactivate user accounts from this section, including the ability to reset passwords for users.

**Contributed by:** Matt Lanuza

---
