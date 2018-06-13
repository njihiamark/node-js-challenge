var express = require('express');
var router = express.Router();
var uni = require('unirest');
var _ = require('lodash');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
        var Request = uni.get('http://api-c1.hivisasa.com/const/locations/_list');
        Request.end(function(response) {
          let rankedArticles = requestGetter('http://analytics.hivisasa.tech/ranked').then((successMessage) => {
            return successMessage;
          }).catch((err) => {
          throw new Error('We have errors. ' + err);

        });



          let latestArticles = requestGetter('http://analytics.hivisasa.tech/latest').then((successMessage) => {

            return successMessage;
          }).catch((errors) => {
          throw new Error('We have errors. ' + errors);

        });

          //let's render them now
          render_articles(res, req, JSON.stringify(rankedArticles), JSON.stringify(latestArticles), JSON.stringify(response.body));
          console.log(response.body);
      });
});




//function that returns a promise and has error handling
function requestGetter(url){
  return new Promise((resolve, reject) => {
  var Request = uni.get(url).end(function(response) {
    if (response.error) {
      //console.log('GET error', response.error);
      reject(JSON.stringify(response.error));
    }else{
      resolve(response.body);
    }

  })
});

}

let render_articles = function(res, req, rankedArticles, latestArticles, locations) {
    res.render('mobile/index', {
        latestArticles: latestArticles,
        layout: 'mobile/layout',
        locations: locations,
        rankedArticles: rankedArticles
    });
};




module.exports = router;
