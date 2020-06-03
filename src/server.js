const exsocket = require('./wrapper/Exsocket');

const app = exsocket(process.env.PORT || 2000);

// routers
const question = require('./app/question');
const people = require('./app/people');


app.use(question);
app.use(people);
