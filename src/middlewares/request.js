export const  requestMiddleWare= (req, res, next) => {
    if (!req.context) {
      req.context = {};
    }
    req.pagination = {
      limit: +req.query.limit || 100,
      page: +req.query.page || 1,
      offset: +req.query.offset || 0,
    };
    if (!req.pagination.offset && req.pagination.page) {
      req.pagination.offset = +req.pagination.limit * (req.pagination.page - 1);
    }
    if (!res.body) {
      res.body = {};
    }
    res.body.meta = {
      status: res.statusCode,
      message: res.statusMessage || 'success',
    };
    res.body.data = null;
    res.body.meta.limit = req.pagination.limit;
    res.body.meta.page = req.pagination.page;
    res.body.meta.offset = req.pagination.offset;
    res.body.meta.totalCount = 0;
    next();
  };