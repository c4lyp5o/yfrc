import { useState, useEffect } from 'react';

function useFetch() {
  const [url, setUrl] = useState('');
  const [httpMethod, setHttpMethod] = useState('GET');
  const [httpProtocol, setHttpProtocol] = useState('HTTPS');
  const [responseStatus, setResponseStatus] = useState(0);
  const [responseHeaders, setResponseHeaders] = useState({});
  const [response, setResponse] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  const executeCall = async () => {
    if (url === '') {
      return;
    }

    try {
      setIsExecuting(true);
      setResponseStatus(0);
      setResponseHeaders({});
      setResponse('');

      const selectedProtocol = httpProtocolSelect.find(
        (protocol) => protocol.value === httpProtocol
      );
      const realUrl = selectedProtocol.trueValue + url;

      if (!isValidUrl(realUrl)) {
        throw new Error('Invalid URL');
      }

      const response = await fetch(realUrl);
      for (const [key, value] of response.headers) {
        setResponseHeaders((prev) => ({ ...prev, [key]: value }));
      }
      setResponseStatus(response.status);
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const json = await response.json();
        setResponse(JSON.stringify(json, null, 2));
      } else {
        const text = await response.text();
        setResponse(text);
      }
    } catch (err) {
      setResponse('An error occurred: ' + err.message);
    } finally {
      setIsExecuting(false);
    }
  };

  useEffect(() => {
    executeCall();
  }, [url, httpProtocol]);

  return {
    response,
    responseStatus,
    responseHeaders,
    executeCall,
    isExecuting,
    setUrl,
    setHttpMethod,
    setHttpProtocol,
  };
}

export default useFetch;
