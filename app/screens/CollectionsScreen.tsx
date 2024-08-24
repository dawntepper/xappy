import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ArticleCard from "../components/ArticleCard";

type Article = {
  id: string;
  title: string;
  tags: string[];
};

type Collection = {
  id: string;
  name: string;
  articles: Article[];
};

// Dummy data for collections
const collections: Collection[] = [
  {
    id: "1",
    name: "Daily Reads",
    articles: [
      {
        id: "1",
        title: "ESPN: The Worldwide Leader in Sports",
        tags: ["Daily", "Sports"],
      },
      {
        id: "2",
        title: "IndieHacker: Micro-SaaS of the Day",
        tags: ["Daily", "SaaS"],
      },
      { id: "3", title: "HackerNews: Top Stories", tags: ["Daily", "Tech"] },
    ],
  },
  {
    id: "2",
    name: "NFL",
    articles: [
      { id: "4", title: "Top 25 WRs", tags: ["NFL", "Rankings"] },
      { id: "5", title: "Top Ten RBs", tags: ["NFL", "Fantasy Football"] },
      {
        id: "6",
        title: "Fantasy Strategies",
        tags: ["NFL", "Fantasy Football"],
      },
    ],
  },
  // Add more collections as needed
];

export default function CollectionsScreen() {
  const renderArticle = ({ item }: { item: Article }) => (
    <ArticleCard article={item} layout="compact" />
  );

  const renderCollection = ({ item }: { item: Collection }) => (
    <View style={styles.collectionContainer}>
      <Text style={styles.collectionName}>{item.name}</Text>
      <FlatList
        data={item.articles}
        renderItem={renderArticle}
        keyExtractor={(article) => article.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Collections</Text>
        <TouchableOpacity
          onPress={() => {
            /* Add new collection logic */
          }}
        >
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={collections}
        renderItem={renderCollection}
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    fontSize: 24,
    fontWeight: "bold",
  },
  collectionContainer: {
    marginBottom: 20,
  },
  collectionName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
  },
});
