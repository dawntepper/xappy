import React from "react";
import { Tabs } from "expo-router";

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="screens/HomeScreen"
        options={{
          title: "Home",
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="screens/CollectionsScreen"
        options={{
          title: "Collections",
          tabBarLabel: "Collections",
        }}
      />
    </Tabs>
  );
}
