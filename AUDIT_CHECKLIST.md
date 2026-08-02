# bna-ui Modernization — Fix Checklist

Condensed from `AUDIT.md` (79-item audit of `packages/registry/src/`, dated
2026-08-02) for use while actually making the fixes. Work top-to-bottom by
phase — phases are dependency-ordered (e.g. Phase 5's chart `useMemo` pass rides
along with Phase 0's hook-extraction refactor since both touch the same render
code; doing them out of order duplicates work). Check items off as you go. If a
one-line item isn't enough context, search `AUDIT.md` §5 for the component name —
that row has the full prop-level detail, a code sketch, and doc citations.

## Snapshot

- 78/79 items have zero real `accessibility*` props (only `file-picker` does).
- 0/79 items have any component-level test.
- 15/17 data-viz charts call `useAnimatedProps`/`useAnimatedStyle` inside a
  render-loop `.map()` — will crash ("Rendered more/fewer hooks...") the moment
  a dataset's length changes between renders. Highest-impact finding, P0.
- `meta.ts` "Accessibility" sections assert compliance that doesn't exist in
  code in 40+ of 79 items — not just missing, actively false.
- `semanticColors` (success/warning/info/error) is exported from `colors.ts`
  but never merged into `Colors` — unreachable via `useColor`, zero consumers.

---

## Phase 0 — Stop the bleeding (real bugs, do first)

- [x] **15 charts — Rules-of-Hooks violation**: `useAnimatedProps`/`useAnimatedStyle`
      called inside a `.map()`/`Array.from()` render loop instead of at a
      subcomponent's top level → extract the per-item render into its own
      subcomponent so the hook runs once per **mounted instance**, not once per
      loop iteration. Same shape everywhere, no public `Props` change:
      `const AnimatedX = ({item, progress}) => { const animatedProps = useAnimatedProps(() => ({...})); return <Animated.Path animatedProps={animatedProps} />; }`
      Affected: `line-chart` (area-chart inherits it), `stacked-area-chart`,
      `column-chart`, `stacked-bar-chart` (2 levels nested — worst fragility),
      `bar-chart`, `pie-chart`, `doughnut-chart`, `polar-area-chart`,
      `radial-bar-chart`, `radar-chart` (per-vertex only; main-area hook is fine),
      `scatter-chart`, `bubble-chart`, `candlestick-chart` (2 hooks/candle — worst
      per-item multiplier), `heatmap-chart` (rows×cols — worst overall
      multiplier), `treemap-chart`. Not affected: `progress-ring-chart`,
      `chart-container`.
- [x] **`tabs.tsx`**: `allTabContents`, a mutable object, is declared at
      **module scope** and mutated by every mounted instance; live by default
      since `enableSwipe` defaults `true` → move it into component-scoped state
      (`useRef`/context owned by the `Tabs` provider). Two `Tabs` with overlapping
      `value` strings on screen (or a lingering navigator stack) currently corrupt
      each other's content and leak references forever.
- [x] **`video.tsx`**: `nativeControls` is destructured with a default but
      `VideoView` hardcodes `nativeControls={false}` regardless → forward the real
      prop. Separately, exported `VideoRef` documents `play`/`pause`/`seekTo`/etc.
      that are never wired via `useImperativeHandle` (`forwardRef` passes straight
      through to the native view) → implement `useImperativeHandle`, mirroring
      `camera.tsx`'s correct `CameraRef` pattern.
- [x] **`definitions/action-sheet.ts`**: has no `dependencies` field at all,
      despite `action-sheet.tsx` statically importing `react-native-reanimated`,
      and its `registryDependencies` (`text`,`view`) resolve to empty →
      `bna-ui add action-sheet` ships an unresolvable import on a fresh project.
      Add `dependencies: ['react-native-reanimated', 'react-native-worklets']`.
- [x] **`media-picker.tsx`**: uses deprecated `ImagePicker.MediaTypeOptions`
      enum → migrate to the current `mediaTypes` string-array API. Requests
      permissions eagerly on mount with no `Linking.openSettings()` fallback for
      permanent denial → move to button-press handler + Settings deep-link. Docs
      claim permissions are "automatically requested" but the required `app.json`
      config-plugin entries are confirmed **absent** from `apps/playground/app.json`
      → real first-run iOS crash risk; document the required plugin block.
