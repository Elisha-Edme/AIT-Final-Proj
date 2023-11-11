import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import bodyParser from 'body-parser';
//  port 16285

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
    saveUninitialized: true
};
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.render('index');
  });
app.get('/addPurchase', (req, res) => {
  res.render('addPurchase');
});
app.post('/addPurchase', (req, res) => {
  res.send('Submitted');
});
app.use(session(sessionOptions));

app.listen(process.env.PORT || 3000);