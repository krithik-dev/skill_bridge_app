import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useAuth } from './AuthContext';
import { PageType } from './types/navigation';
import Page1Screen from './Page1Screen';
import Page2Screen from './Page2Screen';
import Page3Screen from './Page3Screen';
import Page4Screen from './Page4Screen';
import Page5Screen from './Page5Screen';

const HomeScreen: React.FC = () => {
  const [activePage, setActivePage] = useState<PageType>('page1');
  const { user, signOut } = useAuth();

  const handleSignOut = async (): Promise<void> => {
    await signOut();
  };

  const renderPage = () => {
    switch (activePage) {
      case 'page1':
        return <Page1Screen />;
      case 'page2':
        return <Page2Screen />;
      case 'page3':
        return <Page3Screen />;
      case 'page4':
        return <Page4Screen />;
      case 'page5':
        return <Page5Screen />;
      default:
        return <Page1Screen />;
    }
  };

  const NavButton: React.FC<{ page: PageType; title: string }> = ({ page, title }) => (
    <TouchableOpacity
      style={[
        styles.navButton,
        activePage === page && styles.navButtonActive
      ]}
      onPress={() => setActivePage(page)}
    >
      <Text style={[
        styles.navButtonText,
        activePage === page && styles.navButtonTextActive
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with user info and sign out */}

      {/* Page Content */}
      <View style={styles.content}>
        {renderPage()}
      </View>

      {/* Static Bottom Navigation Bar */}
      <View style={styles.navbar}>
        <NavButton page="page1" title="Page 1" />
        <NavButton page="page2" title="Page 2" />
        <NavButton page="page3" title="Page 3" />
        <NavButton page="page4" title="Page 4" />
        <NavButton page="page5" title="Page 5" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  signOutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  signOutText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  navButtonActive: {
    backgroundColor: '#007AFF',
  },
  navButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  navButtonTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
