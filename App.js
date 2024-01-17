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
import { useState } from 'react';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Home />
    </GluestackUIProvider>
  );
}

const Home = () => {
  return <Container />;
};

const FeatureCard = ({ iconSvg: IconSvg, name, statusCode }) => {
  return (
    <Box
      flexDirection='column'
      borderWidth={1}
      borderColor='$borderDark700'
      sx={{
        _web: {
          flex: 1,
        },
      }}
      m='$2'
      p='$4'
      rounded='$md'
    >
      <Box alignItems='center' display='flex' flexDirection='row'>
        {/* <Image source={iconSvg} alt="document" width={22} height={22} /> */}
        <Text>
          <IconSvg />
        </Text>
        <Text fontSize={22} color='$white' fontWeight='500' ml='$2'>
          {name}
        </Text>
      </Box>
      <Text color='$textDark400' mt='$2'>
        {statusCode}
      </Text>
    </Box>
  );
};

const HeadersCard = ({ iconSvg: IconSvg, name, headers }) => {
  return (
    <Box
      flexDirection='column'
      borderWidth={1}
      borderColor='$borderDark700'
      sx={{
        _web: {
          flex: 1,
        },
      }}
      m='$2'
      p='$4'
      rounded='$md'
    >
      <Box alignItems='center' display='flex' flexDirection='row'>
        {/* <Image source={iconSvg} alt="document" width={22} height={22} /> */}
        <Text>
          <IconSvg />
        </Text>
        <Text fontSize={22} color='$white' fontWeight='500' ml='$2'>
          {name}
        </Text>
      </Box>
      <Text color='$textDark400' mt='$2' fontSize={8}>
        {Object.entries(headers).map(([key, value]) => {
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

const Container = () => {
  const [url, setUrl] = useState('');
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

  return (
    <Box flex={1} backgroundColor='$black'>
      <ScrollView
        style={{ height: '100%' }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Box
          position='absolute'
          sx={{
            '@base': {
              h: 500,
              w: 500,
            },
            '@lg': {
              h: 700,
              w: 700,
            },
          }}
        >
          <Gradient />
        </Box>
        <Box
          height='60%'
          sx={{
            '@base': {
              my: '$16',
              mx: '$5',
              height: '80%',
            },
            '@lg': {
              my: '$24',
              mx: '$32',
            },
          }}
          justifyContent='space-between'
          alignItems='center'
        >
          <Box
            bg='#64748B33'
            px='$6'
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
              w='90%'
              h='$10'
              marginRight='$2'
            >
              <TextareaInput
                color='$white'
                placeholder='Your url...'
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
              <ButtonText>Execute</ButtonText>
            </Button>
          </Box>
          <Box
            sx={{
              '@base': {
                flexDirection: 'column',
              },
              '@md': {
                flexDirection: 'column',
              },
            }}
          >
            <FeatureCard
              iconSvg={Rocket}
              name='Status'
              statusCode={responseStatus}
            />
            <HeadersCard
              iconSvg={DocumentData}
              name='Headers'
              headers={responseHeaders}
            />
          </Box>
          <Box
            sx={{
              '@base': {
                flexDirection: 'row',
              },
              '@md': {
                flexDirection: 'column',
              },
            }}
          >
            <Textarea
              isReadOnly={false}
              isInvalid={false}
              isDisabled={false}
              w='100%'
              h='$64'
            >
              <TextareaInput
                fontSize={10}
                style={{ fontFamily: 'monospace' }}
                color='$white'
                value={response}
              />
            </Textarea>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
