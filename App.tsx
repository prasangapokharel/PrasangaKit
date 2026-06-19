import React, { useState } from "react";
import { ScrollView, SafeAreaView, View } from "react-native";
import {
  ThemeProvider,
  useTheme,
  Button,
  Card,
  Text,
  Badge,
  Stack,
  Container,
  Divider,
  Sheet,
  Drawer,
  Modal,
  Toast,
  Alert,
  Input,
  Tabs,
  Table,
  DatePicker,
  Switch,
  Checkbox,
  Slider,
  ProgressBar,
  Spinner,
} from "./src";

type DemoId =
  | "buttons"
  | "inputs"
  | "feedback"
  | "table"
  | "sheet"
  | "drawer"
  | "datepicker"
  | null;

function AppContent() {
  const { theme, colors, toggleTheme } = useTheme();
  const [activeDemo, setActiveDemo] = useState<DemoId>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [volume, setVolume] = useState(40);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const closeDemo = () => setActiveDemo(null);

  const demos = [
    { id: "buttons" as const, label: "Form", title: "Buttons" },
    { id: "inputs" as const, label: "Form", title: "Inputs & Controls" },
    { id: "feedback" as const, label: "Feedback", title: "Alerts & Progress" },
    { id: "table" as const, label: "Data", title: "Table" },
    { id: "sheet" as const, label: "Overlay", title: "Bottom Sheet" },
    { id: "drawer" as const, label: "Overlay", title: "Drawer" },
    { id: "datepicker" as const, label: "Form", title: "Date Picker" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal={20}
        paddingVertical={16}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: colors.card,
        }}
      >
        <Text variant="h4">Prasanga UI</Text>
        <Button variant="outline" size="sm" onPress={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"}
        </Button>
      </Container>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 48 }}
          showsVerticalScrollIndicator={false}
        >
          <Stack spacing={16}>
            <Stack spacing={8}>
              <Text variant="h1">Premium React Native UI</Text>
              <Text variant="body" color="muted">
                shadcn-inspired components with light and dark themes. Fully typed,
                scalable, and production-ready.
              </Text>
              <Stack direction="row" spacing={8} style={{ flexWrap: "wrap" }}>
                <Badge variant="primary">v1.4.0</Badge>
                <Badge variant="secondary">33 Components</Badge>
                <Badge variant="success">TypeScript</Badge>
              </Stack>
            </Stack>

            <Card shadow shadowIntensity="medium">
              <Tabs
                tabs={[
                  {
                    label: "Overview",
                    content: (
                      <Stack spacing={12}>
                        <Text variant="small" color="muted">
                          Tap a demo card below to explore components. Theme:{" "}
                          {theme === "light" ? "Light" : "Dark"}.
                        </Text>
                        <ProgressBar value={72} label="Library coverage" />
                        <Stack direction="row" spacing={12} alignItems="center">
                          <Switch
                            value={notifications}
                            onValueChange={setNotifications}
                          />
                          <Text variant="small">
                            Notifications {notifications ? "on" : "off"}
                          </Text>
                        </Stack>
                        <Checkbox
                          checked={agreed}
                          onPress={setAgreed}
                          label="Accept terms"
                        />
                        <Slider
                          label="Volume"
                          value={volume}
                          onValueChange={setVolume}
                        />
                      </Stack>
                    ),
                  },
                  {
                    label: "Stats",
                    content: (
                      <Stack spacing={12}>
                        {[
                          { n: "33+", l: "Components" },
                          { n: "2", l: "Themes" },
                          { n: "100%", l: "Typed" },
                        ].map((s) => (
                          <Card key={s.l} shadow={false} padding={12}>
                            <Text variant="h3">{s.n}</Text>
                            <Text variant="caption" color="muted">
                              {s.l}
                            </Text>
                          </Card>
                        ))}
                      </Stack>
                    ),
                  },
                ]}
              />
            </Card>

            <Divider />

            <Text variant="h4">Component demos</Text>
            <Stack spacing={12}>
              {demos.map((demo) => (
                <Card key={demo.id} shadow shadowIntensity="subtle" padding={16}>
                  <Stack spacing={8}>
                    <Badge variant="default">{demo.label}</Badge>
                    <Text variant="h4">{demo.title}</Text>
                    <Button
                      variant="primary"
                      size="sm"
                      onPress={() => {
                        setActiveDemo(demo.id);
                        showToast(`Opened ${demo.title}`);
                      }}
                    >
                      View demo
                    </Button>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Stack>
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={activeDemo === "buttons"}
        onClose={closeDemo}
        title="Button variants"
      >
        <Stack spacing={8}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </Stack>
      </Modal>

      <Modal
        visible={activeDemo === "inputs"}
        onClose={closeDemo}
        title="Form inputs"
      >
        <Stack spacing={4}>
          <Input
            label="Name"
            placeholder="Your name"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <Input label="Email" placeholder="you@example.com" />
        </Stack>
      </Modal>

      <Modal visible={activeDemo === "feedback"} onClose={closeDemo} title="Feedback">
        <Stack spacing={8}>
          <Alert type="info" title="Info" message="Theme-aware alert component" />
          <Alert type="success" title="Success" message="Action completed" />
          <ProgressBar value={55} />
          <Spinner label="Loading…" size="small" />
        </Stack>
      </Modal>

      <Modal visible={activeDemo === "table"} onClose={closeDemo} title="Data table">
        <Table
          columns={[
            { key: "name", title: "Name" },
            { key: "status", title: "Status" },
            { key: "value", title: "Value", align: "right" },
          ]}
          data={[
            { id: 1, name: "Product A", status: "Active", value: 1200 },
            { id: 2, name: "Product B", status: "Draft", value: 800 },
            { id: 3, name: "Product C", status: "Active", value: 1500 },
          ]}
          striped
          bordered
        />
      </Modal>

      <Sheet isOpen={activeDemo === "sheet"} onClose={closeDemo} title="Bottom sheet">
        <Stack spacing={12}>
          <Text variant="body" color="muted">
            Drag down or tap outside to dismiss.
          </Text>
          <Button variant="primary" onPress={closeDemo}>
            Close
          </Button>
        </Stack>
      </Sheet>

      <Drawer isOpen={activeDemo === "drawer"} onClose={closeDemo} title="Navigation">
        <Stack spacing={8}>
          <Button variant="ghost" onPress={closeDemo}>
            Home
          </Button>
          <Button variant="ghost" onPress={closeDemo}>
            Settings
          </Button>
          <Button variant="outline" onPress={closeDemo}>
            Close drawer
          </Button>
        </Stack>
      </Drawer>

      <Modal visible={activeDemo === "datepicker"} onClose={closeDemo} title="Date picker">
        <Stack spacing={12}>
          <Text variant="body" color="muted">
            Selected: {selectedDate.toLocaleDateString()}
          </Text>
          <Button variant="primary" onPress={() => setDatePickerVisible(true)}>
            Open calendar
          </Button>
        </Stack>
      </Modal>

      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        visible={datePickerVisible}
        onClose={() => setDatePickerVisible(false)}
      />

      <Toast
        visible={toastVisible}
        message={toastMessage}
        type="success"
        onDismiss={() => setToastVisible(false)}
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
