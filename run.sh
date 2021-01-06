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