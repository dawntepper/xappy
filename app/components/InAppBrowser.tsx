import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { WebView } from "react-native-webview";

type InAppBrowserProps = {
  url: string;
  onClose: () => void;
};

export default function InAppBrowser({ url, onClose }: InAppBrowserProps) {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} style={styles.webview} />
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
  },
});