- [x] **`camera-preview.mdx`**: documents ~13 props, a `MediaDetails` type, and
      3 events on a component that takes **zero props** (confirmed — no
      `CameraPreviewProps` exists) → rewrite the API Reference to state no props.
      Manual-install command installs `expo-av`, removed from the SDK two majors
      ago → replace with `expo-video` in the install snippet.

---

## Phase 1 — Accessibility (largest phase, ~60 items, mostly 1–3 line adds)

Batch order: binary controls → buttons/feedback → overlays/modals
(`accessibilityViewIsModal`) → primitives → media/camera → charts (one
synthesized label per chart) → scrolling/misc. Fix the matching false
`meta.ts` claim in the same pass — verifying/correcting it is nearly free once
the real prop exists.

**Primitives**

- [x] `text.tsx` — default `accessibilityRole="header"` for heading/title/subtitle variants (overridable)
- [x] `icon.tsx` — default `accessible={false}` (matches meta.ts's existing false "hidden from screen readers by default" claim — make it true)
- [x] `avatar.tsx` — `accessibilityRole="image"` on `AvatarImage`
- [x] `separator.tsx` — `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` (purely decorative)
- [x] `card.tsx` — **blocker first**: none of the 6 subcomponents spread `...props`, add that everywhere; then default `CardTitle` to `accessibilityRole="header"`
- [x] `hello-wave.tsx` — `accessibilityLabel="waving hand"` (low priority)
- [x] `badge.tsx` — default `accessibilityLabel` for counter/status usage (low priority)

**Basic form controls** (checkbox/radio also: touch target ~26–34px is under the 44×44 WCAG/HIG minimum — reuses `BORDER_RADIUS` as size, add `hitSlop`; `toggle` already correctly uses `HEIGHT`=48px)

- [x] `checkbox.tsx` — `accessibilityRole="checkbox"` + `accessibilityState={{checked,disabled}}` + `accessibilityLabel` + `hitSlop` to reach 44×44
- [x] `radio.tsx` — `accessibilityRole="radiogroup"` on the group, `"radio"` + state on each button + `hitSlop`
- [x] `toggle.tsx` — `accessibilityRole="togglebutton"` + state on `Toggle`; `"radiogroup"` on `ToggleGroup` single mode
- [x] `switch.tsx` — forward `accessibilityLabel={label}` to the native `Switch` (currently unlinked siblings)
- [x] `input.tsx` — `accessibilityLabel={label}` on the `TextInput` (currently a sibling `Text`, not programmatically associated)
- [x] `input-otp.tsx` — **worse than "missing a role"**: real `TextInput` is hidden off-screen (`left:-9999,opacity:0`), driven by decoy `Pressable` slots with no per-slot label — screen-reader focus ring has no perceivable target. Add `textContentType="oneTimeCode"` + `autoComplete="one-time-code"` (also enables native SMS autofill, currently absent) and per-slot `accessibilityLabel`
- [x] `searchbar.tsx` — `accessibilityRole="search"`; clear button `accessibilityLabel="Clear search"` + `hitSlop` (currently ~24×24px)

**Complex form inputs**

- [x] `combobox.tsx` — `accessibilityRole="combobox"` + `accessibilityState={{expanded}}` on trigger; `accessibilityState={{selected}}` per item (RN has no native combobox role — documented workaround pattern, cite `react-native-website` accessibility.md)
- [x] `picker.tsx` — `accessibilityRole="menuitem"` + `accessibilityState={{selected,disabled}}` on option rows; correct the mdx's inflated a11y claim
- [x] `color-picker.tsx` — currently drag-only, **fully inoperable** via VoiceOver/TalkBack/switch control → add a manual hex `TextInput` fallback + swatch labels (bundle with the Phase 3 re-render fix, same file)
- [x] `mode-toggle.tsx` — `accessibilityRole` + dynamic `accessibilityLabel={\`Switch to ${isDark?'light':'dark'} theme\`}`on the underlying`Button`
- [x] `file-picker.tsx` — **no fix needed**: only component in the library with real, working accessibility props — use as the template for the rest

**Buttons / feedback**

- [x] `button.tsx` — `accessibilityRole="button"` + `accessibilityState={{busy:loading, disabled}}`
- [x] `alert.tsx` — `accessibilityRole="alert"` + `accessibilityLiveRegion` (`'assertive'` for destructive, else `'polite'`)
- [x] `progress.tsx` — `accessibilityRole={interactive?'adjustable':'progressbar'}` + `accessibilityValue` + `accessibilityActions` when `interactive` (currently a fully functional slider unusable via screen reader)
- [x] `spinner.tsx` — `accessibilityRole="progressbar"` + `accessibilityLabel` on all 4 exports (`Spinner`/`LoadingOverlay`/`InlineLoader`/`ButtonSpinner`)
- [x] `skeleton.tsx` — `accessibilityElementsHidden` + `accessibilityLabel="Loading content"`
- [x] `toast.tsx` — `accessibilityLiveRegion` (auto-dismisses in 4s with zero screen-reader announcement today); gate the swipe/spring animation behind `AccessibilityInfo.isReduceMotionEnabled()`

**Overlays / disclosure**

- [x] `accordion.tsx` — `accessibilityRole="button"` + `accessibilityState={{expanded}}` on trigger; animate the content transition instead of the hard conditional-render snap
- [x] `action-sheet.tsx` — accessibility props on option rows
- [x] `alert-dialog.tsx` — `accessibilityViewIsModal` + `accessibilityRole="alert"` on title/description
- [x] `bottom-sheet.tsx` — `accessibilityViewIsModal` (no fix exists today — meta.ts's "traps focus" claim is false)
- [x] `collapsible.tsx` — `accessibilityRole="button"` + `accessibilityState={{expanded}}`
- [x] `popover.tsx` — `accessibilityViewIsModal` + `accessibilityRole="menu"` on content; `"button"` on trigger/close; either implement the claimed Escape-to-close or remove the claim
- [x] `sheet.tsx` — `accessibilityLabel="Close"` + role on the icon-only close button; `accessibilityViewIsModal`
- [x] `tabs.tsx` — `accessibilityRole="tablist"`/`"tab"` + state (bundle with the Phase 0 module-scope fix, same file)

**Media / camera** (all currently zero accessibility on icon-only controls, despite meta.ts claiming proper labeling on every one)

- [x] `audio-player.tsx` — accessibility props on the 3 transport buttons
- [x] `audio-recorder.tsx` — accessibility props on Mic/Stop/Delete/Save
- [x] `audio-waveform.tsx` — `accessibilityRole="adjustable"` + `accessibilityValue`/`accessibilityActions` (fully seekable via gesture, zero a11y today); enlarge the 3–4px-wide interactive bars via `hitSlop`
- [x] `camera.tsx` — accessibility props with dynamic labels/state on 9+ icon-only controls
- [x] `camera-preview.tsx` — accessibility labels on the 3 floating action buttons
- [x] `video.tsx` — accessibility props on the 3 gesture-tap zones + mute toggle

**Scrolling / misc**

- [x] `avoid-keyboard.tsx` — gate the height animation behind a reduced-motion check (meta.ts claims this exists; it doesn't)
- [x] `carousel.tsx` — accessibility props on indicators/arrows, e.g. `accessibilityLabel={\`Go to slide ${i+1} of ${total}\`}`+`accessibilityState={{selected}}`
- [x] `onboarding.tsx` — `AccessibilityInfo.announceForAccessibility` on step change; hide the decorative progress dots from the a11y tree (`accessibilityElementsHidden`)
- [x] `parallax-scrollview.tsx` — gate the header transform behind `useReducedMotion()`
- [x] `table.tsx` — `accessibilityLabel` on sortable headers announcing sort direction

**Charts** (native per-datapoint semantics aren't feasible for SVG — one synthesized summary label per chart is the realistic baseline)

- [x] All 16 non-ring charts (`line`, `area`, `stacked-area`, `bar`, `column`, `stacked-bar`, `pie`, `doughnut`, `polar-area`, `radar`, `radial-bar`, `scatter`, `bubble`, `candlestick`, `heatmap`, `treemap`) — add one `accessibilityRole="image"` + synthesized `accessibilityLabel` summarizing the dataset on the chart's outer container
- [x] `progress-ring-chart.tsx` — **exception**: single scalar value, use full native semantics instead of a summary label: `accessibilityRole="progressbar"` + `accessibilityValue={{min:0,max:100,now:clamped}}`
- [x] `chart-container.tsx` — `accessibilityRole="header"` on the title

---

## Phase 2 — Documentation drift

**Fabricated props** (documented, don't exist in source — delete from meta.ts or implement for real):

- [x] `meta/image.ts` — `full: boolean` doesn't exist; also add the missing real `'default'` variant value
- [x] `meta/mode-toggle.ts` — **worst case in the audit**: documents only `style: ViewStyle`, which doesn't exist, while omitting the two real props entirely → delete `style`, add `variant`/`size`
- [x] `meta/accordion.ts` — `disabled` on both `Accordion` and `AccordionItem` doesn't exist
- [x] `accordion.mdx` — documents web-only DOM `data-state`/`data-disabled` attributes; can't exist in React Native, delete

**Real props missing from docs**:

- [x] `meta/button.ts` — add real `haptic?: boolean` (extend haptics to Android too — currently iOS-only regardless of the prop); resolve dead `label` prop (wire to `accessibilityLabel` fallback or delete)
- [x] `meta/input.ts` — add `type?: 'input'|'textarea'` + `rows?: number` for both `Input` and `GroupedInputItem` (gates the entire textarea path, currently invisible in generated docs)
- [x] `meta/bottom-sheet.ts` — has no `types` field at all; add full prop set including `disablePanGesture` (real, used, completely undocumented)
- [x] `meta/tabs.ts` — add missing `enableSwipe` (the prop that triggers the Phase 0 module-scope bug), `value`, `onValueChange`
- [x] `file-picker.mdx` — add missing `variant?: ButtonVariant` row (13 documented vs 15 real props); wire `showPreview` to actually gate the preview list, or delete the dead prop
- [x] `meta/date-picker.ts` — document `value`/`onChange` as `DateRange`/`(DateRange|undefined)=>void` for `mode='range'` (currently only the `Date` shape is documented, despite range being a headline demo)

**`meta.ts` missing `types` entirely** (payload ships with no structured prop data):

- [x] `carousel.ts` (0 of 12+ props across 5 interfaces), `onboarding.ts`, `parallax-scrollview.ts`, `view.ts`, `toast.ts`, `input-otp.ts` (currently 12/12 accurate only in hand-written mdx, no sync protection)

**Wrong documented defaults/types**:

- [x] `meta/progress.ts` — `height` default documented as `4`; real default is `HEIGHT` (48) — off by 12x
- [x] `useColorScheme.mdx` — Returns table says `'light'|'dark'|null`; verified real signature (RN 0.86.0 source) is strict `'light'|'dark'`, never null → fix table, delete the dead "Handling Null Values" section, explain the `'unspecified'`→`'light'` collapse instead
- [x] `useModeToggle.mdx` — "System Mode" section cites `Appearance.setColorScheme(null)`; RN 0.86 has no `null` in the type (source already correctly uses `'unspecified'`) → fix the doc line

**Wrong install instructions**:

- [x] `camera-preview.mdx` — drop `expo-av` (removed from SDK 2 majors ago), see Phase 0
- [x] `useBottomTabOverflow.mdx` — remove `@react-navigation/bottom-tabs` install (hook never imports it — reads `BottomTabBarHeightContext` from `expo-router/js-tabs` instead); correct the "uses `useBottomTabBarHeight()` internally" claim
- [x] `theme-provider.mdx` — remove `@react-navigation/native` and `react-native-reanimated` from required deps (source imports neither; uses `expo-router/react-navigation`)

**Doc claims code contradicts**:

- [x] `sheet.mdx` — remove "automatically handles safe area insets" claim (false — zero `react-native-safe-area-context` usage today, see Phase 5)
- [x] `toast.mdx` — "Custom Animations" section shows legacy `Animated.spring(...)`; component is built on Reanimated's `withSpring` → fix example
- [x] `picker.mdx` — stray unclosed code fence at end of file (literal rendering bug)

**Misc**:

- [x] `link.tsx` — export `LinkProps` (currently unexported `type Props`); convert to `interface` for batch consistency; document the `typedRoutes` `app.json` prerequisite
- [x] `useKeyboardHeight.ts` — strip the 19-line dead commented-out usage example shipped in source; caveat the landscape-rotation height heuristic (`screenHeight*0.4`, unmeasured) as an approximation, not a supported feature, in the doc

**Clean — no action, use as the model to follow**: `avatar.ts`, `card.ts` (props), `combobox` (hand-written mdx), `picker.ts`, `media-picker.ts`, `alert-dialog.ts`, `popover.ts` (most accurate file in the audit), `gallery.ts`, `table.ts`, `checkbox.ts`, `radio.ts`, `toggle.ts`, `switch.ts`, `searchbar.ts`, `separator.ts`.

---

## Phase 3 — Remaining functional bugs

- [x] `share.tsx` — `subject` assigned to the wrong `Share.share()` argument (content instead of options) → silent no-op; `title` gated iOS-only when RN treats it as the Android-facing field → flip; `testID`/`fallbackMessage` declared but never destructured/spread → wire or remove
- [x] `link.tsx` — internal-navigation path recomputes `asChild` from `typeof children`, silently discarding the caller-supplied value → respect the passed prop
- [x] `treemap-chart.tsx` — documented `children` field (hierarchical data) is declared but never read by the layout algorithm → implement the recursion or remove the "hierarchical support" claim; algorithm also skips the `.sort()` step the canonical squarified-treemap algorithm requires before row placement → add it
- [x] `progress-ring-chart.tsx` — `label` `SvgText` rendered as a sibling of `<Svg>`, not a child — react-native-svg only supports `<Svg>` descendants → move inside, or render as real RN `Text` above the SVG; also clamp `progress` to `[0,100]`; namespace the gradient id via `useId()` (collides across same-config instances, a stated primary use case)
- [x] `date-picker.tsx` — `error`/`errorStyle` never render visible text; the only effect is nested inside a conditional requiring `label` to also be set → render the error string unconditionally
- [x] `image.tsx` — internal `onLoadStart`/`onLoadEnd`/`onError` are wired, then `{...props}` spreads after them → a consumer's public callback of the same name silently overwrites the internal handler, permanently breaking the loading/error UI → explicitly compose both instead of relying on spread order
- [x] `avatar.tsx` — nothing connects `AvatarImage`'s load-error state to `Avatar`'s children selection → `AvatarFallback` never auto-triggers → lift error state to an `Avatar` context or controlled callback
- [x] `color-picker.tsx` — every pan frame unconditionally calls `runOnJS(updateColor)`, forcing a full re-render per touch-move → drive color-derived visuals via `useAnimatedStyle`/`interpolateColor` on the UI thread, commit state only on `.onEnd()`; `hexToRgb` regex only accepts exactly 6 hex digits — 3-digit/alpha hex silently resolves to black → fix the regex
- [x] `pie-chart.tsx`, `doughnut-chart.tsx`, `polar-area-chart.tsx`, `radial-bar-chart.tsx`, `radar-chart.tsx` — ratio computed against `total`/`maxValue` with no guard for an all-zero dataset → `NaN` geometry, silently broken render → guard `=== 0` before computing angles/radii. `radar-chart.tsx` additionally uses `||` instead of `??` for `maxVal`, so an explicit `maxValue: 0` is silently discarded → switch to `??`
- [x] `pie-chart.tsx`, `doughnut-chart.tsx` — a single 100%-share segment makes the arc's start/end points coincide, which SVG's arc command can't draw → special-case a full-circle single segment with a plain `<Circle>`. `doughnut-chart.tsx` also: `innerRadius` config is unclamped → self-intersecting path for out-of-range values → clamp to `[0, 0.95]`
- [x] `radial-bar-chart.tsx` — gradient `id`s are hardcoded literal strings → collide across same-config instances on one screen (a stated use case) → namespace via `useId()`
- [x] `theme-provider.tsx` — theme object rebuilt inline in the component body on every render, no `useMemo` → invalidates every `useTheme()` consumer app-wide on every re-render (mounted at app root) → wrap in `useMemo` keyed on color scheme
- [x] `bar-chart.tsx`, `column-chart.tsx` — `maxValue=0` → `NaN` bar height/width for an all-zero dataset → guard. `bar-chart.tsx` additionally: `showGrid?: boolean` is documented with a default but has **zero rendering code anywhere** → implement (mirror `line-chart`/`stacked-bar-chart`'s grid pattern) or remove from type + docs
- [x] `line-chart.tsx` — `index/(data.length-1)` → `NaN` for a single-point dataset → guard; a computed `pointAnimatedStyle` (spring pop-in) is dead, never attached → implement or delete; `interactive`/tooltip shared-value state updates but nothing ever renders a tooltip from it (meta.ts markets "Interactive Touch") → implement the tooltip UI or delete the dead code; the pan gesture is always mounted with no `.enabled(interactive)` gate, competing with a parent `ScrollView`'s scroll even when unused → gate it
- [x] `stacked-area-chart.tsx`, `stacked-bar-chart.tsx` — hardcoded non-theme default color palette bypasses `useColor`/`semanticColors`; runs out past 7 series leaving `undefined` colors → cycle the palette with modulo, or route through the theme system once Phase 7 lands
- [x] `bubble-chart.tsx`, `candlestick-chart.tsx` — meta.ts and mdx both claim "Interactive Touch" gesture support that **does not exist anywhere** in source or demos (a demo is literally titled "interactive... with touch gestures") → remove the false claim, or build real gesture support (which would also make the declared-but-unused gesture-handler dependency legitimate, see Phase 6). `candlestick-chart.tsx` additionally ships a dead commented-out line verbatim into every install → strip it

---

## Phase 5 — Styling, performance & consistency

- [x] `React.memo`: `text.tsx`, `view.tsx`, `card.tsx`'s 6 subcomponents (after the `...props` fix in Phase 1), `avatar.tsx`, `skeleton.tsx`, `area-chart.tsx` (cheap pure wrapper) — most-instantiated leaves in the library, currently unmemoized
- [x] `useCallback`: `toggle.tsx`'s `ToggleGroup` per-item handlers (currently new closures every render, `React.memo` alone won't help)
- [x] `useMemo`: geometry/stacking math across all 18 charts (currently recomputed from scratch every render regardless of whether `data` changed) — highest-value targets: `heatmap-chart.tsx`'s grid rebuild (O(rows×cols)) and `treemap-chart.tsx`'s `squarify()` (O(n²)/level); also `combobox.tsx`'s filter/count and `picker.tsx`'s search filtering
- [x] `FlatList`/FlashList migration: `gallery.tsx`'s main thumbnail grid (currently `.map()` in a plain `ScrollView` — backwards, since the _less-visible_ fullscreen viewer already uses `FlatList` correctly); `table.tsx`'s rows when `pagination={false}` (removes the only size guard on a generic data table)
- [x] `useWindowDimensions()` replacing module-scope `Dimensions.get('window')` caching (stale after rotation/on foldables): `bottom-sheet.tsx`, `sheet.tsx`, `tabs.tsx`, `carousel.tsx`, `gallery.tsx`, `onboarding.tsx`
- [x] `useSafeAreaInsets()` replacing hardcoded offsets: `action-sheet.tsx` (`paddingBottom:34`), `bottom-sheet.tsx` (`paddingBottom:40`), `sheet.tsx` (`paddingTop:90`/`top:50`), `gallery.tsx` (`paddingTop:56`/`paddingBottom:46`) — misplaces content under Expo SDK 57's Android edge-to-edge default and notch/Dynamic-Island devices
- [ ] `StyleSheet.create` migration for the inline-style majority (~3/4 of files) — optional, low urgency, a consistency call not a correctness one

---

## Phase 6 — Registry / dependency hygiene

- [x] Remove unused `react-native-gesture-handler` from `dependencies` in 14 chart definitions (copy-paste artifact from `line-chart`'s template, the one chart that legitimately uses it): `column`, `stacked-area`, `stacked-bar`, `pie`, `doughnut`, `polar-area`, `radar`, `radial-bar`, `progress-ring`, `scatter`, `bubble`, `candlestick`, `heatmap`, `treemap`
- [x] Remove unused `registryDependencies`: `combobox.ts` (declares `text`/`view`, imports RN's `Text`/`View` directly), `carousel.ts` (unused `text`), `scroll-view.ts` (unused `view`)
- [x] Add missing `dependencies`: `action-sheet.ts` (`react-native-reanimated`, `react-native-worklets` — P0, see Phase 0), `spinner.ts` (same two), `skeleton.ts` (`react-native-reanimated`)
- [x] Add `react-native-worklets` to the manual-install MDX snippet on nearly all 18 chart pages (machine-readable `definitions/charts/*.ts` already list it correctly — only the human-facing docs are wrong, so `bna-ui add` users are unaffected, manual-install users get a broken build)
- [x] `definitions/charts/chart-container.ts` — remove unused `expo-image`/`image` dependency (confirmed via the generated build payload — component never imports either)
- [x] `definitions/tabs.ts` — `description` field is copy-pasted verbatim from the `view` component; fix

---

## Phase 7 — Theme system expansion

- [x] Merge `semanticColors.light`/`.dark` into `Colors.light`/`.dark` (in `colors.ts`) so `useColor('success', ...)` type-checks and resolves — currently fully orphaned, zero consumers anywhere in the registry. Fix `colors.mdx`'s "Semantic Usage" example, which hardcodes `semanticColors.light.success` and ignores the active theme. Unblocks `badge.tsx`'s `success` variant (currently forced to reuse the iOS-accent `green` token) and `toast.tsx`'s theme wiring (Phase 0/1)
- [x] Add a `SPACING` scale (and consider a small font-size scale) to `globals.ts` — currently only 4 scalar constants (`HEIGHT`, `FONT_SIZE`, `BORDER_RADIUS`, `CORNERS`), while `globals.mdx`'s own examples already invent a `spacing`/typography scale that doesn't exist in source
- [x] **Deliberate breaking-change decision, not a quiet fix**: reconcile the 3 different controlled-prop naming conventions across `checkbox` (`checked`/`onCheckedChange`), `radio` (`value`/`onValueChange`), and `toggle` (`pressed`/`onPressedChange`) for functionally near-identical controls — highest-effort, most consumer-visible item in this roadmap; version-flag it

---

## Phase 8 — Process

- [x] Start a changeset practice for `@bna-ui/registry` component changes (today only the `bna-ui` CLI package has an active `.changeset/` history — the component library itself has never been formally versioned)
- [x] Add a CI check that diffs each `meta/<name>.ts`'s documented props against the actual component's exported prop type — highest-leverage process fix available; manual spot-checking is what let the Phase 2 drift accumulate undetected across most of the library in the first place

---

## Caveats before shipping Phase 0/3 fixes

- This is a static/documentation audit, not device/simulator-tested.
- Verify the Reanimated 4.5.0 / `react-native-worklets` 0.10.0 compatibility
  pairing directly at `docs.swmansion.com/react-native-reanimated/docs/guides/compatibility/`
  before relying on it — sources conflicted during research.
- `bottom-sheet.tsx`'s local `GestureHandlerRootView`-inside-`Modal` placement
  was checked against gesture-handler's own docs and confirmed **correct** —
  do not "fix" it.
- Verify any behavior change from Phase 0/3 fixes on-device before shipping.
