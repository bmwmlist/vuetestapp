const jwt = require("express-jwt"); // NEW
const jwksRsa = require("jwks-rsa"); // NEW
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const authConfig = {
    domain: "dev-oid21d1k.eu.auth0.com",
    audience: "VueExpressSimpleAPI.bmwgroup.net"
};

const checkJwt = jwt({
    // Provide a signing key based on the key identifier in the header and the signing keys provided by your Auth0 JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),
  
    // Validate the audience (Identifier) and the issuer (Domain).
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ["RS256"]
  });

// mock data to send to our frontend
let events = 
[
  {
    id: 1,
    name: 'Security Days',
    category: 'Security',
    description: 'Spend time to discuss the security implications of new technologies.',
    featuredImage: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?cs=srgb&dl=internet-screen-security-protection-60504.jpg&fm=jpg',
    images: [
      'https://images.pexels.com/photos/289927/pexels-photo-289927.jpeg?cs=srgb&dl=blur-business-close-up-coding-289927.jpg&fm=jpg',
      'https://images.pexels.com/photos/374103/pexels-photo-374103.jpeg?cs=srgb&dl=two-person-standing-under-lot-of-bullet-cctv-camera-374103.jpg&fm=jpg',
      'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?cs=srgb&dl=working-pattern-internet-abstract-1089438.jpg&fm=jpg',
    ],
    location: 'BMW Group FIZ Studio',
    date: '02-28-2020',
    time: '10:30 CET'
  },
  {
    id: 2,
    name: 'Coding Skills',
    category: 'Coding',
    description: 'Coding skills for modern applikations will be discussed, trained and developed. Bring your own device!',
    featuredImage: 'https://images.pexels.com/photos/340152/pexels-photo-340152.jpeg?cs=srgb&dl=adult-apple-device-business-code-340152.jpg&fm=jpg',
    images: [
      'https://images.pexels.com/photos/247791/pexels-photo-247791.png?cs=srgb&dl=view-of-airport-247791.jpg&fm=jpg'
    ],
    location: 'BMW Group BIZ',
    date: '03-05-2020',
    time: '09:00'
  }
];

app.get('/events', (req, res) => {
    res.send(events);
});

//app.get('/events/:id', checkJwt, (req, res) => {
app.get('/events/:id', (req, res) => {
    const id = Number(req.params.id);
    const event = events.find(event => event.id === id);
    res.send(event);
});


app.get('/', (req, res) => {
  res.send(`Hi! Server is listening on port ${port}`)
});

// listen on the port
app.listen(port);