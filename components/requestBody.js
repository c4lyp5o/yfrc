import { useState } from 'react';
import {
  Text,
  Box,
  Button,
  ButtonText,
  Textarea,
  TextareaInput,
} from '@gluestack-ui/themed';

import { useShowToast } from '../hooks/useShowToast';

const RequestBody = ({ setBody }) => {
  const showToast = useShowToast();
  const [jsonText, setJsonText] = useState('');

  const handleTextChange = (text) => {
    setJsonText(text);
    setBody(text);
  };

  const handleFormatPress = () => {
    try {
      const formattedJson = JSON.stringify(JSON.parse(jsonText), null, 2);
      setJsonText(formattedJson);
      setBody(formattedJson);
    } catch (error) {
      showToast('Invalid JSON format');
    }
  };

  const handleClearPress = () => {
    setJsonText('');
    setBody('');
  };

  return (
    <>
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
        // justifyContent='center'
        w='100%'
        mt='$2'
        mb='$2'
      >
        <Text mr='$2' color='white' fontSize={10} fontFamily='monospace'>
          Body
        </Text>
        <Button variant='outline' size='xs' onPress={handleClearPress}>
          <ButtonText color='white'>Clear</ButtonText>
        </Button>
      </Box>
      <Box alignItems='center' justifyContent='center' w='100%' maxHeight={300}>
        <Textarea w='100%' h='80%' style={{ overflowY: 'auto' }}>
          <TextareaInput
            p='$2'
            color='white'
            fontSize={12}
            style={{ fontFamily: 'monospace' }}
            value={jsonText}
            onChangeText={(text) => handleTextChange(text)}
          />
        </Textarea>
        <Button mt='$2' variant='outline' size='xs' onPress={handleFormatPress}>
          <ButtonText color='white'>Format</ButtonText>
        </Button>
      </Box>
    </>
  );
};

export default RequestBody;
