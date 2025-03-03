import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Colors from '../constants/Colors';

interface ServiceCardSvgProps {
  title: string;
  svgXml: string;
  backgroundColor?: string;
  onPress: () => void;
}

export default function ServiceCardSvg({ 
  title, 
  svgXml, 
  backgroundColor = Colors.light.gray, 
  onPress 
}: ServiceCardSvgProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <SvgXml xml={svgXml} width={24} height={24} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    color: Colors.light.secondary,
    textAlign: 'center',
    fontWeight: '500',
  },
});