# Timeline App

This project is a web application built with Next.js that visualizes a timeline of episodes, allowing users to browse, filter by category, and play audio directly within the interface. It was developed as a solution for a frontend job application assessment.

Developed by [Jacob Kotzee](https://www.linkedin.com/in/jacobkotzee/)

## Features

* **Timeline Visualization:** Displays episodes chronologically on an interactive timeline.
* **Category Filtering:** Users can filter episodes by different categories.
* **Audio Playback:** Integrated audio player allows users to listen to episodes directly from the application.
* **Responsive Design:** Optimized for various screen sizes.

## Technologies Used

* **Next.js:** React framework for building server-rendered and static web applications.
* **React:** JavaScript library for building user interfaces.
* **Zustand:** A small, fast, and scalable bearbones state-management solution for React.
* **CSS Modules:** For scoped and modular styling.
* **TypeScript:** For type safety and improved developer experience.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js (v18 or later) and npm, yarn, pnpm, or bun installed.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/timeline-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd timeline-app
    ```

3. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

### Running the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

* `src/app/`: Next.js App Router root, including API routes (`api/episodes`).
* `src/components/`: Reusable React components such as `AudioPlayer`, `CategoryFilter`, `EpisodeCard`, and `TimelineView`.
* `src/hooks/`: Custom React hooks, including `useStore` for state management.
* `src/store/`: Zustand stores for managing global application state (`audioPlayerStore`, `timelineStore`).
* `src/utils/`: Utility functions and helper files.

## Assumptions and Design Choices

* **API Integration:** The application assumes the presence of an `/api/episodes` endpoint that returns episode data. For this assessment, a mock API endpoint is provided.
* **State Management:** Zustand was chosen for its simplicity and performance for managing application-wide state, such as the audio player's status and timeline filters.
* **Styling:** CSS Modules are used to ensure component-level styling isolation and prevent style conflicts.

## Future Enhancements

* **Dynamic Data Loading:** Implement infinite scrolling or pagination for loading more episodes.
* **User Authentication:** Add user authentication to personalize the experience and save user preferences.
* **Search Functionality:** Allow users to search for specific episodes.
* **Drag-and-Drop for Timeline:** Enable users to reorder or customize their timeline view.
* **Error Handling and Loading States:** Implement more robust error handling and visual loading indicators for a better user experience.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

* [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
