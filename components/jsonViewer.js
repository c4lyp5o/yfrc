import React from 'react';
import { Text } from '@gluestack-ui/themed';

const JsonViewer = ({ jsonData }) => {
  const formatJsonText = (text) => {
    return text.split(/([\{\[\}\],:]|\s+)/).map((segment, index, array) => {
      if (['{', '[', ']', '}', ',', ':'].includes(segment)) {
        return (
          <Text
            key={index}
            selectable={true}
            fontSize={12}
            color='white'
            style={{ fontFamily: 'monospace' }}
          >
            {segment}
          </Text>
        );
      } else if (
        !isNaN(segment) &&
        array[index - 1] !== '"' &&
        array[index + 1] !== '"' &&
        array[index - 1] !== ':' &&
        array[index + 1] !== ':'
      ) {
        return (
          <Text
            key={index}
            selectable={true}
            fontSize={12}
            color='blue'
            style={{ fontFamily: 'monospace' }}
          >
            {segment}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            selectable={true}
            fontSize={12}
            color='$green500'
            style={{ fontFamily: 'monospace' }}
          >
            {segment}
          </Text>
        );
      }
    });
  };

  const stringifiedJson = JSON.stringify(jsonData, null, 2);

  return (
    <Text
      selectable={true}
      fontSize={12}
      color='$green500'
      style={{ fontFamily: 'monospace' }}
    >
      {formatJsonText(stringifiedJson)}
    </Text>
  );
};

export default JsonViewer;
