# vhost manager
vhost manager for nginx

## Getting Started
Install nginx on your machine
```
apt-get install nginx
```

Install node modules
```
npm install
```

copy config.json.example to config.json
```
cp config.json.example config.json
```

Edit config.json
```
nano config.json
```

Start vhost manager
```
npm build
npm start
```

## API Documentation
GET '/your-authkey' : get vhost entry list

POST '/your-authkey/new' : add vhost entry
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"ip":"127.0.0.1", "subdomain":"test", "ports":[80, 90, 100]}' \
  http://localhost:3000/your-secret-api-authkey/new
```

POST '/your-authkey/delete' : delete vhost entry
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"subdomain":"test"}' \
  http://localhost:3000/your-secret-api-authkey/delete
```