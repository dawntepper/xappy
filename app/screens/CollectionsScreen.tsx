import React, { useState, useEffect } from "react";

import { Linking } from "react-native";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker
import { useLocalSearchParams } from "expo-router"; // Correct hook for accessing params
import ArticleCard from "../components/ArticleCard";
import { useRouter } from "expo-router";

type Article = {
  id: string;
  title: string;
  tags: string[];
  url: string;
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
        url: "https://www.espn.com",
      },
      {
        id: "2",
        title: "IndieHacker: Micro-SaaS of the Day",
        tags: ["Daily", "SaaS"],
        url: "https://www.indiehackers.com",
      },
      {
        id: "3",
        title: "HackerNews: Top Stories",
        tags: ["Daily", "Tech"],
        url: "https://hackernews.com",
      },
    ],
  },
  {
    id: "2",
    name: "NFL",
    articles: [
      {
        id: "4",
        title: "Top 25 WRs",
        tags: ["NFL", "Rankings"],
        url: "https://www.espn.com",
      },
      {
        id: "5",
        title: "Top Ten RBs",
        tags: ["NFL", "Fantasy Football"],
        url: "https://www.espn.com",
      },
      {
        id: "6",
        title: "Fantasy Strategies",
        tags: ["NFL", "Fantasy Football"],
        url: "https://www.espn.com",
      },
    ],
  },
  {
    id: "3",
    name: "Interior Design",
    articles: [
      {
        id: "13",
        title: "Small Homes",
        tags: ["Small Homes", "Interior Design"],
        url: "https://www.espn.com",
      },
      {
        id: "10",
        title: "Design for Small Spaces",
        tags: ["Small Homes", "Interior Design"],
        url: "https://www.espn.com",
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
        url: "https://www.espn.com",
      },
      {
        id: "8",
        title: "Top Ten QBs",
        tags: ["NFL", "Fantasy Football"],
        url: "https://www.espn.com",
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
        tags: ["Technology", "ioT", "Innovation"],
        url: "https://www.espn.com",
      },
    ],
  },
  {
    id: "6",
    name: "Elections",
    articles: [
      {
        id: "11",
        title: "Who's It Gonna Be?",
        tags: ["Elections", "Vote2024", "DNC"],
        url: "https://www.espn.com",
      },
    ],
  },
];

export default function CollectionsScreen() {
  const router = useRouter();
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  const params = useLocalSearchParams(); // Get all params

  let initialTag: string = Array.isArray(params.tag)
    ? params.tag[0]
    : params.tag || "All"; // Ensure tag is a string

  const [selectedTag, setSelectedTag] = useState<string>(initialTag); // State for selected tag
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]); // State for filtered articles

  const handleArticlePress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const handleTagPress = (tag: string) => {
    router.push({
      pathname: "/screens/CollectionsScreen",
      params: { tag },
    });
    setSelectedTag(tag);
  };

  const renderArticle = ({ item }: { item: Article }) => (
    <ArticleCard
      article={item}
      layout="compact"
      onPress={() => handleArticlePress(item.url)}
      onTagPress={handleTagPress}
    />
  );

  useEffect(() => {
    if (selectedTag === "All" || !selectedTag) {
      const allArticles = collections.flatMap(
        (collection) => collection.articles
      );
      setFilteredArticles(allArticles);
    } else {
      // Filter articles by the selected tag
      const filtered = collections
        .flatMap((collection) => collection.articles)
        .filter((article) => article.tags.includes(selectedTag));
      setFilteredArticles(filtered);
      console.log("Filtered articles:", filtered);
    }
  }, [selectedTag]); // Run effect when selectedTag changes
  console.log("selectedTag:", selectedTag);

  // Extract unique tags from all articles
  const uniqueTags = Array.from(
    new Set(
      collections.flatMap((collection) =>
        collection.articles.flatMap((article) => article.tags)
      )
    )
  );
  uniqueTags.unshift("All"); // Add "All" to the list of tags

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collections: {selectedTag}</Text>

      {/* Dropdown for filtering by tag */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Tag:</Text>
        <Picker
          selectedValue={selectedTag}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedTag(itemValue)}
        >
          {uniqueTags.map((tag, index) => (
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 15,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 15,
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
