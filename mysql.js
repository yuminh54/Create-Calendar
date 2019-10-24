var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  port     : 5000,
  password : 'password',
  database : 'my_database'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) {
      console.log(error);
  }
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();