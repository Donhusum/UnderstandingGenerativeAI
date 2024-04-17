exports.homepage_get = function(req, res, next) {
    res.render('index', { title: 'Home' });
};