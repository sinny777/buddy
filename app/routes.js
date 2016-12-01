module.exports = function(app) {

  var googleSTTEndpoint = require('./endpoints/speechEndpoint.js')();
  
    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/views/:name', showClientRequest, function (req, res) {
        var name = req.params.name;
        res.render('views/' + name);
    });

    app.post('/api/stt/start', showClientRequest, googleSTTEndpoint.startSTT);
    app.post('/api/stt/stop', showClientRequest, googleSTTEndpoint.stopSTT);

    function showClientRequest(req, res, next) {
        var request = {
            REQUEST : {
                HEADERS: req.headers,
                BODY : req.body
            }
        }
        return next();
    }

}
