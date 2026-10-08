import { NativeTabs } from 'expo-router/unstable-native-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";


export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Race</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="flag.pattern.checkered" md="flag" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="Settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="gear" md="settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
