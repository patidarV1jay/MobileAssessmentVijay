# Gutenberg Project

A React Native mobile application for browsing and reading public-domain books from the Gutenberg/Gutendex API.

The app allows users to select a book genre, browse books with cover images, search within the selected genre, load additional results using API pagination, and open a selected book in an external browser using the best available supported format.

## Project Overview

The application contains two main screens:

### 1. Genres Screen

The first screen displays the available book genres:

- Fiction
- Drama
- Humor
- Politics
- Philosophy
- History
- Adventure

Selecting a genre navigates the user to the Books screen and passes the selected genre as a navigation parameter.

### 2. Books Screen

The Books screen:

- Displays books for the selected genre.
- Shows only books that have cover images.
- Displays book cover, title, and author.
- Supports API-based search.
- Supports infinite scrolling using the API's `next` pagination link.
- Works in both portrait and landscape orientations.
- Opens books in an external browser.

When a book is tapped, the application selects the first available viewable format in this order:

1. HTML
2. PDF
3. TXT

ZIP files are ignored because they are not directly viewable in a browser.

If none of the supported viewable formats are available, an alert is shown to the user.

---

## API

The application uses the Gutenberg/Gutendex API:

```text
https://gutendex.careers.ignitesol.com
```

Books are requested using API filters rather than filtering the downloaded list locally.

Example:

```text
/books?topic=Fiction&mime_type=image/jpeg&search=Vampire
```

This means the returned books must:

- Match `Fiction` in Subjects or Bookshelves.
- Match `Vampire` in Title or Author when a search term is entered.
- Have an `image/jpeg` format so only books with covers are returned.

---

## Setup and Run Instructions

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- React Native development environment
- Android Studio for Android development
- Xcode for iOS development on macOS

### 1. Clone the repository

```bash
git clone <repository-url>
cd MobileAssessmentVijay
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install iOS pods

For iOS only:

```bash
cd ios
pod install
cd ..
```

### 4 . Run on Android

Open another terminal and run:

```bash
npx react-native run-android
```

### 5. Run on iOS

On macOS:

```bash
npx react-native run-ios
```

If Metro cache causes unexpected build issues, restart it using:

```bash
npx react-native start --reset-cache
```

---

## Architecture Overview

The project follows a simple modular React Native structure.

```text
src/
├── assets/
│   └── images/ and font/
├── constants/
│   └── genre and color constants
├── config/
│   └── booksApi and client
├── modules/
│   ├── genres-screen/
│   │   ├── GenresScreen.tsx
│   │   └── GenresScreenStyles.ts
│   └── books-screen/
│       ├── BooksScreen.tsx
│       ├── BooksScreenStyles.tsx
│       └── useBookScreen.ts
├── navigation/
│   ├── AppNavigator.tsx
│   └── navigationTypes.ts
├── services/
│   ├── apiClient.ts
│   └── booksApi.ts
├── types/
│   └── bookTypes.ts
└── utils/
    └── responsive scaling utilities
```

### Responsibilities

**GenresScreen**

- Displays all available genres.
- Navigates to the Books screen with the selected genre.

**BooksScreen**

- Displays the books grid.
- Handles portrait and landscape layouts.
- Displays loading, error, empty, and pagination states.
- Handles book selection.

**useBookScreen**

- Contains book-opening logic.
- Selects HTML, PDF, or TXT in priority order.
- Ignores ZIP files.
- Opens the selected URL using React Native Linking.

**booksApi**

- Contains book-related API calls.
- Applies genre, search, and image MIME-type filters.
- Handles pagination requests.

**apiClient**

- Central Axios instance.
- Defines API base URL, timeout, and common headers.
- Handles common API/network error logging.

**navigation**

- Contains React Navigation configuration.
- Defines typed route parameters.

---

## Responsive Design

The Books screen supports both portrait and landscape orientations.

The application uses:

```tsx
useWindowDimensions()
```

to react to orientation and window-size changes.

It also uses:

```tsx
useSafeAreaInsets()
```

to account for device notches, rounded corners, and landscape safe areas.

The book grid adjusts its number of columns based on the available screen width/orientation.

Typical layout:

```text
Portrait  -> 3 columns
Landscape -> 6 columns
```

---

## Book Format Selection

The API can return several book formats.

The application follows the required priority:

```text
HTML -> PDF -> TXT
```

The selected URL must also be directly viewable.

URLs ending in `.zip` are skipped.

Example logic:

```text
HTML available and not ZIP
    -> Open HTML

