import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type ArticleCardProps = {
  article: {
    id: string;
    title: string;
    tags: string[];
  };
  layout?: "full" | "compact" | "tight";
};

export default function ArticleCard({
  article,
  layout = "full",
}: ArticleCardProps) {
  return (
    <TouchableOpacity style={[styles.card, styles[layout]]}>
      <Text style={styles.title} numberOfLines={layout === "tight" ? 1 : 2}>
        {article.title}
      </Text>
      {layout !== "tight" && (
        <View style={styles.tags}>
          {article.tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
      )}
      {layout === "full" && (
        <View style={styles.actions}>
          <TouchableOpacity>
            <Text>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>🕒</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>🗑️</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  full: {
    width: "95%",
  },
  compact: {
    width: 200,
  },
  tight: {
    width: "95%",
    padding: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  tag: {
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
