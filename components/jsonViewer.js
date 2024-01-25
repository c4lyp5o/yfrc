import { Text } from '@gluestack-ui/themed';

const JsonViewer = ({ jsonData }) => {
  const formatJsonText = (text) => {
    return text.split(/([\{\[\}\],:]|\s+)/).map((segment, index, array) => {
      if (['{', '[', ']', '}', ',', ':'].includes(segment)) {
        return (
          <Text
            key={index}
            selectable={true}
            fontSize={10}
            fontFamily='monospace'
            color='white'
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
            fontSize={10}
            fontFamily='monospace'
            color='$blue400'
          >
            {segment}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            selectable={true}
            fontSize={10}
            fontFamily='monospace'
            color='$green500'
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
      fontSize={10}
      fontFamily='monospace'
      color='$green500'
    >
      {formatJsonText(stringifiedJson)}
    </Text>
  );
};

export default JsonViewer;
