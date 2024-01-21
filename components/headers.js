import { ScrollView } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';

const HeadersPage = ({ responseHeaders }) => {
  return (
    <Box bgColor='$warmGray800' style={{ flex: 1 }}>
      <ScrollView>
        {Object.entries(responseHeaders).map(([key, value]) => {
          return (
            <Text
              color='white'
              fontSize={10}
              fontFamily='monospace'
              selectable={true}
              key={key}
            >
              {`${key}: ${value} \n`}
            </Text>
          );
        })}
      </ScrollView>
    </Box>
  );
};

export default HeadersPage;
