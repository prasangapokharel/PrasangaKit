import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Button from "./src/components/ui/button";
import Input from "./src/components/ui/input";
import Card from "./src/components/ui/card";
import Badge from "./src/components/ui/badge";
import Modal from "./src/components/ui/modal";
import Toast from "./src/components/ui/toast";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info" | "warning">("success");

  const showToast = (message: string, type: "success" | "error" | "info" | "warning" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f9fafb",
    },
    scrollContent: {
      padding: 16,
      gap: 24,
    },
    header: {
      fontSize: 28,
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: "#6b7280",
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: 12,
      marginTop: 8,
    },
    section: {
      gap: 12,
    },
    buttonRow: {
      flexDirection: "row",
      gap: 8,
      flexWrap: "wrap",
    },
    card: {
      marginTop: 8,
    },
    badgeRow: {
      flexDirection: "row",
      gap: 8,
      flexWrap: "wrap",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <Text style={styles.header}>Prasanga UI</Text>
          <Text style={styles.subtitle}>
            Modern React Native UI Component Library
          </Text>
        </View>

        {/* Buttons Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Buttons</Text>
          <View style={styles.buttonRow}>
            <Button
              variant="primary"
              onPress={() => showToast("Primary button pressed!", "success")}
            >
              Primary
            </Button>
            <Button
              variant="secondary"
              onPress={() => showToast("Secondary button pressed!", "info")}
            >
              Secondary
            </Button>
          </View>
          <View style={styles.buttonRow}>
            <Button
              variant="outline"
              onPress={() => showToast("Outline button pressed!", "info")}
            >
              Outline
            </Button>
            <Button
              variant="ghost"
              onPress={() => showToast("Ghost button pressed!", "info")}
            >
              Ghost
            </Button>
          </View>
          <View style={styles.buttonRow}>
            <Button variant="default">Default</Button>
            <Button
              variant="destructive"
              onPress={() => showToast("Destructive action!", "error")}
            >
              Delete
            </Button>
          </View>
          <View style={styles.buttonRow}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </View>
        </View>

        {/* Input Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Input Fields</Text>
          <Input
            placeholder="Enter your name"
            label="Name"
            size="md"
          />
          <Input
            placeholder="Enter your email"
            label="Email"
            size="md"
            helperText="We'll never share your email"
          />
          <Input
            placeholder="Enter your password"
            label="Password"
            size="md"
            secureTextEntry
          />
          <Input
            placeholder="This field has an error"
            label="Error Field"
            error="This field is required"
            hasError
          />
        </View>

        {/* Card Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cards</Text>
          <Card>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: 8,
              }}
            >
              Card Title
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
                lineHeight: 20,
              }}
            >
              This is a card component with shadow, padding, and rounded corners.
              It can wrap any content you want.
            </Text>
          </Card>
          <Card shadow={false}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: 8,
              }}
            >
              Card without Shadow
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
              }}
            >
              This card has no shadow, just border and padding.
            </Text>
          </Card>
        </View>

        {/* Badge Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.badgeRow}>
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
          </View>
          <View style={styles.badgeRow}>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
          </View>
        </View>

        {/* Modal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modal</Text>
          <Button
            variant="primary"
            onPress={() => setModalVisible(true)}
          >
            Open Modal
          </Button>
          <Modal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="Welcome to Prasanga UI"
            closeButtonText="Got it!"
          >
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
                lineHeight: 20,
              }}
            >
              This is a reusable, accessible modal component. You can customize
              the title, content, and button text.
            </Text>
          </Modal>
        </View>

        {/* Toast Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Toast Notifications</Text>
          <View style={styles.buttonRow}>
            <Button
              size="sm"
              variant="primary"
              onPress={() => showToast("Success notification!", "success")}
            >
              Success
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onPress={() => showToast("Error occurred!", "error")}
            >
              Error
            </Button>
          </View>
          <View style={styles.buttonRow}>
            <Button
              size="sm"
              variant="outline"
              onPress={() => showToast("Information message", "info")}
            >
              Info
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onPress={() => showToast("Warning: Be careful!", "warning")}
            >
              Warning
            </Button>
          </View>
        </View>

        {/* Footer */}
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "#e5e7eb",
            paddingTop: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#9ca3af",
              textAlign: "center",
            }}
          >
            Prasanga UI Starter Kit v1.0.0
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#9ca3af",
              textAlign: "center",
              marginTop: 4,
            }}
          >
            Built with Expo, TypeScript, and NativeWind
          </Text>
        </View>
      </ScrollView>

      {toastVisible && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={3000}
          onDismiss={() => setToastVisible(false)}
        />
      )}
    </SafeAreaView>
  );
}
