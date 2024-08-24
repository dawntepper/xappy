import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
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
  {
    id: "3",
    name: "Interior Design",
    articles: [
      {
        id: "6",
        title: "Small Homes",
        tags: ["Small Homes", "Interior Design"],
      },
      {
        id: "10",
        title: "Design for Small Spaces",
        tags: ["NFL", "Interior Design"],
      },
    ],
  },
  {
    id: "4",
    name: "Music",
    articles: [
      {
        id: "7",
        title: "Top Ten Power Ballads",
        tags: ["Music"],
      },
      {
        id: "10",
        title: "Design for Small Spaces",
        tags: ["NFL", "Interior Design"],
      },
    ],
  },
  {
    id: "5",
    name: "Technology",
    articles: [
      {
        id: "9",
        title: "New ioT Trends",
        tags: ["Technology", "iOT"],
      },
    ],
  },
  {
    id: "6",
    name: "iOT",
    articles: [
      {
        id: "9",
        title: "New ioT Trends",
        tags: ["Technology", "iOT"],
      },
    ],
  },
  // Add more collections as needed
];

export default function CollectionsScreen() {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Extract unique tags from all collections
  const allTags = Array.from(
    new Set(
      collections.flatMap((collection) =>
        collection.articles.flatMap((article) => article.tags)
      )
    )
  );
  allTags.unshift("All");

  // Filter collections based on selected tag
  const filteredCollections =
    selectedTag === "All"
      ? collections
      : collections.filter((collection) =>
          collection.articles.some((article) =>
            article.tags.includes(selectedTag)
          )
        );

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
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Tag:</Text>
        <Picker
          selectedValue={selectedTag}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedTag(itemValue)}
        >
          {allTags.map((tag, index) => (
            <Picker.Item key={index} label={tag} value={tag} />
          ))}
        </Picker>
      </View>
      <FlatList
        data={filteredCollections}
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
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingLeft: 15,
  },
  filterLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    height: 50,
    width: 150,
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
