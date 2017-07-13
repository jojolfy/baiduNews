var express = require('express');
var router = express.Router();
var mysql=require('../modal/mysql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getNews',function (req,res,next){
	mysql.query(`SELECT * FROM news WHERE 1`, function (error, results, fields) {
		if (error) throw error;
		res.send(results);
	});
});

router.post('/addNews',function (req,res,next){
	// var id=0;

	mysql.query(`INSERT INTO news (title,text,img,source,class) VALUES ('${req.body.title}','${req.body.text}','${req.body.img}','${req.body.sou}','${req.body.tag}')`, 
		function (error, results, fields) {
		if (error) throw error;
		// id=results.insertId;
		res.send(results);
	});

	/*mysql.querySync(`SELECT * FROM news WHERE id='${id}'`,function (err,results,filter){
		if(err) throw err;
		res.send(results);		//不能实现，没有同步功能
	});*/
});

router.post('/delNews',function (req,res,next){
	mysql.query(`DELETE FROM news WHERE id='${req.body.id}'`,function (err,results,filter){
		if(err) throw err;
		res.send('删除成功');
	});
});

router.post('/getOne',function (req,res,next){
	mysql.query(`SELECT * FROM news WHERE id='${req.body.id}'`,function (err,results,filter){
		if(err) throw err;
		res.send(results[0]);
	});
});

router.post('/updataNews',function (req,res,next){
	//UPDATE news SET id='',title='',text='',img='',source='',time='',class='' WHERE id=''
	mysql.query(`UPDATE news SET title='${req.body.title}',text='${req.body.text}',img='${req.body.img}',source='${req.body.sou}',time='${req.body.time}',class='${req.body.tag}' WHERE id='${req.body.id}'`,
		function (err,results,files){
			if(err) throw err;
			res.send(req.body.id);
		});
});
/*mysql.query(`INSERT INTO news (title,text,img,source,class) VALUES ('测试','添加page','356','图片网','sql')`, function (error, results, fields) {
	if (error) throw error;
});*/

router.post('/news',function (req,res,next){
	mysql.query(`SELECT * FROM news WHERE class='${req.body.tag}'`,
		function (err,results,files){
			if(err) throw err;
			console.log(results);
			res.send(results);
		});
});

module.exports = router;
