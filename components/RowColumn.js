import { StatusBar } from "expo-status-bar"
import { ScrollView, View, Text } from "react-native"
import { styles } from "../app/(tabs)"

export const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
  )

export const Col = ({ span, children }) => {
  return  (
    <View style={styles[`${span}col`]}>{children}</View>
  )
  
}

