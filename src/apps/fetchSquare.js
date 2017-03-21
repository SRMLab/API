var https = require("https");
var moment = require('moment-timezone');

// var squareUrl = "https://connect.squareup.com/v1/1R1JZM5VPEXTR/payments";
var squareUrl = "https://connect.squareup.com/v1/1R1JZM5VPEXTR/order=DESC";
//var period = "begin_time=2015-08-01T00:00:00Z&end_time=2015-08-31T00:00:00Z";

var options = {
  hostname: 'connect.squareup.com',
  path: '/v1/1R1JZM5VPEXTR/payments?',
  headers: {
    'Authorization': 'Bearer m8poLhxxGmr2bCfNzkKriQ',
    'Accept': 'application/json'
  }
};


module.exports = function(date){
    console.log("date: " + date);
    var time = moment(date, "YYYYMMDD").tz('America/Los_Angeles');
    var end_time = time.format();
    var begin_time = time.subtract(1, 'd').format();
    options.path = "/v1/1R1JZM5VPEXTR/payments?order=DESC&begin_time=" + begin_time + "&end_time=" + end_time + "&limit=10";
    console.log(options.path);
    console.log("start: ", new Date());
    https.get(options, function(res){
        console.log("statusCode: ", res.statusCode);
        // console.log("headers: ", res.headers);
        var data = "";
        res.on('data', function(chunk) {
            data += chunk.toString('utf8');
        });
        res.on('end', function() {
            var sales = JSON.parse(data);
            for (var i=0; i<sales.length; i++){
              console.log(i, sales[i].created_at, sales[i].total_collected_money.amount);
              const items = sales[i].itemizations;
              for (var j=0; j<items.length; j++){
                console.log("item: ", items[j].name, items[j].total_money);
              }
            }
            console.log("end: ", new Date());
        });
    }).on('error', function(e) {
        console.log("Error: " + e.message);
    });
};
