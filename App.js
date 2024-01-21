import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { config } from '@gluestack-ui/config';
import {
  GluestackUIProvider,
  Box,
  Text,
  Button,
  ButtonText,
  ButtonSpinner,
  Input,
  InputField,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  Icon,
  ChevronDownIcon,
  VStack,
  useToast,
  Toast,
  ToastDescription,
  ToastTitle,
} from '@gluestack-ui/themed';

import {
  httpMethodSelect,
  httpProtocolSelect,
  predefinedBrowserHeaders,
} from './helpers/constants';

import RequestPage from './components/request';
import ResponsePage from './components/response';
import HeadersPage from './components/headers';
import AboutPage from './components/about';

function Container() {
  const insets = useSafeAreaInsets();
  const toast = useToast();

  // default request headers
  const yfrcHeaders = predefinedBrowserHeaders['YFRC'];

  // url
  const [url, setUrl] = useState('api.waktusolat.me/waktusolat/today/kdh01');

  // request
  const [rhKeys, setRhKeys] = useState(yfrcHeaders.map((h) => h.key));
  const [rhValues, setRhValues] = useState(yfrcHeaders.map((h) => h.value));
  const [theKeys, setTheKeys] = useState(['']);
  const [theValues, setTheValues] = useState(['']);
  const [body, setBody] = useState('');

  // api call
  const [httpMethod, setHttpMethod] = useState('GET');
  const [httpProtocol, setHttpProtocol] = useState('HTTPS');
  const [responseStatus, setResponseStatus] = useState(0);
  const [responseHeaders, setResponseHeaders] = useState({});
  const [response, setResponse] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const setHttpMethodSelect = (value) => {
    setHttpMethod(value);
  };

  const setHttpProtocolSelect = (label) => {
    setHttpProtocol(label);
  };

  const resetResponse = () => {
    setResponseStatus(0);
    setResponseHeaders({});
    setResponse('');
  };

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  const executeCall = () => {
    if (url === '') {
      return;
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
          throw new Error('Invalid URL');
        }

        toast.show({
          placement: 'bottom',
          render: ({ id }) => {
            const toastId = 'toast-' + id;
            return (
              <Toast nativeID={toastId} action='info' variant='solid'>
                <VStack space='xs'>
                  <ToastTitle>Running...</ToastTitle>
                </VStack>
              </Toast>
            );
          },
        });

        let response;

        // process headers
        const headers = {};
        for (let i = 0; i < rhKeys.length; i++) {
          if (rhKeys[i] !== '') {
            headers[rhKeys[i]] = rhValues[i];
          }
        }

        switch (httpMethod) {
          case 'GET':
            let query = '';
            for (let i = 0; i < theKeys.length; i++) {
              if (theKeys[i] !== '') {
                query += `${theKeys[i]}=${theValues[i]}&`;
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
                'Content-Type': 'application/json',
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

        if (contentType && contentType.indexOf('application/json') !== -1) {
          const json = await response.json();
          setResponse(json);
        } else {
          const text = await response.text();
          setResponse(text);
        }
      } catch (err) {
        console.log(err);
        setResponse(JSON.stringify(err, null, 2));
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
            <Select
              mr='$2'
              w='35%'
              onValueChange={(value) => setHttpMethodSelect(value)}
            >
              <SelectTrigger variant='outline' size='sm'>
                <SelectInput value={httpMethod} />
                <SelectIcon mr='$3'>
                  <Icon as={ChevronDownIcon} />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {httpMethodSelect.map((item) => (
                    <SelectItem
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
            <Select
              w='30%'
              onValueChange={(label) => setHttpProtocolSelect(label)}
            >
              <SelectTrigger variant='outline' size='sm'>
                <SelectInput value={httpProtocol} />
                <SelectIcon mr='$3'>
                  <Icon as={ChevronDownIcon} />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {httpProtocolSelect.map((item) => (
                    <SelectItem
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </Box>
          <Box flexDirection='row' alignItems='center' w='100%' px='$2'>
            <Input
              variant='outline'
              size='sm'
              h='$10'
              w='85%'
              marginRight='$2'
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                style={{ fontFamily: 'monospace' }}
                fontSize={12}
                value={url}
                onChangeText={(text) => setUrl(text.toLocaleLowerCase())}
              />
              {url ? (
                <Button
                  onPress={() => setUrl('')}
                  size='sm'
                  variant='outline'
                  w='15%'
                  h='100%'
                  action='primary'
                >
                  <ButtonText size='sm' color='$black'>
                    X
                  </ButtonText>
                </Button>
              ) : null}
            </Input>
            <Button
              size='sm'
              w='12%'
              variant='solid'
              action='primary'
              isDisabled={isExecuting}
              isFocusVisible={false}
              onPress={executeCall}
            >
              {isExecuting ? (
                <ButtonSpinner size='small' />
              ) : (
                <ButtonText>&gt;</ButtonText>
              )}
            </Button>
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
                theKeys={theKeys}
                theValues={theValues}
                setTheKeys={setTheKeys}
                setTheValues={setTheValues}
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
