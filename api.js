
const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const hostname = '127.0.0.1';

/* Servidor do Banco de Dados */
const portback = 3061;
const sqlite3 = require('sqlite3').verbose();
const server = express();
const DBPATH = 'revirarDB.db';
server.use(express.static('.'));
server.use(express.json());


/* Definição dos endpoints */

/****** CRUD ******************************************************************/

// Retorna todos registros (é o R do CRUD - Read)
server.get('/users', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM acolhido';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

/* Inicia o servidor */
server.listen(portback, hostname, () => {
  console.log(`BD server running at http://${hostname}:${portback}/`);
});

// Insere um registro (é o C do CRUD - Create)
server.post('/userinsert', urlencodedParser, (req, res) => {// inicia a função. /userint é nosso endpoint
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO acolhido (id_atendido) VALUES ('3')"; // insere um valor no banco de dados (só está sendo passado o id, porque ele é obrigatorio)
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});