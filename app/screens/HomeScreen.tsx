import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ArticleCard from "../components/ArticleCard";

// Define the type for an article
type Article = {
  id: string;
  title: string;
  tags: string[];
};

export default function HomeScreen() {
  const [layout, setLayout] = useState<"full" | "compact" | "tight">("full");

  // Dummy data for articles
  const articles: Article[] = [
    { id: "1", title: "Keynote Speakers", tags: ["DNC", "Elections"] },
    { id: "2", title: "Top Ten RBs", tags: ["NFL", "Fantasy Football"] },
    { id: "3", title: "New Tech Trends", tags: ["Technology", "Innovation"] },
    // Add more dummy articles as needed
  ];

  const renderArticle = ({ item }: { item: Article }) => (
    <ArticleCard article={item} layout={layout} />
  );

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
