const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');

const app = express();
app.use(cors());


const verifyjwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-5o6dwm24.us.auth0.com/.well-known/jwks.json',
    }),
    audience: 'this is a unique identifer',
    issuer: 'https://dev-5o6dwm24.us.auth0.com/',
    algorithms: ['RS256']
}).unless({ path: ['/'] });
app.use(verifyjwt);

app.get('/', (req, res)=>{
    res.send('Hello from index route');
});

app.get('/protected',async(req,res)=>{
    try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const Response = await axios.get('https://dev-5o6dwm24.us.auth0.com/userinfo',{
    headers: {
        authorization: `Bearer ${accessToken}`,
    },
    });
    const userinfo = Response.data;
    console.log(userinfo);
    res.send(userinfo);
    } catch (error) {
        res.send(error.message)
    }
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Internal server error';
    res.status(status).send(message);
})



app.listen(4000, ()=> console.log('Server on port 4000'));