import React, { useState, useRef } from 'react';
import { StyleSheet, View, FlatList, Animated, ViewToken, useWindowDimensions, Text, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import Paginator from '../components/Paginator';
import Button from '../components/Button';
import Colors from '../constants/Colors';

// Import SVG files
import OnboardingImage1 from '../assets/images/onboarding_image1.svg';
import OnboardingImage2 from '../assets/images/onboarding_image2.svg';
import OnboardingImage3 from '../assets/images/onboarding_image3.svg';

const slides = [
  {
    id: '1',
    title: 'Schedule Your First HouseSkiper Session',
    description: 'Ready to experience the magic of a spotless home? Use our user-friendly scheduling tool to set up your first HouseSkiper cleaning session. Pick a date and time that suits you, and leave the rest to us.',
    SvgImage: OnboardingImage1,
  },
  {
    id: '2',
    title: 'Welcome to HouseSkiper',
    description: 'We\'re thrilled to welcome you to HouseSkiper, your go-to solution for a cleaner, more comfortable home. Let\'s get started on personalizing your cleaning experience.',
    SvgImage: OnboardingImage2,
  },
  {
    id: '3',
    title: 'Enjoy a Welcome Bonus',
    description: 'As a token of our appreciation, enjoy a special welcome bonus on your first HouseSkiper cleaning.',
    SvgImage: OnboardingImage3,
  },
];

export default function Onboarding() {
  const { width, height } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace('/auth/login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flatlistContainer}>
        <FlatList
          data={slides}
          renderItem={({ item }) => {
            const SvgImage = item.SvgImage;
            return (
              <View style={[styles.itemContainer, { width }]}>
                <View style={styles.topSpacer} />
                
                <View style={[styles.imageWrapper, { width }]}>
                  <SvgImage width={width} height={height * 0.35} />
                </View>
                <View style={[styles.content, { width }]}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Paginator data={slides} scrollX={scrollX} />
        <Button
          title={currentIndex === slides.length - 1 ? "Get started" : "Next"}
          onPress={scrollTo}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  flatlistContainer: {
    flex: 3,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topSpacer: {
    height: 80, // Add space at the top to push content down
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 16,
    color: Colors.light.secondary,
    textAlign: 'center',
  },
  description: {
    fontWeight: '400',
    color: Colors.light.darkGray,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 40,
    width: '100%',
  },
  button: {
    width: '100%',
    marginBottom: 20,
  },
});