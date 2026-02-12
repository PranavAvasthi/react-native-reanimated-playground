# Reanimated Playground

An interactive learning app for **React Native Reanimated**. Explore animations, gestures, and patterns through runnable examples—each with a short description, code snippet, and a live demo.

Built with [Expo](https://expo.dev) and [file-based routing](https://docs.expo.dev/router/introduction/).

---

## Get started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the app**

   ```bash
   npx expo start
   ```

   Then open the app in a [development build](https://docs.expo.dev/develop/development-builds/introduction/), [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/), or [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/). For the best Reanimated experience, use a dev build or simulator rather than Expo Go.

---

## Project structure

```
├── app/                    # Expo Router screens
│   ├── _layout.tsx         # Root layout (GestureHandler, etc.)
│   ├── index.tsx           # Home: list of animation sections
│   └── animations/         # One folder per section
│       ├── _layout.tsx     # Stack navigator for all sections
│       ├── basics/         # Section: Basics
│       ├── timing/
│       ├── spring/
│       ├── derived/
│       ├── interpolate/
│       ├── gestures/
│       ├── patterns/
│       ├── scroll/
│       ├── layout/
│       ├── list/
│       └── advanced/
├── components/             # Demo components (by section)
│   ├── basics/
│   ├── timing/
│   ├── spring/
│   ├── derived/
│   ├── interpolate/
│   ├── gestures/
│   ├── patterns/
│   ├── scroll/
│   ├── layout/
│   ├── list/
│   └── advanced/
├── constants/
│   └── routes.ts           # Central route constants
└── package.json
```

Each **section** (e.g. `animations/basics`) has:

- **`_layout.tsx`** – Stack with `index` and all demo screens.
- **`index.tsx`** – Section home: back bar, title, and cards linking to each demo.
- **`<demo-name>.tsx`** – Demo screen: back bar, title, description, code snippet, and the demo component from `components/<section>/`.

---

## Sections and demos

| Section         | What you’ll see                                                                                                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Basics**      | Translate, opacity, scale/rotate, multiple transforms. Core shared values and `useAnimatedStyle`.                                                                                                         |
| **Timing**      | `withTiming`, easing, sequence, delay/repeat, interruption.                                                                                                                                               |
| **Spring**      | `withSpring`, configs, overshoot, gesture + spring, chaining, comparison with timing.                                                                                                                     |
| **Derived**     | `useDerivedValue`: basics, opacity, clamp, chain, gesture-driven.                                                                                                                                         |
| **Interpolate** | `interpolate` / `interpolateColor`: ranges, clamp, multi-step, scroll, color.                                                                                                                             |
| **Gestures**    | Pan basics, drag with boundaries, swipe to dismiss, gesture + spring, snap points, gesture vs state.                                                                                                      |
| **Patterns**    | Toggle, progress-driven, gesture-driven, state machine, animation hook, compound animation.                                                                                                               |
| **Scroll**      | Scroll basics, collapsing header, parallax image, progress, driven tabs, scroll vs state.                                                                                                                 |
| **Layout**      | Layout animation basics, enter/exit, expand-collapse, reorder, layout vs manual.                                                                                                                          |
| **List**        | Enter/exit, reorder, swipe to delete, animated FlatList, large list performance, list vs layout.                                                                                                          |
| **Advanced**    | Orchestration (sequence/parallel), interruptible animations, physics tuning, animated state machine, cross-component sync, gesture velocity prediction, `useAnimatedReaction`, animation controller hook. |

---

## Tech stack

- **Expo** (~54) + **Expo Router** (file-based routing)
- **React Native** + **React** 19
- **react-native-reanimated** – UI-thread animations, shared values, worklets
- **react-native-gesture-handler** – Pan, drag, swipe gestures
- **NativeWind** (Tailwind-style styling)

---

## Learn more

- [Reanimated docs](https://docs.swmansion.com/react-native-reanimated/)
- [Expo documentation](https://docs.expo.dev/)
- [Expo Router introduction](https://docs.expo.dev/router/introduction/)
