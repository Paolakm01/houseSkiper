import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Bookmark, Star } from 'lucide-react-native';
import Colors from '../constants/Colors';

interface CleanerCardProps {
  name: string;
  specialty: string;
  rating: number;
  totalJobs: number;
  hourlyRate: number;
  imageUrl: string;
  onBookmark: () => void;
  onBook: () => void;
  isBookmarked?: boolean;
}

export default function CleanerCard({
  name,
  specialty,
  rating,
  totalJobs,
  hourlyRate,
  imageUrl,
  onBookmark,
  onBook,
  isBookmarked = false
}: CleanerCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image source={{ uri: imageUrl }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.specialty}>{specialty}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onBookmark} style={styles.bookmarkButton}>
          <Bookmark 
            size={24} 
            color={isBookmarked ? Colors.light.accent : Colors.light.darkGray} 
            fill={isBookmarked ? Colors.light.accent : 'transparent'} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.bottomSection}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Score</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFB800" fill="#FFB800" />
              <Text style={styles.statValue}>{rating.toFixed(1)}</Text>
            </View>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.spacer} />
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Price</Text>
            <Text style={styles.statValue}>${hourlyRate}/hr</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.bookButton} onPress={onBook}>
          <Text style={styles.bookButtonText}>Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.gray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  profileInfo: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.secondary,
    marginBottom: 4,
  },
  specialty: {
    fontSize: 12,
    color: Colors.light.darkGray,
  },
  bookmarkButton: {
    padding: 8,
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 0,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 0,
    flex: 0.7,
    marginRight: 16,
    justifyContent: 'flex-start',
  },
  statItem: {
    alignItems: 'left',
    flex: 1,
  },
  spacer: {
    width: 8,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.darkGray,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.light.darkGray,
    opacity: 0.2,
  },
  bookButton: {
    backgroundColor: '#152744',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    flex: 1,
    height: 48,
    justifyContent: 'center',
  },
  bookButtonText: {
    color: Colors.light.white,
    fontWeight: '600',
    fontSize: 16,
  },
});