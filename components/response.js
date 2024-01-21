import { ScrollView } from 'react-native';
import { Box } from '@gluestack-ui/themed';

import JsonViewer from './jsonViewer';
import TextViewer from './textViewer';

const ResponsePage = ({ response }) => {
  const isJson = typeof response === 'object';

  if (!response) return <Box bgColor='$warmGray800' style={{ flex: 1 }} />;

  return (
    <Box bgColor='$warmGray800' style={{ flex: 1 }}>
      <ScrollView>
        {isJson ? (
          <JsonViewer jsonData={response} />
        ) : (
          <TextViewer textData={response} />
        )}
      </ScrollView>
    </Box>
  );
};

export default ResponsePage;
