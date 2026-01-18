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

| url                                                         | method/verb | body (object)                              |
| ----------------------------------------------------------- | ----------- | ------------------------------------------ |
| https://www.myserver.com/products?sort=name&page=1&limit=30 | GET         | -                                          |
| https://www.myserver.com/products/100                       | GET         | -                                          |
| https://www.myserver.com/products                           | POST        | `{ name: '', img: byte[], ... }`           |
| https://www.myserver.com/products/100                       | DELETE      | -                                          |
| https://www.myserver.com/products/100                       | PUT         | `{ name: '', img: byte[], price: 11 ... }` |
| https://www.myserver.com/products/100                       | PATCH       | `{ price: 11 }`                            |

### Comments

- url is length limited & not secure
- body is unlimited & secure (in https)
- always use RESTful conventions for urls, methods, and status codes

## HTTP response (RESTful API)

- body - only *JSON*s
- headers
- status codes (success/failed)

### Status Codes

- **Success** - `200` - success, `201` - created, `204` - no content
- **Client Error** - `400`, `404` - not found
- **Server Error** - `500`

## Env

- contains environments variables, like: `PORT`, `DB_NAME`
- `.env` is secret file, not include in git & github
- `.env` file structure:
  ```.env
  KEY1=value1
  KEY2=value2
  KEY3=value3
  ```
- to read we need:

  ```bash
  npm i dotenv
  ```

  ```js
  import { config } from "dotenv";

  config();

  console.log(process.env.KEY1);
  console.log(process.env.KEY2);
  console.log(process.env.KEY3);
  ```

- another way to use (instead of `dotenv`) - from node v20:
  
  ```bash
  node ---env-file=<env-file-name> <node-file-name>
  ```
  
  (multiple `--env-file` arguments can be used)

## Middlewares
3 kinds:
- build-in middlewares:
  - `express.json()`, `express.static(...)`
- custom middlewares
  - error handler (4 parameters), not found, block days (middleware creator)
- third-party middlewares (you need to do: `npm i ...`):
  - `cors`, `morgan`, ...

## next function
each middleware gets: req, res, next.

`next` can:
- move to next middleware (no parameters)
- move to error handler (one parameter)

## upload files middleware
by `multer` third-party library.
1. install:
    ```
    npm i multer
    ```
2. create `upload-files.js` file in `middlewares` folder:
   - import multer
   - create & export `upload` variable
   - if we want complex configuration we can add it to `multer`
   ```js
    import multer from "multer";
    export const upload = multer({ dest: 'public/' }); // simple
    export const uploadPlus = multer({ fileFilter, storage, ... }); // complex
   ```
  
## Security
### strong passwords
by `joi` validator
### Store in db hashed passwords
by `bcrypt`/`bcryptjs`:
```js
salt = bcrypt.getSalt(12)
bcrypt.hashSync('pass', salt);
bcrypt.compareSync('pass', hashedPass);
```
### user roles
by JWT (Json Web Token).

# Git Commands
```bash
git init # initial local git repository
git add . # add all files to Index

# הוספת השינוי הנוכחי לקומיט קודם
git commit --amend # עם לערוך את הודעת הקומיט
git commit --amend --no-edit # בלי לערוך את הודעת הקומיט

git remote remove origin # מחיקת הקישור לגיטהאב
git remote add origin new_url # הוספת קישור חדש לגיטהאב

git clone my_remote_url # מוריד את הפרויקט מגיטהאב ומשאיר את החיבור לגיט
```
