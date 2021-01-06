# vhost manager
vhost manager for nginx

## Getting Started
Install nginx on your machine
```
apt-get install nginx
```
Add extra nginx config
```
touch /etc/nginx/sites-enabled/subdomains
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
npm run build
npm start
```

## API Documentation
GET '/?token=your-secret-api-token' : get vhost entry list

POST '/new?token=your-secret-api-token' : add vhost entry
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"ip":"127.0.0.1", "subdomain":"test", "ports":[80, 90, 100]}' \
  http://localhost:3000/new?token=your-secret-api-token
```

POST '/delete?token=your-secret-api-token' : delete vhost entry
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"subdomain":"test"}' \
  http://localhost:3000/delete?token=your-secret-api-token
```