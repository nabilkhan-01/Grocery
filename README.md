# Grocery List App

A simple, elegant Grocery List application built with React and Vite. This application allows you to manage your grocery shopping with features like adding items with quantities, editing, deleting, and marking items as purchased.

## Features

- Add grocery items with quantity and unit (kg, g, pcs, l, ml)
- Edit existing grocery items
- Delete grocery items
- Mark items as purchased/unpurchased
- Responsive design that works on mobile and desktop
- Data persistence using localStorage

## Technologies Used

- React.js
- Vite
- CSS3
- LocalStorage API

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173)

## Usage

- **Adding a grocery item**: Enter the item name, quantity, and select a unit, then click the "Add" button
- **Editing an item**: Click the "Edit" button next to an item, make your changes, and click "Save"
- **Deleting an item**: Click the "Delete" button next to an item
- **Marking an item as purchased**: Click the checkbox next to an item

## Build for Production

To build the application for production, run:

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

This project is open source and available under the MIT License.
