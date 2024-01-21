import React, { useState } from 'react';
import {
  Button,
  ButtonText,
  Textarea,
  TextareaInput,
  useToast,
  Toast,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed';

const JsonTextArea = ({ setBody }) => {
  const toast = useToast();
  const [jsonText, setJsonText] = useState('');

  const handleFormatPress = () => {
    try {
      const formattedJson = JSON.stringify(JSON.parse(jsonText), null, 2);
      setJsonText(formattedJson);
      setBody(formattedJson);
    } catch (error) {
      //   console.error('Invalid JSON format:', error.message);
      toast.show({
        placement: 'bottom',
        render: ({ id }) => {
          const toastId = 'toast-' + id;
          return (
            <Toast nativeID={toastId} action='info' variant='solid'>
              <VStack space='xs'>
                <ToastTitle>Invalid JSON format</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
    }
  };

  return (
    <React.Fragment>
      <Textarea w='100%' h='70%'>
        <TextareaInput
          p='$2'
          color='$green500'
          fontSize={12}
          style={{ fontFamily: 'monospace' }}
          value={jsonText}
          onChangeText={(text) => setJsonText(text)}
        />
      </Textarea>
      <Button mt='$2' onPress={handleFormatPress}>
        <ButtonText style={{ fontFamily: 'monospace' }}>Format</ButtonText>
      </Button>
    </React.Fragment>
  );
};

export default JsonTextArea;
