import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect, useRouter, useLocalSearchParams } from "expo-router";
import {
  Linking,
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ArticleCard from "../components/ArticleCard";
import {
  fetchCollectionsWithArticles,
  Article,
  Collection,
} from "../services/firestore";

type CustomPickerProps = {
  selectedValue: string;
  style: StyleProp<ViewStyle>;
  onValueChange: (itemValue: string, itemIndex: number) => void;
  items: string[];
};

const CustomPicker: React.FC<CustomPickerProps> = ({
  selectedValue,
  style,
  onValueChange,
  items,
}) => (
  <Picker<string>
    selectedValue={selectedValue}
    style={style}
    onValueChange={onValueChange}
  >
    {items.map((item, index) => (
      <Picker.Item key={index} label={item} value={item} />
    ))}
  </Picker>
);

export default function CollectionsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [collections, setCollections] = useState<
    (Collection & { fullArticles: Article[] })[]
  >([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  let initialTag: string = Array.isArray(params.tag)
    ? params.tag[0]
    : params.tag || "All";
  const [selectedTag, setSelectedTag] = useState<string>(initialTag);

  const loadCollections = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);
    try {
      const fetchedCollections = await fetchCollectionsWithArticles();
      setCollections(fetchedCollections);
    } catch (error) {
      console.error("Error fetching collections:", error);
      setError("Failed to load collections. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadCollections(false).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    loadCollections();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const tagParam = Array.isArray(params.tag) ? params.tag[0] : params.tag;
      setSelectedTag(tagParam || "All");
    }, [params.tag])
  );

  useEffect(() => {
    if (selectedTag === "All" || !selectedTag) {
      const allArticles = collections.flatMap(
        (collection) => collection.fullArticles
      );
      setFilteredArticles(allArticles);
    } else {
      const filtered = collections
        .flatMap((collection) => collection.fullArticles)
        .filter((article) => article.tags.includes(selectedTag));
      setFilteredArticles(filtered);
    }
  }, [selectedTag, collections]);

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

  const uniqueTags = Array.from(
    new Set(
      collections.flatMap((collection) =>
        collection.fullArticles.flatMap((article) => article.tags)
      )
    )
  );
  uniqueTags.unshift("All");

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading collections...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collections: {selectedTag}</Text>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Tag:</Text>
        <CustomPicker
          selectedValue={selectedTag}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedTag(itemValue)}
          items={uniqueTags}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={filteredArticles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.noArticlesText}>
            No articles found for the selected tag.
          </Text>
        }
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
  errorText: {
    color: "red",
    textAlign: "center",
    padding: 10,
  },
  noArticlesText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});