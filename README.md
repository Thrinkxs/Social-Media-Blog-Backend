# Blog API Documentation

Welcome to the Blog API Documentation for our blogging application. This API enables you to create, read, update, and delete blogs, authors, users, and comments, as well as interact with blogs by liking and viewing them.

## Base URL

- The base URL for all API endpoints is: `https://api.example.com`

## Authentication

- Authentication is required for most endpoints. You need to include an `Authorization` header with a valid JWT (JSON Web Token) to access protected routes. Different user roles (author and user) have varying levels of access.

---

### **Authors**

**Create Author**

- Endpoint: `/api/authors/register`
- Method: `POST`
- Description: Register a new author.
- Request Format:
  ```json
  {
    "name": "Author Name",
    "email": "author@example.com",
    "password": "strongpassword"
  }
  ```
- Response Format:
  ```json
  {
    "message": "Author created successfully"
  }
  ```

**Get Author by ID**

- Endpoint: `/api/authors/{id}`
- Method: `GET`
- Description: Retrieve author details by ID.
- Response Format:
  ```json
  {
    "data": {
      "name": "Author Name",
      "email": "author@example.com",
      "role": "author"
    },
    "token": "jsonwebtoken"
  }
  ```

**Get All Authors**

- Endpoint: `/api/authors`
- Method: `GET`
- Description: Retrieve a list of all authors.
- Response Format:
  ```json
  {
    "data": [
      {
        "name": "Author Name",
        "email": "author@example.com",
        "role": "author"
      }
    ],
    "tokens": ["jsonwebtoken"]
  }
  ```

**Update Author**

- Endpoint: `/api/authors/{id}`
- Method: `PUT`
- Description: Update author information.
- Request Format:
  ```json
  {
    "name": "Updated Author Name",
    "email": "updated.author@example.com"
  }
  ```
- Response Format:
  ```json
  {
    "message": "Author updated successfully"
  }
  ```

**Delete Author**

- Endpoint: `/api/authors/{id}`
- Method: `DELETE`
- Description: Delete an author.
- Response Format:
  ```json
  {
    "message": "Author deleted successfully"
  }
  ```

**Author Login**

- Endpoint: `/api/authors/login`
- Method: `POST`
- Description: Author login.
- Request Format:
  ```json
  {
    "name": "Author Name",
    "password": "strongpassword"
  }
  ```
- Response Format:
  ```json
  {
    "message": "Login Successful",
    "token": "jsonwebtoken"
  }
  ```

---

### **Users**

**Create User**

- Endpoint: `/api/users/register`
- Method: `POST`
- Description: Register a new user.
- Request Format:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "strongpassword"
  }
  ```
- Response Format:
  ```json
  {
    "message": "User created successfully"
  }
  ```

### **Blogs**

**Create Blog**

- Endpoint: `/api/blogs/create`
- Method: `POST`
- Description: Create a new blog.
- Request Format:
  ```json
  {
    "title": "Blog Title",
    "content": "Blog Content",
    "author": "authorID"
  }
  ```
- Response Format:
  ```json
  {
    "message": "Blog created successfully"
  }
  ```

**Get Blog by ID**

- Endpoint: `/api/blogs/{id}`
- Method: `GET`
- Description: Retrieve blog details by ID.
- Response Format:
  ```json
  {
    "data": {
      "title": "Blog Title",
      "content": "Blog Content",
      "author": {
        "name": "Author Name",
        "email": "author@example.com"
      },
      "likeCount": 0,
      "viewCount": 0
    }
  }
  ```

**Get All Blogs**

- Endpoint: `/api/blogs`
- Method: `GET`
- Description: Retrieve a list of all blogs.
- Response Format:
  ```json
  {
    "data": [
      {
        "title": "Blog Title",
        "content": "Blog Content",
        "author": {
          "name": "Author Name",
          "email": "author@example.com"
        },
        "likeCount": 0,
        "viewCount": 0
      }
    ]
  }
  ```

**Update Blog**

- Endpoint: `/api/blogs/{id}`
- Method: `PUT`
- Description: Update blog information.
- Request Format:
  ```json
  {
    "title": "Updated Blog Title",
    "content": "Updated Blog Content"
  }
  ```
- Response Format
