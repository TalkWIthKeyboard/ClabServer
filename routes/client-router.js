/**
 * Created by CoderSong on 17/3/13.
 */

'use strict';

let router = require('express').Router(),
  pageRouter = require('./clientRoutes/pageRoute');

router.post('/result',pageRouter.getResult);
router.get('/test', pageRouter.testPage);

module.exports = router;