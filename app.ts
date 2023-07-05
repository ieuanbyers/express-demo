import { Product } from './model/product';
import { Request, Response } from 'express';
const dayjs = require('dayjs');
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const session = require('express-session');

const app = express();

// configure nunjucks
const appViews = path.join(__dirname, '/views/');

const nunjucksConfig = {
  autoescape: true,
  noCache: true,
  express: app,
};

const env = nunjucks.configure(appViews, nunjucksConfig);

env.addFilter('date', function (date: number) {
  return dayjs(new Date(date)).format('DD/MM/YYYY ');
});

// configure express
app.set('view engine', 'html');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: 'NOT HARDCODED SECRET', cookie: { maxAge: 60000 } }));

declare module 'express-session' {
  interface SessionData {
    product: Product;
  }
}

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// express routes
app.get('/', (req: Request, res: Response) => {
  res.render('pizza', {
    title: 'New Pizza Time',
  });
});

require('./controller/productController')(app);
require('./controller/orderController')(app);
