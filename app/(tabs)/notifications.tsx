import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.placeholderContent}>
          <Text style={styles.placeholderText}>Notifications screen content will go here</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  header: {
    backgroundColor: '#152744',
    paddingTop: 80,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.white,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  placeholderContent: {
    backgroundColor: Colors.light.gray,
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.light.darkGray,
  },
});