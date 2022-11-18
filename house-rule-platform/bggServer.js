const axios = require('axios');
const X2JS = require('x2js');
const express = require('express');
const port = 8000;

const bggUrl = 'https://www.boardgamegeek.com/xmlapi2/';
const bggV1Url = 'https://boardgamegeek.com/xmlapi/';
const x2 = new X2JS();
const q = require('express-queue');

const delay = async function (ms) {
  await new Promise((executor) => setTimeout(() => executor(), ms)).then(() => {
  });
};

const getBoardGame = async function (name, exact) {
  let response;
  try {
    const url = `${bggUrl}search?query=${name}&type=boardgame&exact=${exact}`;
    response = await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': true
      }
    });
  } catch (e) {
    console.log('An error occurred:', e.response);
  }
  // @ts-ignore
  let bg = x2.xml2js(response.data).items.item;
  if (bg === undefined) {
    bg = [];
  }
  return bg;
};

const getBGGUser = async function (bggUserName) {
  let response;
  try {
    const url = `${bggUrl}user?name=${bggUserName}&hot=1&top=1`;
    response = await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': true
      }
    });
  } catch (e) {
    console.log('An error occurred:', e.response);
  }
  const resJS = x2.xml2js(response.data);
  return resJS;
};

const getBGGUserCollection = async function (bggUserName) {
  let response;
  try {
    const url = `${bggUrl}collection?username=${bggUserName}&own=1`;
    response = await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': true
      }
    });
  } catch (e) {
    throw e;
  }
  const resJS = x2.xml2js(response.data);
  return {data: resJS, status: response.status};
};

const getBoardGameV1ByID = async function (id) {
  let response;
  try {
    const url = `${bggV1Url}boardgame/${id}?stats=1`;
    response = await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': true
      }
    });
  } catch (e) {
    console.log('An error occurred:', e.response);
  }
  // @ts-ignore
  const js = x2.xml2js(response.data);
  // @ts-ignore
  return js.boardgames.boardgame;
};

const app = express();

const cors = require('cors');

let lock = delay(2000);

app.use(cors({
  origin: 'http://localhost:4200'
}));

const que = q({activeLimit: 1, queuedLimit: -1});
app.use(que);

app.get('/bggUser/:name', async (req, res) => {
  await lock;
  const data = await getBGGUser(req.params.name);
  // always set a delay after finishing reqeust so no new requests gets processed from queue
  lock = delay(2000);
  res.send(JSON.stringify(data));
});

app.get('/bggUserCollection/:name', async (req, res) => {
  await lock;
  let data;
  try {
    data = await getBGGUserCollection(req.params.name);
  } catch (e) {
    res.status(429);
    res.send('Too many requests');
  }
  // always set a delay after finishing reqeust so no new requests gets processed from queue
  lock = delay(2000);
  res.status(data.status);
  res.send(JSON.stringify(data.data));
});



app.get('/boardgameV1/:id', async (req, res) => {
  await lock;
  const data = await getBoardGameV1ByID(req.params.id);
  // always set a delay after finishing reqeust so no new requests gets processed from queue
  lock = delay(2000);
  res.send(JSON.stringify(data));
});

app.get('/boardgame/:name&:exact', async (req, res) => {
  await lock;
  console.log(req.params.exact);
  const data = await getBoardGame(req.params.name, req.params.exact);
  // always set a delay after finishing reqeust so no new requests gets processed from queue
  lock = delay(2000);
  res.send(JSON.stringify(data));
});


app.listen(port);
