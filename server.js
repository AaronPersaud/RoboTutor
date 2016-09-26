var PythonShell = require('python-shell');
var bodyParser = require('body-parser')
var express = require('express');
var crypto = require('crypto');
var app = express();
var path = require('path');
var mysql = require('mysql');
var creds = require('./credentials');


app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname)


console.log(creds.foo)

var connection = mysql.createConnection({
  host: creds.host,
  user: creds.user,
  password: creds.password,
  database: creds.database,
});

connection.connect();

// app.use(express.static(__dirname));

hashCode = function(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

app.use(bodyParser())

app.get('/', function(req,res) {
   res.sendFile('index.html', {root: __dirname })
});
app.get('/test', function(req, res) {
	res.sendFile('public/questions.html', {root: __dirname })
});

app.post('/questions', function(req,res) {

	console.log(req.body);
	//var qid = req.body.qid;
	var uid = hashCode(req.body.uid)
	var topic = req.body.topic;
	var question = req.body.question;
	var answer = req.body.answer;
	//var s_score = req.body.s_score;
	//var last_attempt = req.body.last_attempt;
	//var last_seen = req.body.last_seen;

	var query = 'INSERT INTO questions (uid, topic, question, answer) VALUES (' + uid + ', "' + topic + '","' + question + '","' + answer + '");'
	console.log(query);
	connection.query(query, function(err, rows, fields) {
	  if (err) throw err;
	  //console.log('The solution is: ', rows);
	  res.send("SUCCESS")
	});
});

var blah = 1;
app.get('/questions', function (req, res) {
	console.log("GET REQ")
	console.log(req.query.uid)
	var id = req.query.uid 
	connection.query('SELECT qid, uid, topic, question, answer, s_score, last_attempt, unix_timestamp(last_seen) as last_seen FROM questions WHERE uid="' + id +'";', function(err, rows, fields) {
	//console.log(rows)
  	//console.log(res.json(rows))

	var options = {
	  mode: 'text',
	  //pythonPath: 'path/to/python',
	  pythonOptions: ['-u'],
	  //scriptPath: '/',
	  args: []
	};
	//console.log(rows[0])
	// for (var i = rows.length - 1; i >= 0; i--) {
	// 	options.args.push(rows[i])
	// 	console.log(options.args[i])
	// }
	for (var i = 0; i < rows.length; i++) {
		console.log(rows[i].qid)
		obj = '{"qid":' + rows[i].qid + ', "uid":' + rows[i].uid + ', "topic":"' + rows[i].topic + '", "question": "' + rows[i].question + '", "answer": "' + rows[i].answer + '", "s_score":' + rows[i].s_score + ', "last_attempt":' + rows[i].last_attempt + ', "last_seen":' + rows[i].last_seen + '}';
		//console.log(obj)
		options.args.push(obj);
		//console.log(obj)
	}

	PythonShell.run('prob_process.py', options, function (err, results) {
	  if (err) throw err;
	  // results is an array consisting of messages collected during execution

	  //get questions from IDs
	  result = JSON.parse(results[0])
	  //console.log(result)
	  res.send(result)
	  // for (var i = 0; i <result.results.length; i++) {
	  // 	results.results[i]
	  // }
	});

  })
});

app.put('/questions', function (req, res) {
  //res.send('Got a PUT request at /');

	var answer_attempt = req.body.answer_attempt;
	//var s_score = req.body.s_score;
	var message;
	var qid = req.body.qid
	var s_score;
	console.log(qid)

	connection.query('SELECT answer, s_score FROM questions WHERE qid=' + qid + ";", function(err, rows, fields) {

		if (answer_attempt === rows[0].answer) {
			message = "Right answer";
			console.log("CORRECT")
			last_attempt = 1;
			s_score = rows[0].s_score*2
		}

		else {
			message = "Wrong answer";
			console.log("WRONG")
			last_attempt = 0;
			s_score = rows[0].s_score
		}
		connection.query('UPDATE questions SET last_attempt=' + last_attempt + ', s_score=' + s_score + ' WHERE qid=' + qid + ";", function(err, rows, fields) {

		res.send(message)

		});
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//connection.end();
