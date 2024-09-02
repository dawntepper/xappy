import React, { useState, useEffect } from "react";
import { fetchArticles, Article } from "../services/firestore";
import {
  Linking,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import ArticleCard from "../components/ArticleCard";
import InAppBrowser from "../components/InAppBrowser";

export default function HomeScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const fetchedArticles = await fetchArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
        // Handle error (e.g., show error message to user)
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const handleArticlePress = (url: string) => {
    setSelectedUrl(url);
  };

  const handleCloseBrowser = () => {
    setSelectedUrl(null);
  };

  const handleTagPress = (tag: string) => {
    console.log("Pass tag from HomeScreen:", tag);
    router.push({
      pathname: "/screens/CollectionsScreen",
      params: { tag },
    });
  };

  const renderArticle = ({ item }: { item: Article }) => (
    <ArticleCard
      article={item}
      onPress={handleArticlePress}
      onTagPress={handleTagPress}
    />
  );

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (selectedUrl) {
    return <InAppBrowser url={selectedUrl} onClose={handleCloseBrowser} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Xappy</Text>
        <TouchableOpacity
          onPress={() => {
            /* Add new article logic */
          }}
        >
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    marginRight: "auto",
    marginLeft: "auto",
    width: 480,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
