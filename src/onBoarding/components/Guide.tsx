import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Guide: React.FC = ({ Pagination, text, image, textStyle, boldTextStyle }) => {
  const formatText = (text: string) => {
    const [text1, notFormatted] = text.split('<b>');
    const [boldText, text2] = notFormatted.split('</b>');

    return (
      <>
        {text1}
        <Text style={{ ...styles.boldText, ...boldTextStyle }}>{boldText}</Text>
        {text2}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.text,
          ...textStyle,
        }}>
        {formatText(text)}
      </Text>
      <View style={styles.paginationContainer}>{Pagination}</View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
      </View>
    </View>
  );
};

export default Guide;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    marginTop: '22%',
    color: 'white',
    fontWeight: '400',
    fontSize: 24,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: '700',
  },
  paginationContainer: {
    height: 50,
  },
  imageContainer: {
    height: 500,
    width: 250,
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
