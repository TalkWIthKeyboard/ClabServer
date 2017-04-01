/**
 * Created by CoderSong on 17/3/13.
 */

'use strict';

let router = require('express').Router(),
  pageRouter = require('./clientRoutes/pageRoute');

router.get('/', pageRouter.indexPage);
router.get('/chooseServer', pageRouter.choosePage);
router.get('/editServer', pageRouter.editPage);
router.get('/checkoutServer', pageRouter.checkoutPage);

module.exports = router;