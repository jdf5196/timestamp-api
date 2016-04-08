'use strict';

const express = require('express');
const app = express();

let port = (process.env.PORT || 5000);

app.set('port', port);

app.use(express.static(process.cwd() + '/public'));

app.get('/:date', function(req, res) {
  let inputDate;
  if(isNaN(req.params.date)){
    inputDate = Date.parse(req.params.date)
  }else{
    inputDate = req.params.date * 1000
  };

  let findDate = function(d){
    let time = new Date(d);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
    'December'];
    let year = time.getFullYear();
    let day = time.getDate();
    let month = months[time.getMonth()];
    let fullDate = month + ' ' + day + ', ' + year;
    return fullDate
  };
  let naturalDate = findDate(inputDate);
  
  if (isNaN(inputDate)) {
    res.json({
      'natural': null,
      'unix': null
    });
  }else{
  
    res.json({
      'natural': naturalDate,
      'unix': inputDate / 1000
    });
  }
});

app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + port);
});