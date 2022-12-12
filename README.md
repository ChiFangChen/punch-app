# Punch app

Check the [Demo](https://chifangchen.github.io/punch-app/)

---

## Introduction

This project was developed by `React`, `TypeScript` & `Emotion`.

There are 2 pages in the project, which are home and settings.

### 🏠 home

If the distance between the user and the company is within the range of the app settings, the user can punch in and out with the location address which is get from the mapbox API and the record will be saved in the browser.

### ⚙️ settings

You can reset the company's position and the max distance to restrict the punch behavior, and the settings will be saved in the browser.

---

## Code design

Every component will have at least 2 files in its folder, which are `index.ts` and `[componentName].tsx`. If there are some styled components relevant to it, there will be 1 more file called `styles.ts` to define some styled components in it.

All common components are placed in the `components` folder. If a component that only the parent use, it will be placed in the parent's folder.

Use redux to manage the data, all the code of data flow is in the modal folder.

Standard functions and variables are defined in the `utils` folder.

---

## Activate the APP

- Clone the repo
- `npm install`
- `npm start`
