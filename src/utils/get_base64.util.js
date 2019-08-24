import axios from 'axios';
// eslint-disable-next-line global-require
global.Buffer = global.Buffer || require('buffer').Buffer;

export const getBase64 = url => {
  return axios
    .get(url, {
      responseType: 'arraybuffer',
    })
    .then(response => {
      const buffer = Buffer.from(response.data, 'base64').toString('base64');
      return `data:text/plain;base64,${buffer}`;
    })
    .catch(err => {
      throw new Error(err.message);
    });
};
