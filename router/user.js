//引入数据库包
const db = require('../db/db')
const express = require('express')
const router = express.Router()

//写接口
/**
 * @interface  /list  用户列表
 * @methods GET
 */
router.get('/list', function(req, res, next) {
	let sql='select * from `user`'  //写sql语句
	db.query(sql, function(err, rows) {   //从数据库查询
		if(err) {
			var data = {
				code: -1,
				data: null,
				msg: err
			}
		} else {
			var data = {
				code: 0,
				data: rows,
				msg: 'ok'
			}
		}
		res.json(data)  //返回查询结果
	})
}),

/**
 * @interface  /list/:id  根据用户id查找用户
 * @params id  用户id
 * @methods GET
 */
router.get('/list/:id', function(req, res, next) {
    let params = req.params
	let sql=`select * from user where id='${params.id}'`  //写sql语句
	db.query(sql, function(err, rows) {   //从数据库查询
		if(err) {
			var data = {
				code: -1,
				data: null,
				msg: err
			}
		} else {
			if(rows.length){
                var data = {
                    code: 0,
                    data: rows,
                    msg: 'ok'
                }
            }else{
                var data = {
                    code: 0,
                    data: '没有这个用户',
                    msg: 'ok'
                }
            }
		}
		res.json(data)  //返回查询结果
	})
}),

/**
 * @interface  /list/:id  根据用户id修改用户信息
 * @params id  用户id
 * @methods PUT
 */
router.put('/list/:id', function(req, res, next) {
    let id = req.params.id
    let nc = req.body.nc
	let sql=`select * from user where id='${id}'`  //写sql语句
	db.query(sql, function(err, rows) {   //从数据库查询
		if(err) {
			var data = {
				code: -1,
				data: null,
				msg: err
            }
            res.json(data)  //返回查询结果
		} else {
			if(rows.length){
                db.queryAdd(`update user set nc='${nc}' where id='${id}'`,[nc], function(err, result,fields) {   //从数据库查询
                    if(err) {
                        var data = {
                            code: -1,
                            data: null,
                            msg: err
                        }
                        res.json(data)  //返回查询结果
                    } else {
                        db.query(sql, function(err, rows) {   //从数据库查询
                            if(err) {
                                var data = {
                                    code: -1,
                                    data: null,
                                    msg: err
                                }
                            } else {
                                var data = {
                                    code: 0,
                                    data: rows,
                                    msg: 'ok'
                                }
                            }
                            res.json(data)  //返回查询结果
                        })
                    }
                    
                })
            }else{
                var data = {
                    code: 0,
                    data: '没有这个用户',
                    msg: 'ok'
                }
                res.json(data)  //返回查询结果
            }
		}
	})
}),

/**
 * @interface  /list/:id  根据用户id删除用户
 * @methods DELETE
 * @params id  用户id
 */
router.delete('/list/:id', function(req, res, next) {
    let params = req.params
	let sql=`select * from user where id='${params.id}'`  //写sql语句
	db.query(sql, function(err, rows) {   //从数据库查询
		if(err) {
			var data = {
				code: -1,
				data: null,
				msg: err
            }
            res.json(data)  //返回查询结果
		} else {
			if(rows.length){
                db.query(`delete from user where id='${params.id}'`, function(err, rows) {   //从数据库查询
                    if(err) {
                        var data = {
                            code: -1,
                            data: null,
                            msg: err
                        }
                    } else {
                        var data = {
                            code: 0,
                            data: '删除成功',
                            msg: 'ok'
                        }
                    }
                    res.json(data)  //返回查询结果
                })
            }else{
                var data = {
                    code: 0,
                    data: '没有这个用户',
                    msg: 'ok'
                }
                res.json(data)  //返回查询结果
            }
		}
	})
}),

/**
 * @interface  /addUser  新增用户
 * @methods POST
 * @params nc 昵称
 * @params sex 性别
 */
router.post('/addUser', (req, res) => {
    // req.accepts('application/json')
    let sql = 'insert into user(nc,sex) values(?,?)'
    let params = req.body
    db.query(`SELECT nc FROM user WHERE nc = '${params.nc}'`, function(err, rows) {   //从数据库查询
		if(err) {
			const data = {
				code: -1,
				data: null,
				msg: err
            }
            res.json(data)  //返回查询结果
		} else{
            if(rows.length>0) {
                const data = {
                    code: 0,
                    data: '该用户已存在',
                    msg: 'error'
                }
                res.json(data)  //返回查询结果
            }else {
                db.queryAdd(sql, [params.nc, params.sex], function(err, result, fields) { //向数据库中插入数据
                    if (err) {
                      throw new Error(err)
                    }
                    if (result) {
                      const data = {
                          code: 0,
                          data: '新增成功',
                          msg: 'ok'
                      }
                      res.json(data)  //返回查询结果
                    }
                  })
            }
            
        } 
	})
  })
module.exports=router