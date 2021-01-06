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
npm start
```

## API Documentation
GET '/your-authkey' : connection test
POST '/your-authkey/new' : add vhost entry
POST '/your-authkey/delete' : delete vhost entry