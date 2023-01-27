# marvel-auth

### This is a nice project by marvel on auth with jwt accesstoken and refreshtoken.

### Token created in login after validation and server sends accesstoken and refreshtoken and stored in DB

### The client receives and stores in cookies

### Server authenticates any requests from client and verify it and send back data, if accesstoken is expired, server verifies refreshtoken to create a new accesstoken without re-login

#

## touch a new .env file in server with the following

MONGO_URL='your url here'
JWT_SECRET='any long enough string, 10 characters above'
PORT=8080

npm install both client and server and npm start
