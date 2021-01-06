import Koa from 'koa'
import Router from 'koa-router'
import cmd from 'node-cmd'
import fs from 'fs'
import ConfigParser from '@webantic/nginx-config-parser'
let nginxParser = new ConfigParser()

const router = new Router()
const config: {
  authKey: string
  configPath: string
  domainSuffix: string
} = JSON.parse(fs.readFileSync('./config.json').toString())
console.log('Using configuration:')
console.log(JSON.stringify(config))

router.get(
  `/${config.authKey}`,
  async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
    let configData = nginxParser.readConfigFile(config.configPath)
    if (!configData.server) {
      configData.server = []
    } else if (!!configData.server.server_name) {
      const tmpConfigData = configData.server
      configData.server = [tmpConfigData]
    }
    await ctx.render('index', configData)
  }
)

router.post(
  `/${config.authKey}/new`,
  async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
    let configData = nginxParser.readConfigFile(config.configPath)
    if (!configData.server) {
      configData.server = []
    } else if (!!configData.server.server_name) {
      const tmpConfigData = configData.server
      configData.server = [tmpConfigData]
    }
    configData.server.push({
      listen: ctx.request.body.ports,
      server_name: `${ctx.request.body.subdomain}${config.domainSuffix}`,
      'location /': {
        autoindex: 'off',
        proxy_set_header: ['X-Forwarded-For $remote_addr', 'Host $http_host'],
        proxy_pass: `http://${ctx.request.body.ip}:$server_port`,
      },
    })

    try {
      nginxParser.writeConfigFile(config.configPath, configData, true)
    } catch (err) {
      ctx.status = 500
    } finally {
      cmd.run('nginx -s reload')
      ctx.status = 200
    }
  }
)

router.post(
  `/${config.authKey}/delete`,
  async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
    let configData = nginxParser.readConfigFile(config.configPath)
    if (!configData.server) {
      configData.server = []
    } else if (!!configData.server.server_name) {
      const tmpConfigData = configData.server
      configData.server = [tmpConfigData]
    }
    for (let i = 0; i < configData.server.length; i++) {
      if (
        configData.server[i].server_name ==
        `${ctx.request.body.subdomain}${config.domainSuffix}`
      ) {
        configData.server.splice(i, 1)
        break
      }
    }
    try {
      nginxParser.writeConfigFile(config.configPath, configData, true)
    } catch (err) {
      ctx.status = 500
    } finally {
      cmd.run('nginx -s reload')
      ctx.status = 200
    }
  }
)

export default router
