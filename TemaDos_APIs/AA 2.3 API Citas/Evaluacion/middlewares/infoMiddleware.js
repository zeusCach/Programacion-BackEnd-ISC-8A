//Middleware que controla los datos por default que puede o no renderizar el back al archivo ejs
export function getDataWeather(req, res, next) {
     res.locals.city = req.query.city || '';
     res.locals.country = '';
     res.locals.date = '';
     res.locals.temp = '--';
     res.locals.feelsLike = '--';
     res.locals.humidity = '--';
     res.locals.wind = '--';
     res.locals.visibility = '--';
     res.locals.description = 'Sin datos';
     res.locals.icon = !null ;
     next();
}
