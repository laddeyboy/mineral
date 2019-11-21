# Assessment

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements

- [x] Please use a React framework using React App.
- [x] Requirement #2: Please build off Mapbox’s API.
- [x] User should be able to draw a polygon on a map.
- [x] Modal should appear on map and allow User to type written information.
- [ ] Both the geospatial polygon data and the written information should be stored somewhere in a reproducible format (can be a local csv or json – no need to setup a sql server or anything unless that is your preference).

## Challenges

I initially created App.tsx as a React Hook. However, I was unsuccessful to change state. The issue seemed to originate from the fact Hooks don't allow you to access state from a function called from another function. I switched App.tsx to a class component and was able to make the note annotations work.
