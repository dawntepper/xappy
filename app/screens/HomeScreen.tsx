import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import ArticleCard from "../components/ArticleCard";
import InAppBrowser from "../components/InAppBrowser";

type Article = {
  id: string;
  title: string;
  tags: string[];
  url: string;
};

export default function HomeScreen() {
  //const [layout, setLayout] = useState<"full" | "compact" | "tight">("full");

  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  // Dummy data for articles
  const articles: Article[] = [
    {
      id: "1",
      title: "Keynote Speakers",
      tags: ["DNC", "Elections"],
      url: "http://msnbc.com",
    },
    {
      id: "2",
      title: "Top Ten RBs",
      tags: ["NFL", "Fantasy Football"],
      url: "http://espn.com",
    },
    {
      id: "3",
      title: "New Tech Trends",
      tags: ["Technology", "Innovation"],
      url: "http://indiehacker.com",
    },
    {
      id: "4",
      title: "Voting Locations",
      tags: ["Vote", "Elections"],
      url: "http://nytimes.com",
    },
    {
      id: "5",
      title: "Top Ten WRs",
      tags: ["NFL", "Fantasy Football"],
      url: "http://rotoballer.com",
    },
    {
      id: "6",
      title: "Small Homes",
      tags: ["Small Homes", "Interior Design"],
      url: "http://dwell.com",
    },
    {
      id: "7",
      title: "Top Ten Power Ballads",
      tags: ["Music"],
      url: "http://spotify.com",
    },
    {
      id: "8",
      title: "Top Ten QBs",
      tags: ["NFL", "Fantasy Football"],
      url: "http://rotowire.com",
    },
    {
      id: "9",
      title: "New ioT Trends",
      tags: ["Technology", "ioT"],
      url: "http://wirecutter.com",
    },
    {
      id: "10",
      title: "Design for Small Spaces",
      tags: ["Small Homes", "Interior Design"],
      url: "http://architectualdigest.com",
    },
  ];

  const handleArticlePress = (url: string) => {
    setSelectedUrl(url);
  };

  const handleCloseBrowser = () => {
    setSelectedUrl(null);
  };

  const router = useRouter();

  const handleTagPress = (tag: string) => {
    console.log("Navigating with tag:", tag);
    router.push({
      pathname: "/screens/CollectionsScreen",
      params: { tag },
    });
  };

  const renderArticle = ({ item }: { item: Article }) => (
    <ArticleCard
      article={item}
      //layout={layout}
      onPress={handleArticlePress}
      onTagPress={handleTagPress}
    />
  );

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
