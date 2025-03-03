import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import Colors from '../constants/Colors';

interface OnboardingItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    SvgImage: React.FC<SvgProps>;
  };
  width: number;
}

export default function OnboardingItem({ item, width }: OnboardingItemProps) {
  const { SvgImage } = item;

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.imageContainer}>
        <SvgImage width={width * 0.8} height={300} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxHeight: 300,
  },
  content: {
    flex: 0.4,
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
});