import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ArticleCard from "../components/ArticleCard";

type Article = {
  id: string;
  title: string;
  tags: string[];
};

export default function HomeScreen() {
  const [layout, setLayout] = useState<"full" | "compact" | "tight">("full");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Dummy data for articles
  const articles: Article[] = [
    { id: "1", title: "Keynote Speakers", tags: ["DNC", "Elections"] },
    { id: "2", title: "Top Ten RBs", tags: ["NFL", "Fantasy Football"] },
    { id: "3", title: "New Tech Trends", tags: ["Technology", "Innovation"] },
    { id: "4", title: "Voting Locations", tags: ["Vote", "Elections"] },
    { id: "5", title: "Top Ten WRs", tags: ["NFL", "Fantasy Football"] },
    { id: "6", title: "Small Homes", tags: ["Small Homes", "Interior Design"] },
    { id: "7", title: "Top Ten Power Ballads", tags: ["Music"] },
    { id: "8", title: "Top Ten QBs", tags: ["NFL", "Fantasy Football"] },
    { id: "9", title: "New ioT Trends", tags: ["Technology", "ioT"] },
    {
      id: "10",
      title: "Design for Small Spaces",
      tags: ["Small Homes", "Interior Design"],
    },
  ];

  // Extract unique tags from articles
  const tags = Array.from(new Set(articles.flatMap((article) => article.tags)));
  tags.unshift("All"); // Add "All" option

  // Filter articles based on selected tag
  const filteredArticles =
    selectedTag === "All"
      ? articles
      : articles.filter((article) => article.tags.includes(selectedTag));

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
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Tag:</Text>
        <Picker
          selectedValue={selectedTag}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedTag(itemValue)}
        >
          {tags.map((tag, index) => (
            <Picker.Item key={index} label={tag} value={tag} />
          ))}
        </Picker>
      </View>
      <FlatList
        data={filteredArticles}
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
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  filterLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    height: 50,
    width: 150,
  },
});
