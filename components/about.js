import { useWindowDimensions } from 'react-native';
import { Box, Text, VStack, Heading } from '@gluestack-ui/themed';

const AboutPage = () => {
  const layout = useWindowDimensions();

  return (
    <Box
      p='$2'
      bgColor='$warmGray800'
      alignItems='center'
      justifyContent='center'
      style={{ flex: 1 }}
    >
      <Heading
        color='$green500'
        fontSize={20}
        mb='$4'
        style={{ fontFamily: 'monospace', textAlign: 'center' }}
      >
        Yan's Favorite REST Client 👋
      </Heading>
      <Text
        selectable={true}
        fontSize={16}
        color='$green500'
        style={{ fontFamily: 'monospace', textAlign: 'center' }}
      >
        🚀 We are a team of passionate developers dedicated to creating the best
        user experience possible. 💡 Our mission is to make software that not
        only works well, but also looks great and is easy to use.
      </Text>
    </Box>
  );
};

export default AboutPage;
