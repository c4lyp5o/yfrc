const httpMethodSelect = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' },
  { label: 'PUT', value: 'PUT' },
  { label: 'DELETE', value: 'DELETE' },
  { label: 'PATCH', value: 'PATCH' },
  //   { label: 'HEAD', value: 'HEAD' },
  //   { label: 'OPTIONS', value: 'OPTIONS' },
  //   { label: 'TRACE', value: 'TRACE' },
  //   { label: 'CONNECT', value: 'CONNECT' },
];

const httpProtocolSelect = [
  { label: 'HTTP', value: 'HTTP', trueValue: 'http://' },
  { label: 'HTTPS', value: 'HTTPS', trueValue: 'https://' },
];

const errorResponseMessage = "Error: Couldn't fetch data";

const methodsWithBody = [
  'POST',
  'PUT',
  'PATCH',
  'HEAD',
  'OPTIONS',
  'TRACE',
  'CONNECT',
];

const predefinedBrowserHeaders = {
  YFRC: [
    {
      key: 'Accept',
      value: 'application/json, text/plain, */*',
    },
    {
      key: 'User-Agent',
      value: 'YFRC/1.0',
    },
  ],
  Chrome: [
    {
      key: 'Accept',
      value:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    },
    {
      key: 'Accept-Encoding',
      value: 'gzip, deflate, br',
    },
    {
      key: 'Accept-Language',
      value: 'en-US,en;q=0.9',
    },
    {
      key: 'User-Agent',
      value:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537',
    },
  ],
  Firefox: [
    {
      key: 'Accept',
      value: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
    {
      key: 'Accept-Encoding',
      value: 'gzip, deflate, br',
    },
    {
      key: 'Accept-Language',
      value: 'en-US,en;q=0.5',
    },
    {
      key: 'User-Agent',
      value:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0',
    },
  ],
  Safari: [
    {
      key: 'Accept',
      value: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
    {
      key: 'Accept-Encoding',
      value: 'gzip, deflate',
    },
    {
      key: 'Accept-Language',
      value: 'en-us',
    },
    {
      key: 'User-Agent',
      value:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0.1 Safari/602.2.14',
    },
  ],
  Android: [
    {
      key: 'Accept',
      value: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
    {
      key: 'Accept-Encoding',
      value: 'gzip, deflate',
    },
    {
      key: 'Accept-Language',
      value: 'en-US,en;q=0.5',
    },
    {
      key: 'User-Agent',
      value: 'Mozilla/5.0 (Android; Mobile; rv:40.0) Gecko/40.0 Firefox/40.0',
    },
  ],
  iOS: [
    {
      key: 'Accept',
      value: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
    {
      key: 'Accept-Encoding',
      value: 'gzip, deflate',
    },
    {
      key: 'Accept-Language',
      value: 'en-us',
    },
    {
      key: 'User-Agent',
      value:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
    },
  ],
};

export {
  httpMethodSelect,
  httpProtocolSelect,
  errorResponseMessage,
  methodsWithBody,
  predefinedBrowserHeaders,
};
