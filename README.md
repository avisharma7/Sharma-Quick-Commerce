# Sharma Quick Commerce

Sharma Quick Commerce is a full-stack e-commerce web application built with Angular and Java Spring Boot. It includes essential features for a modern online store, providing a seamless shopping experience for users. The project follows best practices in security, performance, and scalability.

## Features

- **User Authentication & Authorization**: Implemented Spring Security with JWT for stateless authentication and role-based access control (RBAC). Used BCrypt for secure password hashing and enforced stateless sessions with SessionCreationPolicy.STATELESS.
- **Product Catalog**: Users can browse and search for products efficiently.
- **Shopping Cart**: Users can add products to their cart and proceed to checkout seamlessly.
- **Swagger API Documentation**: Provides detailed API documentation using Swagger.
- **Responsive Design**: Improved styling and responsiveness for a better user experience.

## Technologies Used

### Backend:
- Java 11
- Apache Maven
- Hibernate
- Spring Core
- Spring Data
- Spring REST
- Spring Boot
- Spring Security

### Frontend:
- TypeScript
- Angular

### Additional Services:
- JWT (Authentication & Authorization)
- Stripe (Payment Integration) [ will be doing ]
- Swagger API (API Documentation)

## Contributions

### Added Swagger API Documentation
I implemented **Swagger API documentation** to provide detailed insights into the project's API endpoints. This helps developers understand how to interact with the backend services efficiently.

### Refine Styling and Responsive Design
I improved the **user interface** by refining the styling and ensuring a **responsive design**. This enhances the user experience and makes the website more visually appealing.

## How to Run the Project

### Backend (Spring Boot)
1. Clone the repository:
   ```sh
   git clone https://github.com/avisharma7/Sharma-Quick-Commerce.git
   ```
2. Navigate to the backend folder:
   ```sh
   cd backend
   ```
3. Install dependencies:
   ```sh
   mvn install
   ```
4. Run the application:
   ```sh
   mvn spring-boot:run
   ```

### Frontend (Angular)
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Angular app:
   ```sh
   ng serve
   ```

The application should now be running locally!

## License
This project is open-source and available for contributions.