Otherwise PDF available and not ZIP
    -> Open PDF

Otherwise TXT available and not ZIP
    -> Open TXT

Otherwise
    -> Show error alert
```

This prevents ZIP archives from being passed to the browser as viewable books.

---

## Search Behaviour

Search is performed through the API.

For example, if the selected genre is:

```text
Fiction
```

and the user searches:

```text
Vampire
```

the request includes both:

```text
topic=Fiction
search=Vampire
```

Therefore the results match the selected genre and the search query together.

Search is debounced before making the API request to avoid unnecessary API calls while the user is typing.

---

## Pagination

The Books screen implements infinite scrolling using the `next` URL returned by the API.

The API may return pagination links containing an internal backend hostname, for example:

```text
http://gutendex-api:8974/books/?page=2...
```

The application removes the internal protocol/hostname and reuses the configured Axios `baseURL`.

Example:

```text
http://gutendex-api:8974/books/?page=2
```

becomes:

```text
/books/?page=2
```

and Axios sends the request through:

```text
https://gutendex.careers.ignitesol.com
```

Duplicate books are prevented when appending paginated results.

---

## Third-Party Libraries Used

### React Navigation

Used for navigation between the Genres and Books screens.

Packages:

```text
@react-navigation/native
@react-navigation/native-stack
```

### Axios

Used for all API requests.

Package:

```text
axios
```

A reusable Axios client is configured with:

- Base URL
- Request timeout
- Common headers
- Response error interceptor

### Lucide React Native

Used for icons such as genre icons, back arrow, search icon, and navigation arrow.

Package:

```text
lucide-react-native
```

### React Native Safe Area Context

Used for safe-area handling on devices with notches, rounded corners, and landscape insets.

Package:

```text
react-native-safe-area-context
```

---

## AI Tools Used

ChatGPT was used as a development assistant during implementation.

It was used for:

- Reviewing the assessment requirements.
- Discussing React Native architecture.
- API integration guidance.
- React Navigation setup.
- Pagination handling.
- Responsive portrait/landscape layout guidance.
- Debugging React Native and Axios issues.
- Book format-selection logic.
- README documentation assistance.

All generated suggestions were reviewed and integrated into the project during development.

---

## Assumptions and Known Limitations

### Assumptions

- The Gutendex assessment API remains available.
- Each returned book has an `image/jpeg` format because API requests use the `mime_type=image/jpeg` filter.
- A device has an installed browser capable of opening standard HTTPS URLs.
- Genre filtering is performed by the Gutendex `topic` parameter.
- Search filtering is performed by the Gutendex `search` parameter.

### Known Limitations

- The application requires an internet connection.
- No offline caching is implemented.
- Search and pagination depend on the availability and response time of the Gutendex API.
- Books are opened externally rather than rendered inside the application.
- Only HTML, PDF, and TXT are considered viewable formats as required by the assessment.
- EPUB, MOBI, ZIP, RDF, and other formats are intentionally ignored.
- A book with no directly viewable HTML, PDF, or TXT URL displays an error alert.
- Landscape layout may vary slightly depending on device safe areas and screen dimensions.

---

## Demo Video

The demo video should show the complete user flow in both required orientations.

### Portrait Demo

Include:

- Genres screen
- Selecting a genre
- Books list
- Search
- Scrolling/pagination
- Opening a book in the browser

Demo video:

```text
https://www.loom.com/share/294c9a99f3444a1e85a1967383bd4682
```

### Landscape Demo

Include:

- Rotating the application to landscape
- Responsive books grid
- Search
- Scrolling
- Opening a book

Demo video:

```text
https://www.loom.com/share/2bf2f60a69404b8da8eab8d2479b5a96
```

If both orientations are demonstrated in a single video, use:

```text
Add combined portrait + landscape demo video link here
```

---

## Summary

The application implements the core Gutenberg assessment requirements:

- Genre-based navigation
- API-based genre filtering
- Cover-image-only results
- API-based search
- Infinite scrolling
- Duplicate-result protection
- Portrait and landscape support
- HTML -> PDF -> TXT format priority
- ZIP-file exclusion
- External browser book opening
- Loading, error, and empty states
