// ===== Theme =====
export { ThemeProvider, useTheme } from "./lib/theme-context";
export { getTheme, lightTheme, darkTheme, createShadows } from "./lib/theme";
export type { Theme, ThemeColors } from "./lib/theme";
export { typography } from "./lib/typography";

// ===== Core Form Components =====
export { default as Button, type ButtonVariant, type ButtonSize } from "./components/ui/button";
export { default as Input, type InputSize } from "./components/ui/input";
export { default as Label } from "./components/ui/label";
export { default as Textarea } from "./components/ui/textarea";
export { default as Checkbox } from "./components/ui/checkbox";
export { default as Radio } from "./components/ui/radio";
export { default as Switch } from "./components/ui/switch";
export { default as Select } from "./components/ui/select";
export { default as Slider } from "./components/ui/slider";
export { default as Stepper } from "./components/ui/stepper";

// ===== Progress Components =====
export { default as ProgressBar } from "./components/ui/progress-bar";
export { default as CircularProgress } from "./components/ui/circular-progress";

// ===== Feedback & Overlay Components =====
export { default as Alert, type AlertType } from "./components/ui/alert";
export { default as Spinner } from "./components/ui/spinner";
export { default as Tooltip } from "./components/ui/tooltip";
export { default as Toast, type ToastType } from "./components/ui/toast";
export { default as Modal } from "./components/ui/modal";
export {
  default as Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./components/ui/dialog";
export {
  default as AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./components/ui/alert-dialog";
export { default as Sheet } from "./components/ui/sheet";
export {
  default as Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerLegacy,
  type DrawerProps,
  type DrawerContentProps,
  type DrawerDirection,
  type LegacyDrawerProps,
} from "./components/ui/drawer";
export {
  default as Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverLegacy,
} from "./components/ui/popover";
export {
  default as DropdownMenu,
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
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "./components/ui/dropdown-menu";
export { default as DatePicker } from "./components/ui/date-picker";
export {
  default as Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "./components/ui/combobox";

// ===== Layout Components =====
export { default as Container } from "./components/ui/container";
export { default as Stack } from "./components/ui/stack";
export { default as Grid } from "./components/ui/grid";
export { default as Divider } from "./components/ui/divider";
export { default as AspectRatio } from "./components/ui/aspect-ratio";
export { default as ButtonGroup } from "./components/ui/button-group";
export { default as Field, FieldGroup } from "./components/ui/field";
export {
  default as Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./components/ui/collapsible";

// ===== Display Components =====
export {
  default as Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./components/ui/card";
export { default as Badge, type BadgeVariant } from "./components/ui/badge";
export {
  default as Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
  LegacyAvatar,
} from "./components/ui/avatar";
export { default as Text } from "./components/ui/text";
export { default as Image } from "./components/ui/image";
export {
  default as Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "./components/ui/empty";
export { default as List } from "./components/ui/list";
export { default as Table, type TableColumn, type TableRow } from "./components/ui/table";

// ===== Navigation Components =====
export { default as Tabs } from "./components/ui/tabs";
export {
  default as Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionLegacy,
} from "./components/ui/accordion";
export {
  default as Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./components/ui/pagination";
export {
  default as Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./components/ui/carousel";

// ===== Utilities =====
export { cn, withOpacity, getPlatformShadows, platformSpecificStyles, borderRadius, spacing } from "./lib/utils";
export { radii } from "./lib/radius";
export type { Radii } from "./lib/radius";
export { getBreakpoint, useLayoutMetrics } from "./lib/layout";
export type { Breakpoint } from "./lib/layout";
