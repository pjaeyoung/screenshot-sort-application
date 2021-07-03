import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { guides } from '../constants';
import Guide from './Guide';

const Slider: React.FC = () => {
  const carousel = useRef(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const renderPagenation = () => {
    return (
      <Pagination
        dotsLength={3}
        containerStyle={{
          paddingTop: 20,
          paddingBottom: 20,
        }}
        activeDotIndex={currentStep}
        dotStyle={{
          width: 12,
          height: 12,
          marginHorizontal: 2,
          borderRadius: 10,
          backgroundColor: '#BCE0FD',
        }}
        inactiveDotOpacity={0.3}
        inactiveDotScale={1}
      />
    );
  };

  const renderItem = ({ item, index }) => {
    let textStyle, boldTextStyle;

    if (index === 1 || index === 2) {
      textStyle = {
        fontSize: 17,
      };
      boldTextStyle = {
        fontSize: 24,
      };
    }

    return (
      <Guide
        {...item}
        Pagination={currentStep === index && renderPagenation()}
        textStyle={textStyle}
        boldTextStyle={boldTextStyle}
      />
    );
  };

  const onSnapToItem = (slideIndex: number) => {
    setCurrentStep(slideIndex);
  };

  useEffect(function initializeCurrentStep() {
    const carouselEl = carousel.current;
    if (carouselEl) {
      setCurrentStep(carouselEl.currentIndex);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Carousel
        ref={carousel}
        data={guides}
        useScrollView={true}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.7}
        renderItem={renderItem}
        onSnapToItem={onSnapToItem}
      />
    </View>
  );
};

export default Slider;

const commonDotStyle = {
  width: 12,
  height: 12,
  marginHorizontal: 8,
};

const styles = StyleSheet.create({
  container: {},
});
