import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Image as RNImage,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import {
  ThemeProvider,
  useTheme,
  Text,
  Button,
  Stack,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
  Input,
  Label,
  Table,
  Badge,
  DatePicker,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  useLayoutMetrics,
  radii,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AspectRatio,
  ButtonGroup,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  Field,
  FieldGroup,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "prasanga-ui";

const FRAMEWORKS = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const;

const PAYMENTS = [
  { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
  { id: "489e1d42", amount: 125, status: "processing", email: "example@gmail.com" },
  { id: "a1b2c3d4", amount: 250, status: "success", email: "paid@example.com" },
  { id: "e5f6g7h8", amount: 50, status: "failed", email: "fail@example.com" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <Card shadow shadowIntensity="subtle" style={styles.section}>
      <View style={[styles.sectionHeader, { borderBottomColor: colors.border }]}>
        <Text variant="h4">{title}</Text>
      </View>
      <View style={styles.sectionBody}>{children}</View>
    </Card>
  );
}

function ButtonSizeDemo() {
  const { colors } = useTheme();
  const icon = <Feather name="arrow-up-right" size={14} color={colors.foreground} />;

  const rows: { label: string; size: "xs" | "sm" | "md" | "lg"; iconSize: "icon-xs" | "icon-sm" | "icon" | "icon-lg" }[] = [
    { label: "Extra Small", size: "xs", iconSize: "icon-xs" },
    { label: "Small", size: "sm", iconSize: "icon-sm" },
    { label: "Default", size: "md", iconSize: "icon" },
    { label: "Large", size: "lg", iconSize: "icon-lg" },
  ];

  return (
    <Stack spacing={12}>
      {rows.map((row) => (
        <Stack key={row.label} direction="row" spacing={8} style={styles.wrapRow}>
          <Button size={row.size} variant="outline">
            {row.label}
          </Button>
          <Button size={row.iconSize} variant="outline" accessibilityLabel="Submit">
            {icon}
          </Button>
        </Stack>
      ))}
    </Stack>
  );
}

function AppContent() {
  const { theme, colors, toggleTheme } = useTheme();
  const { width } = useWindowDimensions();
  const layout = useLayoutMetrics();
  const [page, setPage] = useState(2);
  const [date, setDate] = useState<Date | undefined>();
  const [dateOpen, setDateOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [framework, setFramework] = useState("");
  const [menuLabel, setMenuLabel] = useState("personal");
  const [dialogName, setDialogName] = useState("Pedro Duarte");
  const [dialogUsername, setDialogUsername] = useState("@peduarte");
  const contentWidth = Math.min(width - layout.horizontalPadding * 2, 560);

  const statusVariant = (status: string): "default" | "primary" | "success" | "destructive" => {
    if (status === "success") return "success";
    if (status === "failed") return "destructive";
    if (status === "processing") return "primary";
    return "default";
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBar}>
          <Text variant="h4">Prasanga UI</Text>
          <Button variant="ghost" size="sm" onPress={toggleTheme}>
            {theme === "light" ? "Dark" : "Light"}
          </Button>
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            { paddingHorizontal: layout.horizontalPadding, maxWidth: contentWidth + layout.horizontalPadding * 2, alignSelf: "center", width: "100%" },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Card shadow shadowIntensity="premium" style={styles.heroCard}>
            <AspectRatio ratio={16 / 9}>
              <RNImage
                source={require("./assets/images/image.png")}
                style={StyleSheet.absoluteFillObject}
                resizeMode="cover"
              />
            </AspectRatio>
            <CardHeader style={styles.heroHeader}>
              <CardTitle>Welcome to Prasanga!</CardTitle>
              <CardDescription>
                The #1 UI component library for React Native apps — shadcn-inspired, fully typed,
                and theme-aware.
              </CardDescription>
            </CardHeader>
          </Card>

          <Section title="Button sizes">
            <ButtonSizeDemo />
          </Section>

          <Section title="Accordion">
            <Accordion type="single" collapsible defaultValue="shipping">
              <AccordionItem value="shipping">
                <AccordionTrigger>What are your shipping options?</AccordionTrigger>
                <AccordionContent>
                  We offer standard (5–7 days), express (2–3 days), and overnight shipping. Free
                  shipping on international orders.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="returns">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  Returns accepted within 30 days. Items must be unused and in original packaging.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="support">
                <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                <AccordionContent>
                  Reach us via email, live chat, or phone. We respond within 24 hours on business
                  days.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>

          <Section title="Avatar">
            <Stack direction="row" spacing={16} style={styles.wrapRow}>
              <Avatar>
                <AvatarImage source={require("./assets/images/image.png")} />
                <AvatarFallback>PP</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>ER</AvatarFallback>
                <AvatarBadge />
              </Avatar>
              <AvatarGroup>
                <Avatar size="sm">
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+3</AvatarGroupCount>
              </AvatarGroup>
            </Stack>
          </Section>

          <Section title="Card">
            <Card style={{ width: "100%", maxWidth: 380, alignSelf: "center" }}>
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                  <Button variant="link" size="sm">
                    Sign Up
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <Stack spacing={16}>
                  <View>
                    <Label>Email</Label>
                    <Input
                      placeholder="m@example.com"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  <View>
                    <Label>Password</Label>
                    <Input
                      placeholder="••••••••"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                  </View>
                </Stack>
              </CardContent>
              <CardFooter>
                <Button variant="primary" fullWidth>
                  Login
                </Button>
                <Button variant="outline" fullWidth>
                  Login with Google
                </Button>
              </CardFooter>
            </Card>
          </Section>

          <Section title="Date picker">
            <Button
              variant="outline"
              onPress={() => setDateOpen(true)}
              rightIcon={<Feather name="chevron-down" size={16} color={colors.foreground} />}
              style={{ alignSelf: "flex-start" }}
            >
              {date ? date.toLocaleDateString(undefined, { dateStyle: "long" }) : "Pick a date"}
            </Button>
            <DatePicker
              value={date ?? new Date()}
              onChange={(d) => {
                setDate(d);
                setDateOpen(false);
              }}
              visible={dateOpen}
              onClose={() => setDateOpen(false)}
            />
          </Section>

          <Section title="Table">
            <Table
              columns={[
                { key: "id", title: "ID" },
                { key: "status", title: "Status", render: (v) => <Badge variant={statusVariant(v)}>{v}</Badge> },
                { key: "email", title: "Email" },
                { key: "amount", title: "Amount", align: "right", render: (v) => `$${v}` },
              ]}
              data={PAYMENTS}
              striped
              bordered
            />
          </Section>

          <Section title="Dropdown menu">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" style={{ alignSelf: "flex-start" }}>
                  Open
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Text variant="small">Profile</Text>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Text variant="small">Billing</Text>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Text variant="small">Settings</Text>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Text variant="small">Team</Text>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Text variant="small">API</Text>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Text variant="small">Log out</Text>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Section>

          <Section title="Pagination">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onPress={() => setPage((p) => Math.max(1, p - 1))} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive={page === 1} onPress={() => setPage(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive={page === 2} onPress={() => setPage(2)}>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive={page === 3} onPress={() => setPage(3)}>
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onPress={() => setPage((p) => p + 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </Section>

          <Section title="Alert dialog">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" style={{ alignSelf: "flex-start" }}>
                  Show Dialog
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account from our
                    servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction variant="destructive">Continue</AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Section>

          <Section title="Aspect ratio">
            <AspectRatio ratio={16 / 9} style={{ maxWidth: 320, alignSelf: "center", width: "100%" }}>
              <RNImage
                source={require("./assets/images/image.png")}
                style={StyleSheet.absoluteFillObject}
                resizeMode="cover"
              />
            </AspectRatio>
          </Section>

          <Section title="Button group">
            <Stack spacing={12}>
              <Stack direction="row" spacing={8} style={styles.wrapRow}>
                <ButtonGroup>
                  <Button variant="ghost" size="icon" accessibilityLabel="Go back">
                    <Feather name="arrow-left" size={16} color={colors.foreground} />
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button variant="ghost">Archive</Button>
                  <Button variant="ghost">Report</Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button variant="ghost">Snooze</Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" accessibilityLabel="More">
                        <Feather name="more-horizontal" size={16} color={colors.foreground} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" style={{ width: 180 }}>
                      <DropdownMenuItem>
                        <Feather name="mail" size={14} color={colors.foreground} />
                        <Text variant="small">Mark as Read</Text>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <Text variant="small">Label as…</Text>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuRadioGroup value={menuLabel} onValueChange={setMenuLabel}>
                            <DropdownMenuRadioItem value="personal">Personal</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="work">Work</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="other">Other</DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        <Feather name="trash-2" size={14} color={colors.destructive} />
                        <Text variant="small" color="error">
                          Trash
                        </Text>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </ButtonGroup>
              </Stack>
            </Stack>
          </Section>

          <Section title="Carousel">
            <Carousel>
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardContent style={{ aspectRatio: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text variant="h1">{index + 1}</Text>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </Section>

          <Section title="Collapsible">
            <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen} style={{ maxWidth: 350 }}>
              <View style={styles.collapsibleRow}>
                <Text variant="small" style={{ fontWeight: "600" }}>
                  Order #4189
                </Text>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon" accessibilityLabel="Toggle details">
                    <Feather name="chevrons-down" size={16} color={colors.foreground} />
                  </Button>
                </CollapsibleTrigger>
              </View>
              <View style={[styles.collapsibleRow, styles.collapsibleBorder, { borderColor: colors.border }]}>
                <Text variant="small" color="muted">
                  Status
                </Text>
                <Text variant="small" style={{ fontWeight: "600" }}>
                  Shipped
                </Text>
              </View>
              <CollapsibleContent>
                <View style={[styles.collapsibleBorder, { borderColor: colors.border, padding: 12 }]}>
                  <Text variant="small" style={{ fontWeight: "600" }}>
                    Shipping address
                  </Text>
                  <Text variant="small" color="muted">
                    100 Market St, San Francisco
                  </Text>
                </View>
                <View style={[styles.collapsibleBorder, { borderColor: colors.border, padding: 12 }]}>
                  <Text variant="small" style={{ fontWeight: "600" }}>
                    Items
                  </Text>
                  <Text variant="small" color="muted">
                    2x Studio Headphones
                  </Text>
                </View>
              </CollapsibleContent>
            </Collapsible>
          </Section>

          <Section title="Combobox">
            <Combobox items={FRAMEWORKS} value={framework} onValueChange={setFramework}>
              <ComboboxInput placeholder="Select a framework" />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Section>

          <Section title="Dialog">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" style={{ alignSelf: "flex-start" }}>
                  Open Dialog
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <Label>Name</Label>
                    <Input value={dialogName} onChangeText={setDialogName} />
                  </Field>
                  <Field>
                    <Label>Username</Label>
                    <Input value={dialogUsername} onChangeText={setDialogUsername} />
                  </Field>
                </FieldGroup>
                <DialogFooter style={{ flexDirection: "column", gap: 8 }}>
                  <Button variant="primary" fullWidth>
                    Save changes
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline" fullWidth>
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Section>

          <Section title="Empty">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Feather name="folder" size={22} color={colors.mutedForeground} />
                </EmptyMedia>
                <EmptyTitle>No Projects Yet</EmptyTitle>
                <EmptyDescription>
                  You haven&apos;t created any projects yet. Get started by creating your first
                  project.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="primary" size="sm">
                  Create Project
                </Button>
                <Button variant="outline" size="sm">
                  Import Project
                </Button>
              </EmptyContent>
              <Button variant="link" size="sm">
                Learn More →
              </Button>
            </Empty>
          </Section>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safeArea: { flex: 1 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  scroll: {
    paddingBottom: 48,
    gap: 16,
  },
  heroCard: {
    overflow: "hidden",
    marginBottom: 8,
  },
  heroHeader: {
    paddingTop: 20,
  },
  collapsibleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  collapsibleBorder: {
    borderWidth: 1,
    borderRadius: radii.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  section: {
    marginBottom: 0,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  sectionBody: {
    padding: 16,
  },
  wrapRow: {
    flexWrap: "wrap",
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
