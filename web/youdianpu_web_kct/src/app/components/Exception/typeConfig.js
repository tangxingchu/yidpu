const svg403 = require('./403.svg');
const svg404 = require('./404.svg');
const svg500 = require('./500.svg');
const config = {
  403: {
    img: svg403,
    title: '403',
    desc: '抱歉，您无权访问该功能界面',
  },
  404: {
    img: svg404,
    title: '404',
    desc: '抱歉，您访问的功能界面不存在',
  },
  500: {
    img: svg500,
    title: '500',
    desc: '抱歉，服务器出错了',
  },
};

export default config;
