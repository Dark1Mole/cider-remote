#!/usr/bin/env bash
set -euo pipefail

ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/sdk}"
ANDROID_SDK_ROOT="${ANDROID_SDK_ROOT:-$ANDROID_HOME}"

if [[ ! -x "$ANDROID_HOME/platform-tools/adb" ]]; then
  echo "Android SDK not found at $ANDROID_HOME"
  echo "Run: bash scripts/install-android-sdk.sh"
  exit 1
fi

export ANDROID_HOME
export ANDROID_SDK_ROOT
export PATH="$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin"

if [[ -d android ]]; then
  printf 'sdk.dir=%s\n' "$ANDROID_HOME" > android/local.properties
  echo "Wrote android/local.properties"
fi

echo "ANDROID_HOME=$ANDROID_HOME"
adb version | head -1
