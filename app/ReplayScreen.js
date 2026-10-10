import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { ScrollView, Text, View, StyleSheet } from 'react-native';


export default function ReplayScreen() {
    const { sessionKey, driverNumber } = useLocalSearchParams();
    const [raceData, setRaceData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      let cancelled = false;
      const load = async () => {
        try {
          const server_response = await axios.get('https://api.openf1.org/v1/location', {
            params: { session_key: sessionKey, driver_number: driverNumber },
          });

          if (cancelled) return;
          if (server_response.data.length > 0) {
            const filtered_response = server_response.data.map(({ x, y, date }) => ({ x, y, date }));
            setRaceData(filtered_response);
          } else {
            setError('No location data found for this driver');
          }
        } catch (e) {
          if (!cancelled) setError(e.message);
        }
      };

      load();
      return () => { cancelled = true; };
    }, [sessionKey, driverNumber]);
    
    console.log('Race Data:', raceData.length); // Log the race data to the console for debugging  
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.rootScrollView} contentContainerStyle={styles.contentContainer}>

                <View style={styles.replayView}>
                    <Text>Replay Screen</Text>
                    
                </View>

                <ScrollView style={styles.leaderboardView}>
                    <Text>Leaderboard</Text>
                </ScrollView>

                <View style={styles.weatherView}>
                </View>

                <View style={styles.pitView}>
                </View>

                <View style={styles.overtakesView}>
                </View>

                <View style={styles.raceControlView}>
                </View>


            </ScrollView>
        </SafeAreaView>
    )
    
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  rootScrollView: {
    flex: 1
  },
  contentContainer: {
    // flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // flexShrink: 1
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  replayView: {
    borderRadius: 10,
    backgroundColor: '#8b8585',
    width: '95%',
    alignSelf: 'center',
    paddingBlock: '10',
    minHeight: 200,
    height: 300,
  },
  leaderboardView: {
    borderRadius: 10,
    backgroundColor: '#52a563',
    width: '95%',
    alignSelf: 'center',
    paddingBlock: '10',
    minHeight: 200,
    height: 300,
    maxWidth: '95%',
  },
  weatherView: {
    borderRadius: 10,
    backgroundColor: '#9da552',
    width: '45%',
    alignSelf: 'center',
    paddingBlock: '10',
    minHeight: 200,
    height: 300,
  },
  pitView: {
    borderRadius: 10,
    backgroundColor: '#a5529a',
    width: '45%',
    alignSelf: 'center',
    paddingBlock: '10',
    minHeight: 200,
    height: 300,
  },
  overtakesView: {
    borderRadius: 10,
    backgroundColor: '#5299a5',
    width: '45%',
    alignSelf: 'center',
    paddingBlock: '10',
    minHeight: 200,
    height: 300,
  },
  raceControlView: {
    borderRadius: 10,
    backgroundColor: '#c44719',
    width: '45%',
    alignSelf: 'center',
    paddingBlock: '10',
    minHeight: 200,
    height: 300,
  }
})