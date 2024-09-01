import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

type ArticlePreviewProps = {
  article: {
    title: string;
    source: string;
    excerpt: string;
    imageUrl?: string;
    url: string;
  };
  onClose: () => void;
};

export default function ArticlePreview({
  article,
  onClose,
}: ArticlePreviewProps) {
  const handleReadFullArticle = () => {
    Linking.openURL(article.url);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.source}>{article.source}</Text>
      {article.imageUrl && (
        <Image source={{ uri: article.imageUrl }} style={styles.image} />
      )}
      <Text style={styles.excerpt}>{article.excerpt}</Text>
      <TouchableOpacity
        style={styles.readButton}
        onPress={handleReadFullArticle}
      >
        <Text style={styles.readButtonText}>Read Full Article</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "blue",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  source: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  excerpt: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  readButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  readButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
