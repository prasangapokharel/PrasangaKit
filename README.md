# Prasanga UI - React Native Component Library

A professional React Native UI component library with **33+ fully-typed, theme-aware components** built with **Expo** and **TypeScript**. Features dark/light mode support using shadcn design system colors.

**Website**: https://prasangakit.smmv.shop

---

## 🚀 Quick Start (One Command)

```bash
npx prasanga-init MyNewApp
cd MyNewApp
npm install
npx expo start
```

That's it! Your new Expo app with all 33+ components is ready to build. 

Scan the QR code with Expo Go app to see it running on your phone!

---

## ✨ What You Get

- **33+ UI Components** - Fully-typed with TypeScript
- **Dark/Light Theme** - Automatic theme switching with shadcn colors
- **Professional Demo** - See all components in action
- **Production Ready** - Everything pre-configured
- **Zero Setup** - Just run the command above
- **Official API** - https://prasangakit.smmv.shop

---

## 📱 33+ Components Included

### Form Components (9)
- **Button** - 6 variants (primary, secondary, outline, ghost, destructive, default) + 3 sizes
- **Input** - Text input with labels, errors, and helpers
- **Textarea** - Multi-line text input with custom rows
- **Checkbox** - Custom styled checkboxes with labels
- **Radio** - Radio button groups with horizontal/vertical layout
- **Switch** - Animated toggle switches
- **Select** - Modal dropdown with single/multi-select
- **Slider** - Range input with value display
- **Stepper** - Increment/decrement control
- **DatePicker** - Interactive calendar date selection

### Progress Components (2)
- **ProgressBar** - Linear progress indicator with labels
- **CircularProgress** - Circular progress indicator

### Feedback & Overlay (5)
- **Alert** - 4 types (success, warning, error, info)
- **Toast** - Notifications with auto-dismiss
- **Modal** - Customizable dialogs
- **Spinner** - Loading indicator
- **Tooltip** - Contextual help text
- **Sheet** - Bottom sheet overlay

### Layout Components (4)
- **Container** - Flexible spacing and alignment wrapper
- **Stack** - Row/column layout with gap support
- **Grid** - Multi-column responsive layout
- **Divider** - Horizontal/vertical separator

### Display Components (6)
- **Card** - Flexible container with shadow options
- **Badge** - 6 variants (default, primary, secondary, destructive, success, warning)
- **Avatar** - Profile images with initials fallback
- **Text** - Typography component (h1-h4, body, small, caption)
- **Image** - Responsive image component
- **List** - List items with separators and icons
- **Table** - Responsive data table with sorting

### Navigation & Interaction (3)
- **Tabs** - Tab navigation with smooth transitions
- **Accordion** - Expandable sections
- **Drawer** - Side panel with swipe support and responsive sizing
- **Popover** - Contextual popover menus

**Total: 33+ Components** - All fully typed with TypeScript and theme-aware

---

## 🎯 Usage Examples

### Basic Button

```tsx
import { Button } from 'prasanga-ui';

export default function App() {
  return (
    <Button variant="primary" onPress={() => console.log('Pressed!')}>
      Click Me
    </Button>
  );
}
```

### Form Inputs

```tsx
import { Input, Textarea, Select } from 'prasanga-ui';
import { useState } from 'react';

export default function FormExample() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [option, setOption] = useState('opt1');

  return (
    <>
      <Input
        label="Full Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Textarea
        label="Message"
        placeholder="Type your message"
        value={message}
        onChangeText={setMessage}
        rows={4}
      />
      <Select
        label="Choose Option"
        value={option}
        onValueChange={setOption}
        options={[
          { label: 'Option 1', value: 'opt1' },
          { label: 'Option 2', value: 'opt2' },
        ]}
      />
    </>
  );
}
```

### Modal Dialog

```tsx
import { Modal, Button } from 'prasanga-ui';
import { useState } from 'react';

export default function ModalExample() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>Open Modal</Button>
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        title="Welcome!"
      >
        <Text>This is a modal dialog content.</Text>
      </Modal>
    </>
  );
}
```

### Toast Notifications

