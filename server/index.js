const port = process.env.PORT || 3001;
const app = require('./app');

app.listen(port, ()=> console.log(`listening on port ${port}`));
