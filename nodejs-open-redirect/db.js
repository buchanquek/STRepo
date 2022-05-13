var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  port: 3306,
  database: "nodelogin"
});

con.connect(function(err) {
    if (!!err) {
        console.log(err);
    } else {
        console.log("connected");
    }
  });

module.exports = con;
