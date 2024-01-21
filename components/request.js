import { useEffect } from 'react';
import { Box, Text, VStack, ScrollView } from '@gluestack-ui/themed';

import RequestHeaders from './requestHeaders';
import RequestQuery from './requestQuery';
import RequestBody from './requestBody';
import RequestDelete from './requestDelete';

const RequestPage = ({
  httpMethod,
  rhKeys,
  setRhKeys,
  rhValues,
  setRhValues,
  rqKeys,
  setRqKeys,
  rqValues,
  setRqValues,
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

  // request query
  const addKeyValue = () => {
    setRqKeys([...rqKeys, '']);
    setRqValues([...rqValues, '']);
  };

  const removeKeyValue = (index) => {
    setRqKeys(rqKeys.filter((_, i) => i !== index));
    setRqValues(rqValues.filter((_, i) => i !== index));
  };

  const updateKeys = (index, url) => {
    const newKeys = [...rqKeys];
    newKeys[index] = url;
    setRqKeys(newKeys);
  };

  const updateValues = (index, tag) => {
    const newValues = [...rqValues];
    newValues[index] = tag;
    setRqValues(newValues);
  };

  const clearKeys = () => {
    setRqKeys(['']);
    setRqValues(['']);
  };

  useEffect(() => {
    setRqKeys(['']);
    setRqValues(['']);
    setBody('');
  }, [httpMethod]);

  return (
    <Box display='flex' bgColor='$warmGray800'>
      <VStack space={4} alignItems='center' h='100%'>
        <ScrollView
          w='100%'
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingRight: 4,
            paddingLeft: 4,
          }}
        >
          <RequestHeaders
            rhKeys={rhKeys}
            rhValues={rhValues}
            addRhKeyValue={addRhKeyValue}
            removeRhKeyValue={removeRhKeyValue}
            updateRhKeys={updateRhKeys}
            updateRhValues={updateRhValues}
            clearRhKeys={clearRhKeys}
          />
          {httpMethod === 'GET' && (
            <RequestQuery
              rqKeys={rqKeys}
              rqValues={rqValues}
              updateKeys={updateKeys}
              updateValues={updateValues}
              removeKeyValue={removeKeyValue}
              addKeyValue={addKeyValue}
              clearKeys={clearKeys}
            />
          )}
          {(httpMethod === 'POST' ||
            httpMethod === 'PUT' ||
            httpMethod === 'PATCH') && (
            <RequestBody body={body} setBody={setBody} />
          )}
          {httpMethod === 'DELETE' && <RequestDelete />}
        </ScrollView>
      </VStack>
    </Box>
  );
};

export default RequestPage;
