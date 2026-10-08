import { StatusBar } from "expo-status-bar"
import { ScrollView, View, Text, StyleSheet } from "react-native"



export const Row = ({ children }) => (
  <View style={styles.row}>{children}</View>
)

export const Col = ({ span, children }) => {
  return  (
    <View style={styles[`${span}col`]}>{children}</View>
  )
  
}

const styles = StyleSheet.create({

  row: {
    flexDirection: "row",
  },

  "0.5col":  {
    backgroundColor:  "lightblue",
    borderColor:  "#fff",
    borderWidth:  1,
    flex:  1
  },
  "1col":  {
    backgroundColor:  "lightblue",
    borderColor:  "#fff",
    borderWidth:  1,
    flex:  1
  },
  "2col":  {
    backgroundColor:  "green",
    borderColor:  "#fff",
    borderWidth:  1,
    flex:  2
  },
  "3col":  {
    backgroundColor:  "orange",
    borderColor:  "#fff",
    borderWidth:  1,
    flex:  3
  },
  "4col":  {
    backgroundColor:  "pink",
    borderColor:  "#fff",
    flex:  4
  },
})
