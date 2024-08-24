import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "expo-router";
import ArticleCard from "../components/ArticleCard";

// Define the type for an article
type Article = {
  id: string;
  title: string;
  tags: string[];
};

export default function HomeScreen() {
  const [layout, setLayout] = useState<"full" | "compact" | "tight">("full");
  const navigation = useNavigation();

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

  const handleTagPress = (tag: string) => {
    console.log("Navigating with tag:", tag);
    (navigation as any).navigate("screens/CollectionsScreen", { tag });
  };

  const renderArticle = ({ item }: { item: Article }) => (
    <ArticleCard article={item} layout={layout} onTagPress={handleTagPress} />
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
