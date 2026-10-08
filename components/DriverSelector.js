import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export function DriverSelector({ drivers, sessionKey, onSelect }) {
  const [selectedDriver, setSelectedDriver] = useState('');

  const handleConfirm = () => {
    if (!selectedDriver) return;
    onSelect?.(selectedDriver);
  };

  return (
    <View style={styles.container}>
      <Picker selectedValue={selectedDriver} onValueChange={setSelectedDriver}>
        <Picker.Item label="Select driver" value="" />
        {drivers.map((d) => (
          <Picker.Item
            key={d.driver_number}
            label={`${d.driver_number} ${d.full_name}`}
            value={d.driver_number}
          />
        ))}
      </Picker>

      <Pressable
        onPress={handleConfirm}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white' },
        ]}
      >
        <Text>Show replay</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  button: {
    marginTop: 20,
    height: 58,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
  },
});