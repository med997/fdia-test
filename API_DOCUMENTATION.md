# API Documentation

This project uses the [DummyJSON](https://dummyjson.com/) API for product data. Below are the endpoints utilized in the application.

**Base URL**: `https://dummyjson.com`

---

## 1. Get All Products

Fetches a paginated list of products.

- **Endpoint**: `/products`
- **Method**: `GET`
- **Query Parameters**:
  - `limit`: Number of items to return (e.g., `10`)
  - `skip`: Number of items to skip for pagination (e.g., `0` for page 1, `10` for page 2)

**Example Request**:

```http
GET https://dummyjson.com/products?limit=10&skip=0
```

---

## 2. Search Products

Searches for products based on a query string.

- **Endpoint**: `/products/search`
- **Method**: `GET`
- **Query Parameters**:
  - `q`: The search query (e.g., `phone`)
  - `limit`: Number of items to return
  - `skip`: Number of items to skip

**Example Request**:

```http
GET https://dummyjson.com/products/search?q=phone&limit=10&skip=0
```

---

## 3. Get Products by Category

Fetches products belonging to a specific category.

- **Endpoint**: `/products/category/{category_name}`
- **Method**: `GET`
- **Path Parameters**:
  - `category_name`: The name of the category (e.g., `laptops`)
- **Query Parameters**:
  - `limit`: Number of items to return
  - `skip`: Number of items to skip

**Example Request**:

```http
GET https://dummyjson.com/products/category/laptops?limit=10&skip=0
```

---

## 4. Get Categories List

Retrieves a list of all available product categories.

- **Endpoint**: `/products/category-list`
- **Method**: `GET`

**Example Request**:

```http
GET https://dummyjson.com/products/category-list
```

**Response Example**:

```json
[
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  ...
]
```

---

## 5. Add Product

Adds a new product to the database.
_Note: Adding a new product will not add it into the server. It will simulate a POST request and will return the new product with a new id._

- **Endpoint**: `/products/add`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
- **Body**: JSON object containing product details.

**Request Body Example**:

```json
{
  "title": "BMW Pencil",
  "description": "This is a new product description",
  "price": 100,
  "discountPercentage": 10,
  "rating": 4.5,
  "stock": 50,
  "brand": "BMW",
  "category": "laptops",
  "thumbnail": "..."
}
```

**Response Example**:

```json
{
  "id": 101,
  "title": "BMW Pencil",
  ...
}
```
