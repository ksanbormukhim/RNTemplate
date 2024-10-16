# React Native Template - RNTemplate [For NESAC RN app]

A custom React Native template designed to streamline the process of setting up a new React Native project with your own configurations and preferences. This template can be used with the `@react-native-community/cli` to quickly generate a new project.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Features](#features)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Overview

This template is built to simplify the initial setup of a React Native project by providing a custom project structure and pre-configured files.

### Key Highlights:

- **Pre-configured project structure**
- **Pre-configured with zustand,** for simplifying state management
- **Pre-configured with sqlite,** for simple local database management
- **Tailored for Android development**, iOS is excluded for simplicity.

## Getting Started

To use this template, simply run the following command using `@react-native-community/cli`:

```bash
npx @react-native-community/cli@latest init AwesomeProject --template https://github.com/ksanbormukhim/RNTemplate.git
```

This command will initialize a new React Native project named `AwesomeProject` using the `RNTemplate`.

## Prerequisites

Before using this template, ensure you have the following installed:

- **Node.js** (version 16 or later)
- **React Native CLI** (`@react-native-community/cli`)
- **Android Studio** (for Android development)
- **Java Development Kit** (JDK 11 or later)

## Installation

Follow these steps to set up a new project using the template:

1. **Open a terminal** and run:

   ```bash
   npx @react-native-community/cli@latest init AwesomeProject --template https://github.com/ksanbormukhim/RNTemplate.git
   ```

2. **Navigate into the project directory**:

   ```bash
   cd AwesomeProject
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Run the Android project**:

   ```bash
   npx react-native run-android
   ```

## Project Structure

The template provides the following structure:

```
AwesomeProject/
├── android/
├── node_modules/
├── src/
│   ├── app/
│   ├── asset/
│   ├── components/
│   ├── config/
│   ├── db/
│   ├── screens/
│   ├── store/
│   ├── translations/
│   ├── utils/
│   └── types.d.ts
├── app.json
├── App.tsx
├── build-debug-apk.bat
├── build-release-apk.bat
├── index.js
├── package.json
├── README.md
└── tsconfig.json
```

### Key Folders:

- **`src/components`**: Reusable UI components.
- **`src/navigation`**: Navigation setup for the project.
- **`src/screens`**: Screen components for your app.
- **`src/services`**: For API services and external data interaction.
- **`src/utils`**: Utility functions or constants.

## Features

- **TypeScript** support out-of-the-box for better code quality and development experience.
- **Pre-configured navigation**: React Navigation setup for multi-screen routing.
- **Pre-configured state management**: Zustand - 'Bear necessities for state management in React'.
- **Pre-configured with sqlite**: for simple local database'.
- **Reusable components**: Basic UI components for quick prototyping.
- **Android-specific setup**: Optimized for Android development.

## Customization

You can easily customize this template by:

- Modifying the folder structure to suit your development needs.
- Adding more dependencies like `Redux`, `Axios`, or `Styled Components` based on your preferences.
- Extending the navigation to support more advanced use cases, such as stack navigators or deep linking.

## Changing App Name and Bundle ID

To customize the app name or bundle ID, follow these steps:

1. **Change the App Name**:

   - Open `app.json` or `android/app/src/main/res/values/strings.xml` and replace the existing name with your desired app name.

2. **Change the Bundle ID**:
   - Modify the `applicationId` in `android/app/build.gradle` to your preferred package name.

## Contributing

If you would like to contribute to this template, feel free to open issues or submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
