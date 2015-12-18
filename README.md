# StreamTV
http://stream-tv.herokuapp.com/

### An embedded screenshot of the app
![Site Screenshot](./StreamTV_screenshot.png?raw=true "StreamTV")

### Explanations of the technologies used
StreamTV is a MEAN-stack application - utilizing MongoDB(with Mongoose), Express, Angular, Node and the Youtube Data API V3.
I used: 
	* MongoDB to store information of my authenticated users.
	* Express as a node framework - which made routing simpler.
	* Angular to display content on the front end.
	* Node to handle activity on the back end.


### Approach
I prioritized the connection to Youtube Data API v3 because, without it, I wouldn't have content on my site. This API took far longer than I had anticipated. After I got videos on my page, I then focused on details surrounding the videos (descriptions, titles, thumbnails) that a user would require.

### Installation instructions for any dependencies
I created services to manage authentication activities, as well as manage content that controllers share between one another. 
I created a filter to verify the authenticity of an iframe's ng-src link. Without this, the video will not work.

### User Stories
StreamTV users are millenials who enjoy an ad-free experience with a simple, straight-to-the-point design.
A StreamTV User wants:
	* to log in to view content
	* autofocus search
	* a choice of several related videos
	* descriptions and titles of videos, in order to make a choice
	* a show page to view content
	* convenient back button to traverse user's path
	* convenient clear button to clear searches

### Link to your wireframes – sketches of major views / interfaces in your application
https://generalassembly.mybalsamiq.com/projects/wdi-sea-04/VideoApp

### Descriptions of any unsolved problems or major hurdles you had to overcome
It took too long for me to setup the Youtube API, due to my unfamiliarity with it and obsolete documentation. This delayed any other CRUD functionality that I wanted to implement.
