# vhost manager
restful api virtual host manager for nginx

## Getting Started
Option1: run script
```
#!/bin/bash
#Define these variables before running the script
#apiToken=         #api token to set
#domainSuffix=     #.domain-name
#configPath=       #folder path of nginx configurations
sudo apt-get update
sudo apt install -y nginx nodejs npm
touch $configPath/subdomains
git clone https://github.com/RuiSiang/vhost-manager
cd vhost-manager
npm install
npm install -g pm2
echo "{\"apiToken\": \"$(echo $apiToken)\",\"domainSuffix\":\"$(echo $domainSuffix)\",\"configPath\":\"$(echo $configPath)\"}" > config.json
npm run build
pm2 start -i max --name vHostManager ./dist/bin/server.js
```

Option2: manual

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
