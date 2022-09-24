# Introduction

This is a web app created using [ReactJS](https://reactjs.org) and [Leaflet](https://leafletjs.com/) which allows user to interactively create routes (polylines) by providing stops (latitude and longitude).

# Getting Started

Clone this repo in your local file system.

## Running the app
In the project directory:

1. Install dependencies
> npm install

2. Run the app in the development mode.
> npm start

- You will see some warnings for leaflet package.

3. Access the app\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

## App usage
Once app is up and running user will get a web page as shown below.

![image](https://user-images.githubusercontent.com/6827941/192094096-627b21c9-37cc-4f34-a736-4ab22c1f048e.png)

### Basic usage
1. Scroll and drag to zoom and pan on the map.
2. Create route by clicking on `Add Route` button.
  - This will add a route with auto generated name and id and no stops.
3. Edit a route by clicking on the route header (shaded bar where the route name appears)
  - This will open a form where user can add/update/delete stops.
  - The map will show stops on the maps as solid dots as the user provides the latitude and longitude.
  - Clicking on the dot will show a popup with stop details.
  - Polylines will start showing on the map as soon as more than 1 stop is added.
  - Delete a stop by clicking on the trash icon beside it.
4. Delete a route by clicking on trash icon on the bar showing route name.
5. Export created routes by click on the ![image](https://user-images.githubusercontent.com/6827941/192095150-aa6fb76e-8a6f-43e1-9f0d-a60712cd46b5.png)
icon on the right of `Routes` header.

### Usability interactions
- Clicking on the route header will collapse/expand the corresponding route form.
- Active routes are shown in green and inactive ones in red on the left pane.
- Similarly, lines and dots on map are green if the route is active and red if route is inactive.
- Clicking on ![image](https://user-images.githubusercontent.com/6827941/192095271-b6a7c9fb-1656-4522-9d80-db10ca17ce67.png)
 icon on route header will recenter the map to the starting point of route. This is handy if the route is currently not on the screen.
- User can reset the map to default location (Bangalore) and default zoom by clicking on the ![image](https://user-images.githubusercontent.com/6827941/192095304-58a7e064-fe20-477a-984d-a2a4a1ee84bc.png)
icon in the `Map Center` section.
- If you ever forget any of the above simply hover on icons to get a tooltip :)
