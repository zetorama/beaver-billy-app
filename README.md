# Beaver Billy's App

Another take-home assignment for a software engineer position from a very nice company.

## Tech Challenge

> Implement the following mock [...] using ReactJS or React Native, and using either JavaScript or TypeScript

**Main features**

- [x] Add new project
- [x] Rename project
- [x] Delete project

**Additional features if there is time** (not in priority order)

- [x] Responsive and mobile friendly
- [ ] Drag and drop project
- [x] Use a state management library such as Redux
- [x] Tests (at any level)
- [ ] Any additional functionality you would like to add to the page (either UI or server side)

## Stack

_Bootstrapped from [`vite-template-redux`](https://github.com/reduxjs/redux-templates/tree/master/packages/vite-template-redux)._

- vite
- Typescript
- React
- Redux / RTK
- Ant Design & SASS
- vitest

## Quick start

1. `git clone … && cd …` - clone repo & switch to project directory
2. `npm install` - install deps
3. `npm start` - start development

## Scripts

- `npm run dev`/`npm start` - start dev server and open browser
- `npm run build` - build for production
- `npm run preview` - locally preview production build
- `npm run test` - launch test runner
- `npm run lint` - run linter
- `npm run type-check` - run typescript check

## Preview & Demo

https://zetorama.github.io/beaver-billy-app/

| Mobile | Tablet | Desktop |
| ---- | --- | ---------- |
| ![image](https://github.com/zetorama/beaver-billy-app/assets/3330844/f069a4a2-03ed-4ffc-9c63-ea0138ef537c) | ![image](https://github.com/zetorama/beaver-billy-app/assets/3330844/7cc6cddf-9ab6-4ed3-aa34-c48a8ea70848) | ![image](https://github.com/zetorama/beaver-billy-app/assets/3330844/411007b7-641a-461d-8bd1-87e98c55a35f) |

## Challenges & Decisions

**Tech stack** 

- I wanted to create a project on `vite` even though I barely used it before. I went with an app template recommended by Redux, and changed a few things to my preferences. Overall, vite was easy to work with, and incredibly fast.
- Usually I wouldn’t use any components library for this scale of an app, however I decided to try `Ant Design` since it’s being used by the company as well. Some components were very handy and improved UX nicely, for example, buttons’ tooltips and animated confirmation modal. On the other hand, I spent a lot of time figuring out how to adjust styles and properly build forms. Initially I was hoping that it wouldn’t need too much of additional CSS, but I ended up writing a lot of my own, including some overrides to Ant’s default styles.
- Similarly, for the app’s state management it would be enough to use bundled hooks (`useContext` + `useReducer`), but I went with Redux, which adds better structure and makes it easier to develop further (in case if this app would need additional features).


**Implementation** 

- About 3/4 of the whole time was spent on just getting markup ready (i.e. creating dumb components). I’ve found the provided Figma mockups to have many inconsistencies between different views and states, so I had to make some decisions and “standardizations” on my own. For example, the same page shows different backgrounds and shadows between — this would be something to double check with the designer beforehand. Additionally, I would double ask about some possible improvements for UI/UX (some of which were proactively implemented), for example:
  - “apply” button for name changing functionality
  - welcome banner / empty projects placeholder
  - successful/failed action feedback toasts (didn’t implement)
- The app's source offers a “structured by feature” approach:
  - `feature/projects` folder contains most of the components and logic related to Projects
  - `pages/app` defines page layout and wires “features” together
- The data structure and flow is pretty simple. The global state just contains a list of projects, but also holds an `isNewProjectRequested` flag, which regulates if the new project’s form should be active. This allows “external” control for the form (for example, the “big plus” button is not part of `feature/projects`), and an easy way to show the form on page load (either for a brand new user or when restoring state).




