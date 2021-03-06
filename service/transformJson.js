/*
 * @Author: harry.liu 
 * @Date: 2018-10-10 16:49:15 
 * @Last Modified by: harry.liu
 * @Last Modified time: 2019-01-09 17:13:26
 */
const debug = require('debug')('app:store')
const E = require('../lib/error')
const { Init, Server, Container } = require('./base')

/**
 * 状态机
 * server state: init -> notice -> pending -> finish
 */

class TransformJson extends Container {
  constructor(limit) {
    super(limit)
    this.requestType = 'json'
  }

  // 创建客户端请求
  createServer(req, res) {
    this.schedule()
    if (this.map.size > this.limit) throw new E.PipeTooMuchTask()
    new Server(req, res, this, Init)
  }
}

module.exports = new TransformJson(1024)