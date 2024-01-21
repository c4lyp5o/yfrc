import React, { useState } from 'react';
import {
  Box,
  InputField,
  Button,
  Input,
  ButtonText,
} from '@gluestack-ui/themed';

const RequestHeaders = () => {
  const [headers, setHeaders] = useState([]);
  const [headerName, setHeaderName] = useState('');
  const [headerValue, setHeaderValue] = useState('');

  const handleAddHeader = () => {
    setHeaders([...headers, { name: headerName, value: headerValue }]);
    setHeaderName('');
    setHeaderValue('');
  };

  return (
    <Box>
      {headers.map((header, index) => (
        <Box key={index}>
          <InputField value={header.name} disabled />
          <InputField value={header.value} disabled />
        </Box>
      ))}
      <Input>
        <InputField
          value={headerName}
          onChange={(e) => setHeaderName(e.target.value)}
          placeholder='Header Name'
        />
      </Input>
      <Input>
        <InputField
          value={headerValue}
          onChange={(e) => setHeaderValue(e.target.value)}
          placeholder='Header Value'
        />
      </Input>
      <Button onPress={handleAddHeader}>
        <ButtonText>Add Header</ButtonText>
      </Button>
    </Box>
  );
};

export default RequestHeaders;
