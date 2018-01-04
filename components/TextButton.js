import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default function TextButton({ text, onPress, styles = {} }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.btnText}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}
