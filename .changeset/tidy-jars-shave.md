---
'bna-ui': patch
---

Fix `InputOTP` never reopening the Android keyboard after it was dismissed.

Android hides the soft keyboard on back-press or swipe-down without blurring the
input and without firing `onBlur`, so the hidden `TextInput` behind the slots
stays focused. Pressing a slot then called `focus()` on an already-focused
input, which Android treats as a no-op — the keyboard stayed down and the code
could no longer be entered.

Slot presses (and `ref.focus()`, which now shares the same path) cycle
`blur()` → `focus()` on Android to force the keyboard back up. The cycle is
gated on a `keyboardDidShow`/`keyboardDidHide` subscription so it only runs when
the keyboard is actually down; tapping a slot mid-entry still focuses directly
and never flashes the keyboard closed. iOS and web are untouched — they blur
properly on dismiss, so a forced cycle there would only cause flicker.