```tsx
import { Toast, Button } from 'prasanga-ui';
import { useState } from 'react';

export default function ToastExample() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>Show Toast</Button>
      {visible && (
        <Toast
          message="Success! Action completed."
          type="success"
          duration={3000}
          onDismiss={() => setVisible(false)}
        />
      )}
    </>
  );
}
```

---

## 🛠️ Component Variants

### Button Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="default">Default</Button>

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Badge Variants

```tsx
<Badge variant="default">Draft</Badge>
<Badge variant="primary">New</Badge>
<Badge variant="secondary">Hot</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="success">Verified</Badge>
<Badge variant="warning">Pending</Badge>
```

### Alert Types

```tsx
<Alert type="success" title="Success!" message="Operation completed" />
<Alert type="error" title="Error!" message="Something went wrong" />
<Alert type="warning" title="Warning!" message="Please review" />
<Alert type="info" title="Info!" message="Here's some info" />
```

---

## 📁 Project Structure

```
PrasangaKit/
├── src/
│   ├── components/ui/              # All 33+ UI components
│   │   ├── button.tsx              # Button with variants
│   │   ├── input.tsx               # Text input
│   │   ├── card.tsx                # Card container
│   │   ├── modal.tsx               # Modal dialog
│   │   ├── sheet.tsx               # Bottom sheet
│   │   ├── drawer.tsx              # Drawer panel
│   │   ├── table.tsx               # Data table
│   │   ├── badge.tsx               # Badge labels
│   │   ├── avatar.tsx              # Avatar images
│   │   └── ... (23+ more components)
│   ├── lib/
│   │   ├── theme.ts                # Light/dark color palettes
│   │   ├── theme-context.tsx       # Theme provider & useTheme hook
│   │   └── utils.ts                # Helper functions
│   └── index.ts                    # Main exports (all components)
├── App.tsx                         # Home page demo
├── app.json                        # Expo config
├── babel.config.js                 # Babel config
├── tsconfig.json                   # TypeScript config
├── package.json                    # Dependencies
└── README.md                       # This file
```

**For Component Library Use** (`npm install prasanga-ui`):
- Only the `src/` folder is exported
- All components available via `import { Button, Card, ... } from 'prasanga-ui'`

**For Starter Kit Use** (`npx prasanga-init MyApp`):
- Full project template with all dependencies configured
- Includes working demo pages and examples

---

## 🎨 Theme System

Prasanga UI includes a built-in dark/light theme system using shadcn design colors.

### Using the Theme

```tsx
import { useTheme } from 'prasanga-ui';

export default function MyComponent() {
  const { theme, colors, toggleTheme } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.foreground }}>
        Current theme: {theme}
      </Text>
      <Button onPress={toggleTheme}>
        Toggle Theme
      </Button>
    </View>
  );
}
```

### Theme Colors (Light & Dark)

**Light Theme**:
- Background: `#ffffff`
- Foreground: `#0f172a`
- Primary: `#3b82f6`

**Dark Theme**:
- Background: `#0f172a`
- Foreground: `#f8fafc`
- Primary: `#60a5fa`

All components automatically adapt to the selected theme using the `useTheme()` hook.

### Color Palette

The complete shadcn color palette is available in `src/lib/theme.ts`:

```tsx
const lightColors = {
  background: '#ffffff',
  foreground: '#0f172a',
  primary: '#3b82f6',
  secondary: '#6366f1',
  success: '#10b981',
  warning: '#f59e0b',
  destructive: '#ef4444',
  // ... and more
};

const darkColors = {
  background: '#0f172a',
  foreground: '#f8fafc',
  primary: '#60a5fa',
  secondary: '#818cf8',
  success: '#34d399',
  warning: '#fbbf24',
  destructive: '#f87171',
  // ... and more
};
```

---

## 🔧 Configuration

### Theme Configuration

The theme system is configured in `src/lib/theme.ts` and uses a Context API provider.

**Setup in App.tsx:**

```tsx
import { ThemeProvider } from 'prasanga-ui';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        {/* Your app here */}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
```

### TypeScript Configuration

All components include full TypeScript support with proper type definitions. Configuration is in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020"],
    "jsx": "react-native",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "bundler"
  }
}
```

### Babel Configuration

Configured for Expo in `babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

---

## 📝 TypeScript Support

All components are fully typed with TypeScript:

