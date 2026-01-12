<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->
- [x] Verify that the copilot-instructions.md file in the .github directory is created.

- [x] Clarify Project Requirements
- [x] Scaffold the Project
- [x] Customize the Project
- [x] Install Required Extensions
- [x] Compile the Project
- [x] Create and Run Task
- [x] Launch the Project
- [x] Ensure Documentation is Complete

## Project Overview
This project is a mock of X.com showcasing a "Websites in Container" feature.
The main feed contains a post that hosts a fully functional static website within the media container.

## Key Features
- **UI Mock**: Faithful recreation of X's desktop interface using Tailwind CSS.
- **Static Site Hosting**: A dedicated route (`/embedded-site`) acts as a hosted static site.
- **Interactive Container**: The core feature; usage of `iframe` within the post component allows the embedded site to be scrolled and interacted with independently of the main feed.

## How to Run
1. Ensure dependencies are installed: `npm install`
2. Run the development server: `npm run dev`
3. Open `http://localhost:3000`

## File Structure
- `src/app/page.tsx`: Main entry point.
- `src/app/embedded-site/page.tsx`: The source for the embedded static website.
- `src/components/Post.tsx`: Post component handling the display logic.
- `src/components/WebsiteContainer.tsx`: The container component that embeds the static site iframe.
