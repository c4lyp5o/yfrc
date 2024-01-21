import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, Box, Text, VStack } from '@gluestack-ui/themed';

import {
  httpProtocolSelect,
  predefinedBrowserHeaders,
  methodsWithBody,
} from './helpers/constants';

import RequestPage from './components/request';
import ResponsePage from './components/response';
import HeadersPage from './components/headers';
import AboutPage from './components/about';

import UrlInput from './components/urlInput';
import HttpMethodSelect from './components/httpMethodSelect';
import HttpProtocolSelect from './components/httpProtocolSelect';

import { useShowToast } from './hooks/useShowToast';

function Container() {
  const insets = useSafeAreaInsets();
  const showToast = useShowToast();

  // default request headers
  const yfrcHeaders = predefinedBrowserHeaders['YFRC'];

  // url
  const [url, setUrl] = useState('api.waktusolat.me/waktusolat/today/kdh01');

  // request
  const [rhKeys, setRhKeys] = useState(yfrcHeaders.map((h) => h.key));
  const [rhValues, setRhValues] = useState(yfrcHeaders.map((h) => h.value));
  const [rqKeys, setRqKeys] = useState(['']);
  const [rqValues, setRqValues] = useState(['']);
  const [body, setBody] = useState('');

  // api call
  const [httpMethod, setHttpMethod] = useState('GET');
  const [httpProtocol, setHttpProtocol] = useState('HTTPS');
  const [responseStatus, setResponseStatus] = useState(0);
  const [responseHeaders, setResponseHeaders] = useState({});
  const [response, setResponse] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleUrlChange = (value) => {
    setUrl(value.toLowerCase());
  };

  const resetResponse = () => {
    setResponseStatus(0);
    setResponseHeaders({});
    setResponse('');
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const executeCall = () => {
    if (url === '') {
      showToast('URL is empty');
    }

    async function fetchData() {
      try {
        setIsExecuting(true);
        resetResponse();

        const selectedProtocol = httpProtocolSelect.find(
          (protocol) => protocol.value === httpProtocol
        );
        let realUrl = selectedProtocol.trueValue + url;

        if (!isValidUrl(realUrl)) {
          return showToast('Invalid URL');
        }

        if (methodsWithBody.includes(httpMethod)) {
          if (body === '') {
            showToast('Body is empty');
          } else {
            try {
              JSON.parse(body);
            } catch (err) {
              return showToast('Invalid JSON body');
            }
          }
        }

        showToast('Fetching data...');

        let response;

        const headers = {};
        for (let i = 0; i < rhKeys.length; i++) {
          if (rhKeys[i] !== '') {
            headers[rhKeys[i]] = rhValues[i];
          }
        }

        switch (httpMethod) {
          case 'GET':
            let query = '';
            for (let i = 0; i < rqKeys.length; i++) {
              if (rqKeys[i] !== '') {
                query += `${rqKeys[i]}=${rqValues[i]}&`;
              }
            }
            if (query !== '') {
              query = '?' + query.slice(0, -1);
            }
            realUrl += query;
            response = await fetch(realUrl, {
              method: 'GET',
              headers: {
                ...headers,
              },
            });
            break;
          case 'POST':
          case 'PUT':
          case 'PATCH':
          case 'HEAD':
          case 'OPTIONS':
          case 'TRACE':
          case 'CONNECT':
            response = await fetch(realUrl, {
              method: `${httpMethod}`,
              headers: {
                ...headers,
              },
              body: JSON.stringify(body),
            });
            break;
          case 'DELETE':
            response = await fetch(realUrl, {
              method: 'DELETE',
              headers: {
                ...headers,
              },
            });
            break;
          default:
            break;
        }

        for (const [key, value] of response.headers) {
          setResponseHeaders((prev) => ({ ...prev, [key]: value }));
        }

        setResponseStatus(response.status);

        const contentType = response.headers.get('content-type');

        switch (true) {
          case contentType && contentType.includes('application/json'):
            const json = await response.json();
            setResponse(json);
            break;
          case contentType && contentType.startsWith('image/'):
            setResponse(realUrl);
            break;
          case contentType && contentType.includes('text/'):
            const text = await response.text();
            setResponse(text);
            break;
          default:
            setResponse('Response is neither JSON, text nor image');
        }
      } catch (err) {
        console.log(err);
        setResponse(JSON.stringify(err));
      } finally {
        setIsExecuting(false);
      }
    }

    fetchData();
  };

  return (
    <>
      <Box bg='white' style={{ paddingTop: insets.top }} />
      <Box h='94%' bg='white'>
        <VStack space='sm' reversed={false} mb='$2'>
          <Box flexDirection='row' alignItems='center' w='100%' px='$2'>
            <HttpMethodSelect
              httpMethod={httpMethod}
              setHttpMethod={setHttpMethod}
            />
            <HttpProtocolSelect
              httpProtocol={httpProtocol}
              setHttpProtocol={setHttpProtocol}
            />
          </Box>
          <Box flexDirection='row' alignItems='center' w='100%' px='$2'>
            <UrlInput
              url={url}
              setUrl={handleUrlChange}
              executeCall={executeCall}
              isExecuting={isExecuting}
            />
          </Box>
        </VStack>
        <Tab.Navigator initialRouteName='Res'>
          <Tab.Screen
            name='Req'
            children={() => (
              <RequestPage
                httpMethod={httpMethod}
                rhKeys={rhKeys}
                rhValues={rhValues}
                setRhKeys={setRhKeys}
                setRhValues={setRhValues}
                rqKeys={rqKeys}
                rqValues={rqValues}
                setRqKeys={setRqKeys}
                setRqValues={setRqValues}
                body={body}
                setBody={setBody}
              />
            )}
          />
          <Tab.Screen
            name='Res'
            children={() => <ResponsePage response={response} />}
            options={{
              tabBarBadge: () => (
                <Box
                  py='$1'
                  sx={{
                    '@base': {
                      flexDirection: 'row',
                    },
                    '@sm': {
                      flexDirection: 'row',
                    },
                    '@md': { alignSelf: 'flex-start' },
                  }}
                >
                  <Text
                    size='2xs'
                    px='$1'
                    // marginRight='$1'
                    bg={
                      responseStatus >= 500
                        ? '#ff0000' // red
                        : responseStatus >= 400
                        ? '#ffa500' // orange
                        : responseStatus >= 200 && responseStatus < 300
                        ? '#008000' // green
                        : responseStatus > 0
                        ? '#808080' // gray
                        : 'transparent' // no color for other status codes
                    }
                    color='white'
                    rounded='$md'
                  >
                    {responseStatus > 0 && responseStatus}
                  </Text>
                </Box>
              ),
            }}
          />
          <Tab.Screen
            name='Hdrs'
            children={() => <HeadersPage responseHeaders={responseHeaders} />}
          />
          <Tab.Screen name='?' component={AboutPage} />
        </Tab.Navigator>
      </Box>
      <Box style={{ paddingBottom: insets.bottom }} />
    </>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <GluestackUIProvider config={config}>
          <Stack.Navigator>
            <Stack.Screen
              name='Root'
              options={{
                headerShown: false,
              }}
            >
              {() => <Container />}
            </Stack.Screen>
          </Stack.Navigator>
        </GluestackUIProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
