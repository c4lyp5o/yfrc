import { ScrollView } from 'react-native';
import { Box } from '@gluestack-ui/themed';

import JsonViewer from './jsonViewer';
import TextViewer from './textViewer';
// import ImageViewer from './imageViewer';

const ResponsePage = ({ response }) => {
  const isJson = typeof response === 'object';
  const isText = typeof response === 'string';
  // const isImage = /^(ftp|http|https):\/\/[^ "]+$/.test(response);

  if (!response) return <Box bgColor='$warmGray800' style={{ flex: 1 }} />;

  return (
    <Box bgColor='$warmGray800' style={{ flex: 1 }}>
      <ScrollView>
        {isJson && <JsonViewer jsonData={response} />}
        {isText && <TextViewer textData={response} />}
        {/* {isImage && <ImageViewer imageData={response} />} */}
      </ScrollView>
    </Box>
  );
};

export default ResponsePage;
