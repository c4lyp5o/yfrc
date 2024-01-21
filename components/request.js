import { useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  Heading,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';

import RequestHeaders from './requestHeaders';
import KeyValueInput from './keyValueInput';
import JsonTextArea from './jsonTextArea';

const RequestPage = ({
  httpMethod,
  rhKeys,
  setRhKeys,
  rhValues,
  setRhValues,
  theKeys,
  setTheKeys,
  theValues,
  setTheValues,
  body,
  setBody,
}) => {
  // request headers
  const addRhKeyValue = () => {
    setRhKeys([...rhKeys, '']);
    setRhValues([...rhValues, '']);
  };

  const removeRhKeyValue = (index) => {
    setRhKeys(rhKeys.filter((_, i) => i !== index));
    setRhValues(rhValues.filter((_, i) => i !== index));
  };

  const updateRhKeys = (index, url) => {
    const newRhKeys = [...rhKeys];
    newRhKeys[index] = url;
    setRhKeys(newRhKeys);
  };

  const updateRhValues = (index, tag) => {
    const newRhValues = [...rhValues];
    newRhValues[index] = tag;
    setRhValues(newRhValues);
  };

  const clearRhKeys = () => {
    setRhKeys(['']);
    setRhValues(['']);
  };

  // request
  const addKeyValue = () => {
    setTheKeys([...theKeys, '']);
    setTheValues([...theValues, '']);
  };

  const removeKeyValue = (index) => {
    setTheKeys(theKeys.filter((_, i) => i !== index));
    setTheValues(theValues.filter((_, i) => i !== index));
  };

  const updateKeys = (index, url) => {
    const newKeys = [...theKeys];
    newKeys[index] = url;
    setTheKeys(newKeys);
  };

  const updateValues = (index, tag) => {
    const newValues = [...theValues];
    newValues[index] = tag;
    setTheValues(newValues);
  };

  const clearKeys = () => {
    setTheKeys(['']);
    setTheValues(['']);
  };

  useEffect(() => {
    setTheKeys(['']);
    setTheValues(['']);
    setBody('');
  }, [httpMethod]);

  return (
    <Box bgColor='$warmGray800' style={{ flex: 1 }}>
      <VStack space={4} alignItems='center'>
        <>
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            justifyContent='center'
            w='100%'
            mb='$4'
            mt='$4'
          >
            <Text
              mr='$2'
              color='$green500'
              fontSize={10}
              style={{ fontFamily: 'monospace' }}
            >
              Req headers
            </Text>
            <Button bgColor='$green500' size='sm' onPress={clearRhKeys}>
              <ButtonText color='$warmGray800'>Clear</ButtonText>
            </Button>
          </Box>
          {rhKeys.map((rhKey, index) => {
            return (
              <KeyValueInput
                key={index}
                theKeys={rhKeys}
                theKey={rhKey}
                theValue={rhValues[index]}
                updateRhKeys={updateRhKeys}
                updateRhValues={updateRhValues}
                removeRhKeyValue={removeRhKeyValue}
                addRhKeyValue={addRhKeyValue}
                index={index}
              />
            );
          })}
        </>
        {httpMethod === 'GET' && (
          <>
            <Box
              display='flex'
              flexDirection='row'
              alignItems='center'
              justifyContent='center'
              w='100%'
              mb='$4'
            >
              <Text
                mr='$2'
                color='$green500'
                fontSize={10}
                style={{ fontFamily: 'monospace' }}
              >
                Req query
              </Text>
              <Button bgColor='$green500' size='sm' onPress={clearKeys}>
                <ButtonText color='$warmGray800'>Clear</ButtonText>
              </Button>
            </Box>
            {theKeys.map((theKey, index) => {
              return (
                <KeyValueInput
                  key={index}
                  theKeys={theKeys}
                  theKey={theKey}
                  theValue={theValues[index]}
                  updateKeys={updateKeys}
                  updateValues={updateValues}
                  removeKeyValue={removeKeyValue}
                  addKeyValue={addKeyValue}
                  index={index}
                />
              );
            })}
          </>
        )}
        {(httpMethod === 'POST' ||
          httpMethod === 'PUT' ||
          httpMethod === 'PATCH') && (
          <JsonTextArea body={body} setBody={setBody} />
        )}
        {httpMethod === 'DELETE' && (
          <Text
            color='$green500'
            fontSize={16}
            style={{ fontFamily: 'monospace' }}
          >
            No additional input required for DELETE request
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default RequestPage;