```tsx
import { Button, type ButtonVariant } from 'prasanga-ui';

const variants: ButtonVariant[] = ['primary', 'secondary', 'outline'];

// Full type safety and autocomplete
<Button variant="primary" onPress={() => {}}>
  Click
</Button>
```

---

## 🎨 Customization

### Custom Styling

All components accept React Native style props for customization:

```tsx
import { Card, Text, Button } from 'prasanga-ui';

export default function CustomExample() {
  return (
    <Card style={{ 
      backgroundColor: '#f5f5f5', 
      paddingHorizontal: 20,
      borderRadius: 12
    }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        Custom Card
      </Text>
      <Button
        variant="primary"
        style={{ borderRadius: 8, marginTop: 12 }}
      >
        Custom Button
      </Button>
    </Card>
  );
}
```

### Customize Theme Colors

To customize theme colors, edit `src/lib/theme.ts`:

```tsx
export const LIGHT_COLORS = {
  background: '#ffffff',
  foreground: '#0f172a',
  primary: '#YOUR_COLOR',        // Change this
  secondary: '#YOUR_COLOR',      // Change this
  success: '#10b981',
  warning: '#f59e0b',
  destructive: '#ef4444',
  // ... more colors
};

export const DARK_COLORS = {
  background: '#0f172a',
  foreground: '#f8fafc',
  primary: '#YOUR_DARK_COLOR',   // Change this
  // ... rest of dark colors
};
```

Then restart your app - all components will update automatically.

---

## 📚 API Reference

### Button

```tsx
<Button
  variant="primary"      // 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'default'
  size="md"              // 'sm' | 'md' | 'lg'
  disabled={false}
  onPress={() => {}}
>
  Label
</Button>
```

### Input

```tsx
<Input
  label="Name"
  placeholder="Enter name"
  value={text}
  onChangeText={setText}
  error="Error message"
  hasError={false}
  disabled={false}
/>
```

### Card

```tsx
<Card style={{ shadow: 'large' }}>
  <Text>Content</Text>
</Card>
```

### Modal

```tsx
<Modal
  visible={true}
  onClose={() => {}}
  title="Title"
  closeButtonText="Close"
>
  <Text>Modal content</Text>
</Modal>
```

### Toast

```tsx
<Toast
  message="Success!"
  type="success"         // 'success' | 'error' | 'info' | 'warning'
  duration={3000}
  onDismiss={() => {}}
/>
```

---

## 🌐 API Endpoint

Access the Prasanga UI documentation and API at:

- **Website**: https://prasangakit.smmv.shop
- **API Endpoint**: https://prasangakit.smmv.shop
- **Documentation**: https://prasangakit.smmv.shop/docs

The API endpoint is configured in your `package.json`:

```json
{
  "api": {
    "endpoint": "https://prasangakit.smmv.shop",
    "docs": "https://prasangakit.smmv.shop/docs"
  }
}
```

You can access it programmatically:

```tsx
import { readFileSync } from 'fs';
import { resolve } from 'path';

const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, 'package.json'), 'utf8')
);

const apiEndpoint = packageJson.api.endpoint;
// https://prasangakit.smmv.shop
```

---

## 📦 Dependencies

Core packages included:
- **Expo** ~54.0.33 - React Native framework
- **React** 19.1.0 - UI library
- **React Native** 0.81.5 - Mobile framework
- **TypeScript** ~5.9.2 - Full type safety

All dependencies are pre-installed when you run `npx prasanga-init`.

---

## 🎓 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prasanga Website](https://prasangakit.smmv.shop)

---

## 📄 License

MIT - Feel free to use in personal and commercial projects.

---

## 👤 Author

**Prasanga Pokharel**

- GitHub: [@prasangapokharel](https://github.com/prasangapokharel)
- Website: https://prasangakit.smmv.shop

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests to:
- Main repo: [PrasangaKit](https://github.com/prasangapokharel/PrasangaKit)
- Template repo: [prasanga-init](https://github.com/prasangapokharel/prasanga-init)

---

## 🎉 Get Started Now

```bash
npx prasanga-init MyNewApp
cd MyNewApp
npm install
npx expo start
```

Scan the QR code with Expo Go app to see it running on your phone!

---

**Made with for React Native developers**
