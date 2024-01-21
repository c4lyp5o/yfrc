import { Box, Text, Heading } from '@gluestack-ui/themed';

const AboutPage = () => {
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
        fontFamily='monospace'
        textAlign='center'
        mb='$4'
      >
        Yan's Favorite REST Client
      </Heading>
      <Text
        selectable={true}
        fontSize={16}
        fontFamily='monospace'
        textAlign='center'
        color='$green500'
      >
        YFRC
      </Text>
    </Box>
  );
};

export default AboutPage;
