/**
 * Created by CoderSong on 17/4/4.
 */

'use strict';

let router = require('express').Router(),
  apiRouter = require('./API/coreAPIRoute');

router.post('/edit/page', apiRouter.editByPage);
router.post('/edit/file', apiRouter.editByFile);

module.exports = router;