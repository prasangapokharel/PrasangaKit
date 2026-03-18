import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { ThemeProvider, useTheme } from "./src/lib/theme-context";
import Button from "./src/components/ui/button";
import Card from "./src/components/ui/card";
import Sheet from "./src/components/ui/sheet";
import Drawer from "./src/components/ui/drawer";
import Popover from "./src/components/ui/popover";
import DatePicker from "./src/components/ui/date-picker";
import Toast from "./src/components/ui/toast";

function AppContent() {
  const { theme, colors, toggleTheme } = useTheme();
  const [activeDemo, setActiveDemo] = useState<
    "sheet" | "drawer" | "popover" | "datepicker" | "buttons" | "inputs" | "cards" | "badges" | null
  >(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      flex: 1,
    },
    scrollContent: {
      padding: 24,
      paddingBottom: 40,
    },
    heroSection: {
      marginBottom: 48,
      alignItems: "center",
    },
    logo: {
      fontSize: 48,
      marginBottom: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: "700",
      color: colors.foreground,
      marginBottom: 12,
      textAlign: "center",
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 16,
      color: colors.mutedForeground,
      textAlign: "center",
      lineHeight: 24,
      marginBottom: 8,
    },
    badge: {
      marginTop: 16,
      backgroundColor: colors.primaryLight,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      alignSelf: "center",
    },
    badgeText: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.primary,
      letterSpacing: 0.5,
    },
    themeToggle: {
      position: "absolute",
      top: 16,
      right: 16,
      padding: 12,
      borderRadius: 12,
      backgroundColor: colors.muted,
      borderWidth: 1,
      borderColor: colors.border,
    },
    themeToggleText: {
      fontSize: 18,
    },
    demoSection: {
      marginBottom: 48,
    },
    sectionLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.mutedForeground,
      marginBottom: 16,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    demoGrid: {
      gap: 12,
    },
    demoCard: {
      borderRadius: 12,
      padding: 20,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.foreground,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    demoCardHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    demoEmoji: {
      fontSize: 24,
      marginRight: 12,
    },
    demoHeaderText: {
      flex: 1,
    },
    demoCategoryText: {
      fontSize: 12,
      fontWeight: "500",
      color: colors.primary,
      marginBottom: 4,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    demoTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.foreground,
      marginBottom: 4,
    },
    demoDescription: {
      fontSize: 14,
      color: colors.mutedForeground,
      lineHeight: 20,
      marginBottom: 12,
    },
    viewButton: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: colors.primary,
      borderRadius: 8,
      alignItems: "center",
    },
    viewButtonText: {
      color: colors.primaryForeground,
      fontSize: 14,
      fontWeight: "600",
    },
    footer: {
      paddingTop: 24,
      marginTop: 24,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      alignItems: "center",
    },
    footerText: {
      fontSize: 12,
      color: colors.mutedForeground,
      textAlign: "center",
      lineHeight: 20,
    },
    linkText: {
      color: colors.primary,
      fontWeight: "600",
    },
  });

  const demos = [
    {
      id: "buttons",
      emoji: "🔘",
      category: "Form",
      title: "Buttons",
      description: "Multiple button variants and sizes for different actions",
    },
    {
      id: "inputs",
      emoji: "⌨️",
      category: "Form",
      title: "Inputs",
      description: "Text inputs with validation and error states",
    },
    {
      id: "cards",
      emoji: "🎴",
      category: "Display",
      title: "Cards",
      description: "Flexible containers with shadow and border options",
    },
    {
      id: "badges",
      emoji: "🏷️",
      category: "Display",
      title: "Badges",
      description: "Status indicators and labels with multiple variants",
    },
    {
      id: "sheet",
      emoji: "📄",
      category: "Overlay",
      title: "Sheet",
      description: "Bottom sheet modal with drag to close support",
    },
    {
      id: "drawer",
      emoji: "🎯",
      category: "Overlay",
      title: "Drawer",
      description: "Side panel with swipe gesture support",
    },
    {
      id: "popover",
      emoji: "💬",
      category: "Overlay",
      title: "Popover",
      description: "Floating positioned content near a trigger",
    },
    {
      id: "datepicker",
      emoji: "📅",
      category: "Form",
      title: "Date Picker",
      description: "Interactive calendar for date selection",
    },
  ];

  return (
    <View style={dynamicStyles.container}>
      <TouchableOpacity
        style={dynamicStyles.themeToggle}
        onPress={toggleTheme}
        activeOpacity={0.7}
      >
        <Text style={dynamicStyles.themeToggleText}>
          {theme === "light" ? "🌙" : "☀️"}
        </Text>
      </TouchableOpacity>

      <SafeAreaView style={dynamicStyles.safeArea}>
        <ScrollView
          style={dynamicStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Hero Section */}
          <View style={dynamicStyles.heroSection}>
            <Text style={dynamicStyles.logo}>🎨</Text>
            <Text style={dynamicStyles.title}>Prasanga UI</Text>
            <Text style={dynamicStyles.subtitle}>
              Beautiful React Native components with shadcn design
            </Text>
            <View style={dynamicStyles.badge}>
              <Text style={dynamicStyles.badgeText}>
                ✨ This is from PrasangaKit • v1.2.0
              </Text>
            </View>
          </View>

          {/* Demo Section */}
          <View style={dynamicStyles.demoSection}>
            <Text style={dynamicStyles.sectionLabel}>Explore Components</Text>
            <View style={dynamicStyles.demoGrid}>
              {demos.map((demo) => (
                <Card key={demo.id} style={{ borderRadius: 12, overflow: "hidden" }}>
                  <View style={dynamicStyles.demoCard}>
                    <View style={dynamicStyles.demoCardHeader}>
                      <Text style={dynamicStyles.demoEmoji}>{demo.emoji}</Text>
                      <View style={dynamicStyles.demoHeaderText}>
                        <Text style={dynamicStyles.demoCategoryText}>{demo.category}</Text>
                        <Text style={dynamicStyles.demoTitle}>{demo.title}</Text>
                      </View>
                    </View>
                    <Text style={dynamicStyles.demoDescription}>{demo.description}</Text>
                    <TouchableOpacity
                      style={dynamicStyles.viewButton}
                      onPress={() => {
                        setActiveDemo(demo.id as any);
                        showToast(`${demo.title} component demo opened`);
                      }}
                    >
                      <Text style={dynamicStyles.viewButtonText}>View Example →</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </View>
          </View>

          {/* Footer */}
          <View style={dynamicStyles.footer}>
            <Text style={dynamicStyles.footerText}>
              Built with React Native, Expo & TypeScript
            </Text>
            <Text style={[dynamicStyles.footerText, { marginTop: 12 }]}>
              Theme:{" "}
              <Text style={dynamicStyles.linkText}>
                {theme === "light" ? "Light Mode ☀️" : "Dark Mode 🌙"}
              </Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Demo Modals */}
      <Sheet isOpen={activeDemo === "sheet"} onClose={() => setActiveDemo(null)}>
        <View style={{ padding: 24, paddingBottom: 40 }}>
          <Text style={[dynamicStyles.demoTitle, { marginBottom: 16 }]}>
            Sheet Component Demo
          </Text>
          <Text style={dynamicStyles.demoDescription}>
            This is a bottom sheet modal. Drag down to close or tap outside.
          </Text>
            <Button
              variant="primary"
              onPress={() => {
                setActiveDemo(null);
                showToast("Sheet closed!");
              }}
              containerStyle={{ marginTop: 16 }}
            >
              Close Sheet
            </Button>
        </View>
      </Sheet>

      <Drawer isOpen={activeDemo === "drawer"} onClose={() => setActiveDemo(null)}>
        <View style={{ padding: 24 }}>
          <Text style={[dynamicStyles.demoTitle, { marginBottom: 16 }]}>
            Drawer Component Demo
          </Text>
          <Text style={dynamicStyles.demoDescription}>
            This is a side drawer. Swipe left or tap the close button to dismiss.
          </Text>
            <Button
              variant="secondary"
              onPress={() => {
                setActiveDemo(null);
                showToast("Drawer closed!");
              }}
              containerStyle={{ marginTop: 16 }}
            >
              Close Drawer
            </Button>
        </View>
      </Drawer>

      <Toast
        visible={toastVisible}
        message={toastMessage}
        onDismiss={() => setToastVisible(false)}
        duration={3000}
      />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
