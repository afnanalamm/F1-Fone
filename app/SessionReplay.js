import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { DriverSelector } from '../components/DriverSelector';
import { Alert } from 'react-native';
import { router } from 'expo-router';

export default function SessionReplay() {
  const { sessionKey } = useLocalSearchParams();
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  const handleSessionReplay = (driverNumber) => {
    if (!sessionKey) {
      Alert.alert('Pick a session first');
      return;
    }

    router.push({
      pathname: '/ReplayScreen',
      params: {
        sessionKey: String(sessionKey),
        driverNumber: String(driverNumber),
      },
    });
  }; 

  useEffect(() => {
    let cancelled = false;
    axios
      .get('https://api.openf1.org/v1/drivers', { params: { session_key: sessionKey } })
      .then((res) => {
        if (cancelled) return;
        if (res.data.length) setDrivers(res.data);
        else setError('No drivers found for this session');
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [sessionKey]);

  if (error) return <SafeAreaView><Text>{error}</Text></SafeAreaView>;
  if (loading) return <SafeAreaView><Text>Loading...</Text></SafeAreaView>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DriverSelector drivers={drivers} sessionKey={sessionKey} onSelect={handleSessionReplay} />
    </SafeAreaView>
  );
}

