import { Text, Box } from '@gluestack-ui/themed';

const RequestDelete = () => {
  return (
    <Box w='100%' mt='$2'>
      <Text color='$green500' fontSize={16} style={{ fontFamily: 'monospace' }}>
        No additional input required for DELETE request
      </Text>
    </Box>
  );
};

export default RequestDelete;
