import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  FlatList,
  SafeAreaView,
  Animated,
  useWindowDimensions
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import SearchBar from '../../components/SearchBar';
import ServiceCard from '../../components/ServiceCard';
import PromotionCard from '../../components/PromotionCard';
import CleanerCard from '../../components/CleanerCard';

// Import SVG files directly
import HouseServiceSvg from '../../assets/icons/services/house_service.svg';
import OfficeServiceSvg from '../../assets/icons/services/office_service.svg';
import WashingServiceSvg from '../../assets/icons/services/washing_service.svg';
import IroningServiceSvg from '../../assets/icons/services/ironing_service.svg';
import OrganizationServiceSvg from '../../assets/icons/services/organization_service.svg';
import DisinfectServiceSvg from '../../assets/icons/services/desinfection_service.svg';

// Import promotion SVGs
import Offer01Svg from '../../components/offer_01.svg';
import Offer02Svg from '../../components/offer_02.svg';
import Offer03Svg from '../../components/offer_03.svg';

// Sample data for services
const services = [
  { 
    id: '1', 
    title: 'Home', 
    SvgIcon: HouseServiceSvg, 
    backgroundColor: Colors.light.blueService 
  },
  { 
    id: '2', 
    title: 'Office', 
    SvgIcon: OfficeServiceSvg, 
    backgroundColor: Colors.light.orangeService 
  },
  { 
    id: '3', 
    title: 'Washing', 
    SvgIcon: WashingServiceSvg, 
    backgroundColor: Colors.light.darkBlueService 
  },
  { 
    id: '4', 
    title: 'Ironing', 
    SvgIcon: IroningServiceSvg, 
    backgroundColor: Colors.light.blueService 
  },
  { 
    id: '5', 
    title: 'Organization', 
    SvgIcon: OrganizationServiceSvg, 
    backgroundColor: Colors.light.orangeService 
  },
  { 
    id: '6', 
    title: 'Disinfect', 
    SvgIcon: DisinfectServiceSvg, 
    backgroundColor: Colors.light.darkBlueService 
  },
];

// Sample data for promotions
const promotions = [
  {
    id: '1',
    title: '25% Discount',
    subtitle: 'Schedule your appointment before November 20th',
    description: 'Express Cleaning for homes in up to 2 hours!',
    SvgImage: Offer01Svg,
    buttonText: 'Book now!'
  },
  {
    id: '2',
    title: 'Special Offer',
    subtitle: 'New customers only',
    description: 'Get your first cleaning with 15% off!',
    SvgImage: Offer02Svg,
    buttonText: 'Claim now'
  },
  {
    id: '3',
    title: 'Weekend Special',
    subtitle: 'Limited time offer',
    description: 'Book a weekend cleaning and get 20% off!',
    SvgImage: Offer03Svg,
    buttonText: 'Get offer'
  }
];

// Sample data for cleaners
const cleaners = [
  {
    id: '1',
    name: 'María Aguilar Azalar',
    specialty: 'Specialized in special washes',
    rating: 9.8,
    totalJobs: 20,
    hourlyRate: 15,
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '2',
    name: 'Matt Andrew',
    specialty: 'Expert in office cleaning',
    rating: 9.8,
    totalJobs: 40,
    hourlyRate: 25,
    imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '3',
    name: 'Olivia Foster',
    specialty: 'Specialist in Office Sanitation',
    rating: 9.2,
    totalJobs: 60,
    hourlyRate: 28,
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '4',
    name: 'Noah Chang',
    specialty: 'Specialist in Office Sanitation',
    rating: 9.7,
    totalJobs: 35,
    hourlyRate: 22,
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedCleaners, setBookmarkedCleaners] = useState<string[]>([]);
  const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  const toggleBookmark = (id: string) => {
    if (bookmarkedCleaners.includes(id)) {
      setBookmarkedCleaners(bookmarkedCleaners.filter(cleanerId => cleanerId !== id));
    } else {
      setBookmarkedCleaners([...bookmarkedCleaners, id]);
    }
  };

  const handleServicePress = (serviceId: string) => {
    console.log(`Service pressed: ${serviceId}`);
    // Navigate to service details or booking screen
  };

  const handlePromotionPress = (promotionId: string) => {
    console.log(`Promotion pressed: ${promotionId}`);
    // Navigate to promotion details or apply promotion
  };

  const handleBookPress = (cleanerId: string) => {
    console.log(`Book pressed for cleaner: ${cleanerId}`);
    // Navigate to cleaner profile screen
    router.push(`/cleaner/${cleanerId}`);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, User!</Text>
          <Text style={styles.subGreeting}>Welcome to HouseSkiper</Text>
        </View>
        
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <SearchBar 
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={clearSearch}
              placeholder="Search"
            />
          </View>
          
          {/* Promotions Carousel */}
          <View style={styles.promotionsContainer}>
            <FlatList
              data={promotions}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              snapToInterval={width - 40}
              decelerationRate="fast"
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={16}
              renderItem={({ item }) => {
                const SvgImage = item.SvgImage;
                return (
                  <View style={[styles.promotionItem, { width: width - 40 }]}>
                    <PromotionCard
                      title={item.title}
                      subtitle={item.subtitle}
                      description={item.description}
                      SvgImage={SvgImage}
                      buttonText={item.buttonText}
                      onPress={() => handlePromotionPress(item.id)}
                    />
                  </View>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
          
          {/* Pagination dots */}
          <View style={styles.paginationContainer}>
            {promotions.map((_, i) => {
              const inputRange = [
                (i - 1) * (width - 40),
                i * (width - 40),
                (i + 1) * (width - 40)
              ];
              
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
              });
              
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [1, 1.2, 1],
                extrapolate: 'clamp'
              });
              
              return (
                <Animated.View
                  key={i}
                  style={[
                    styles.paginationDot,
                    { opacity, transform: [{ scale }] }
                  ]}
                />
              );
            })}
          </View>
          
          {/* Services Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Services</Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesContainer}
          >
            {services.map(service => (
              <ServiceCard
                key={service.id}
                title={service.title}
                SvgIcon={service.SvgIcon}
                backgroundColor={service.backgroundColor}
                onPress={() => handleServicePress(service.id)}
              />
            ))}
          </ScrollView>
          
          {/* Recommended Cleaners Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          {cleaners.map(cleaner => (
            <CleanerCard
              key={cleaner.id}
              name={cleaner.name}
              specialty={cleaner.specialty}
              rating={cleaner.rating}
              totalJobs={cleaner.totalJobs}
              hourlyRate={cleaner.hourlyRate}
              imageUrl={cleaner.imageUrl}
              isBookmarked={bookmarkedCleaners.includes(cleaner.id)}
              onBookmark={() => toggleBookmark(cleaner.id)}
              onBook={() => handleBookPress(cleaner.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152744',
  },
  header: {
    backgroundColor: '#152744',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.white,
  },
  subGreeting: {
    fontSize: 16,
    color: Colors.light.white,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light.white,
  },
  searchContainer: {
    backgroundColor: Colors.light.gray,
    borderRadius: 12,
    marginBottom: 16,
  },
  promotionsContainer: {
    backgroundColor: Colors.light.gray,
    borderRadius: 12,
    padding: 0,
  },
  promotionItem: {
    marginRight: 0,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
    height: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#152744',
    marginHorizontal: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.secondary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#152744',
    fontWeight: '600',
  },
  servicesContainer: {
    paddingBottom: 16,
    marginBottom: 24,
  },
});