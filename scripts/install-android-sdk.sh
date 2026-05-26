#!/usr/bin/env bash
set -euo pipefail

ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/sdk}"
ANDROID_SDK_ROOT="${ANDROID_SDK_ROOT:-$ANDROID_HOME}"
CMDLINE_TOOLS="$ANDROID_HOME/cmdline-tools/latest"
ZIP_URL="https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip"

echo "Installing Android SDK to $ANDROID_HOME"

mkdir -p "$ANDROID_HOME/cmdline-tools"
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

curl -fsSL -o "$tmpdir/cmdline-tools.zip" "$ZIP_URL"
rm -rf "$tmpdir/extract"
unzip -q "$tmpdir/cmdline-tools.zip" -d "$tmpdir/extract"
rm -rf "$CMDLINE_TOOLS"
mv "$tmpdir/extract/cmdline-tools" "$CMDLINE_TOOLS"

export ANDROID_HOME ANDROID_SDK_ROOT
export PATH="$PATH:$CMDLINE_TOOLS/bin:$ANDROID_HOME/platform-tools"

yes | sdkmanager --licenses
sdkmanager "platform-tools" "platforms;android-35" "build-tools;35.0.0"

if ! grep -q 'ANDROID_HOME' "$HOME/.bashrc" 2>/dev/null; then
  cat >> "$HOME/.bashrc" << EOF

# Android SDK
export ANDROID_HOME="$ANDROID_HOME"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="\$PATH:\$ANDROID_HOME/platform-tools:\$ANDROID_HOME/cmdline-tools/latest/bin"
EOF
fi

echo "Done. Restart your shell or run: source ~/.bashrc"
