import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import Colors from '../constants/Colors';

interface ServiceCardProps {
  title: string;
  SvgIcon: React.FC<SvgProps>;
  backgroundColor?: string;
  onPress: () => void;
}

export default function ServiceCard({ 
  title, 
  SvgIcon, 
  backgroundColor = Colors.light.gray, 
  onPress 
}: ServiceCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <SvgIcon width={24} height={24} />
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