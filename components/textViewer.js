import React from 'react';
import { Text } from '@gluestack-ui/themed';

const TextViewer = ({ textData }) => {
  const formatText = (text) => {
    return text.split(/(\n|\r)/).map((segment, index) => {
      return (
        <Text key={index} selectable={true} fontSize={10} color='$white'>
          {segment}
        </Text>
      );
    });
  };

  if (!textData)
    return (
      <Text
        selectable={true}
        fontSize={10}
        fontFamily='monospace'
        color='white'
      >
        No response data
      </Text>
    );

  return (
    <Text selectable={true} fontSize={10} fontFamily='monospace' color='white'>
      {formatText(textData)}
    </Text>
  );
};

export default TextViewer;
