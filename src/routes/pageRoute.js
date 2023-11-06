const route = require('express').Router();

const pageCont = require('../controllers/pageCont');
const {img_handler} = require('../helpers/img_proccessor')

route.get('/', pageCont.index);
route.post('/report-disaster', img_handler, pageCont.report_disaster);
route.get('/single-disaster', pageCont.single_disaster);

module.exports = route;