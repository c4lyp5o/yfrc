import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabView, SceneMap, TabBarItem } from 'react-native-tab-view';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { config } from '@gluestack-ui/config';
import {
  Box,
  GluestackUIProvider,
  Text,
  Button,
  ButtonText,
  Textarea,
  TextareaInput,
} from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';
import Gradient from './assets/Icons/Gradient';
import DocumentData from './assets/Icons/DocumentData';
import LightBulbPerson from './assets/Icons/LightbulbPerson';
import Rocket from './assets/Icons/Rocket';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Screen } from 'react-native-screens';

function Demo() {
  const layout = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [url, setUrl] = useState(
    'https://api.waktusolat.me/waktusolat/today/kdh01'
  );
  const [responseStatus, setResponseStatus] = useState(0);
  const [responseHeaders, setResponseHeaders] = useState({});
  const [response, setResponse] = useState('');

  const executeCall = () => {
    if (url === '') {
      console.log('no url');
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setUrl('https://' + url);
    }

    async function fetchData() {
      setResponse('');
      setResponseHeaders({});
      try {
        const response = await fetch(url);
        for (const [key, value] of response.headers) {
          console.log(key, value);
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
        setResponse(err);
      }
    }

    fetchData();
  };

  const FirstRoute = () => {
    return (
      <Box>
        <Text>First Route</Text>
      </Box>
    );
  };

  const SecondRoute = () => {
    return (
      <Box h={layout.height} bgColor='$warmGray800'>
        <Text
          selectable={true}
          fontSize={12}
          color='$green500'
          style={{ fontFamily: 'monospace' }}
        >
          {response}
        </Text>
      </Box>
    );
  };

  const ThirdRoute = () => {
    return (
      <Box h={layout.height} bgColor='$warmGray800'>
        <Text
          selectable={true}
          fontSize={12}
          color='$green500'
          style={{ fontFamily: 'monospace' }}
        >
          {Object.entries(responseHeaders).map(([key, value]) => {
            return (
              <Text color='$textDark400' fontSize={8} key={key}>
                {`${key}: ${value} \n`}
              </Text>
            );
          })}
        </Text>
      </Box>
    );
  };

  return (
    <>
      <Box style={{ paddingTop: insets.top }} />
      <Box
        px='$6'
        paddingBottom='$2'
        alignItems='center'
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
        <Textarea
          size='sm'
          isReadOnly={false}
          isInvalid={false}
          isDisabled={false}
          w='80%'
          h='$10'
          marginRight='$2'
        >
          <TextareaInput
            value={url}
            style={{
              fontFamily: 'monospace',
              fontSize: 11,
              width: '100%',
              overflow: 'hidden',
            }}
            onChangeText={(text) => setUrl(text.toLocaleLowerCase())}
          />
        </Textarea>
        <Button
          size='md'
          variant='solid'
          action='primary'
          isDisabled={false}
          isFocusVisible={false}
          onPress={executeCall}
        >
          <ButtonText>&gt;</ButtonText>
        </Button>
      </Box>
      <Tab.Navigator initialRouteName='Response'>
        <Tab.Screen name='Home' component={FirstRoute} />
        <Tab.Screen
          name='Response'
          component={SecondRoute}
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
                  px='$2'
                  marginRight='$1'
                  bg='$green400'
                  rounded='$md'
                >
                  3
                </Text>
              </Box>
            ),
          }}
        />
        <Tab.Screen name='Headers' component={ThirdRoute} />
      </Tab.Navigator>
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
              {() => <Demo />}
            </Stack.Screen>
          </Stack.Navigator>
        </GluestackUIProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
