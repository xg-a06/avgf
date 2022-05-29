const semver = require('semver');
const axios = require('axios');

//https://registry.npmjs.org
const getNpmInfo = (name, registry = 'https://registry.npm.taobao.org') => {
  if (!name) {
    return null;
  }
  const url = `${registry}/${name}`;
  return axios
    .get(url)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      return null;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

module.exports = {
  getNpmInfo,
};
