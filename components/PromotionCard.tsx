import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';
import Colors from '../constants/Colors';

interface PromotionCardProps {
  title: string;
  subtitle: string;
  description: string;
  SvgImage: React.FC<SvgProps>;
  onPress: () => void;
  buttonText: string;
}

export default function PromotionCard({
  title,
  subtitle,
  description,
  SvgImage,
  onPress,
  buttonText
}: PromotionCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <SvgImage width={140} height={140} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    paddingBottom: 0,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 0,
    width: '100%',
    height: 150,
    backgroundColor: Colors.light.gray,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  textContainer: {
    flex: 3,
    justifyContent: 'space-between',
    height: '100%',
  },
  imageContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: '100%',
    position: 'relative',
    bottom: -10,
    right: 0,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.light.secondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.secondary,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: Colors.light.darkGray,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#152744',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 14
  },
  buttonText: {
    color: Colors.light.white,
    fontSize: 12,
    fontWeight: '600',
  }
});