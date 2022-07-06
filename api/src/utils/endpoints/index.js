const { KEY } = process.env;

const APIKEY = `?api_key=${KEY}`;

const getDogs = `https://api.thedogapi.com/v1/breeds${APIKEY}`;

const getByName = `https://api.thedogapi.com/v1/breeds/search${APIKEY}&q=`;

module.exports = {
  getDogs,
  getByName,
};
