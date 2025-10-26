# Node Express Server
## Server vs. Client
### Server Contains
- DB connection
- file IO
- complex logic (waze, ...)
- auth (private)

### Client
- UI

### Comments
- HTTP is stateless
- we will create **RESTful API** (API is Application Programming Interface) - API for resources
- more server examples: socket.io, GraphQL, ...

## HTTP request (RESTful API)
url | method/verb | body (object)
--|--|--
<!-- https://www.myserver.com/products | GET | - -->
https://www.myserver.com/products?sort=name&page=1&limit=30 | GET | -
https://www.myserver.com/products/100 | GET | -
https://www.myserver.com/products | POST | `{ name: '', img: byte[], ... }`
https://www.myserver.com/products/100 | DELETE | -
https://www.myserver.com/products/100 | PUT | `{ name: '', img: byte[], price: 11 ... }`
https://www.myserver.com/products/100 | PATCH | `{ price: 11 }`

### Comments
- url is length limited & not secure
- body is unlimited & secure (in https)
- always use RESTful convensions for urls, methods, and status codes

## HTTP response (RESTful API)
- url
- method type
- body - only *JSON*s
- headers
