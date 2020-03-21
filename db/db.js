//db.js
// 连接MySQL
const mysql = require('mysql')
const pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',         //数据库用户名
  password : '123456',         //数据库密码
  database : 'umwedb'          //数据库名称
})
 
function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            callback(err, rows)
            connection.release()//释放链接
        })
    })
}
function queryAdd(sql, params, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, params, function (err, results,fields) {
            callback(err, results, fields)
            connection.release()//释放链接
        })
    })
}
exports.query = query
exports.queryAdd = queryAdd