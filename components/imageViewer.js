import { Image } from '@gluestack-ui/themed';
import { useState, useEffect } from 'react';

const ImageViewer = ({ imageData }) => {
  const [base64data, setBase64Data] = useState('');

  useEffect(() => {
    fetch(imageData)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          const splitData = base64data.split(',');
          const base64dataX = `data:image/jpeg;base64,${splitData[1]}`;
          console.log(base64dataX);
          setBase64Data(base64dataX);
        };
      });
  }, [imageData]);

  return (
    <>
      <Image
        source={{
          uri: base64data,
        }}
        style={{ width: '100%', height: '100%' }}
        resizeMode='contain'
      />
    </>
  );
};

export default ImageViewer;
