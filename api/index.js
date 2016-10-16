import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import schema from './schema';

import { Auth } from './auth';
import { Entries } from './sql/models';

const app = express();
const PORT = 5300;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const auth = new Auth();

app.get('/login', (req, res) => {
  auth.login();
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  auth.logout();
  res.redirect('/');
});

// Set GraphQL endpoint
app.use('/graphql', graphqlExpress({
  schema,
  context: {
    auth,
    Entries: new Entries()
  }
}));

// Set GraphiQL
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

app.listen(PORT, () => console.log(
  `API Server is now running on http://localhost:${PORT}`
));
