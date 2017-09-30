# Realtime Speach Analytics


### Intro 

This is a simple node app, which listens for speach (of any type), and in realtime calculates insightful 
stats from it, then generates a series of visual analytics in D3.js, which are updated live, as speach
comes in. This includes, current sentiment, most commonly used words, pace of speach, key entities that
are being mentioned, and more. 

This was developed as a prototype, by myself (Alicia Sykes), and Oliver Poole (in 24 hours!) during AngelHack
London 2016. The purpose of it was to provide a platform that can be built on later, that shows real-time 
analytics of speech. The technology developed for it could then be put to use in other areas, such as meeting 
notes, more inteligent subtitles, practicing speaches etc...

### Demo
There is a live demo running on http://realtime-speech-analytics.as93.net 
or [here on Heroku](https://awesome-speech-analytics.herokuapp.com/)

Or watch the short video below:

[![Demo Video of Realtime Speach Analytics](https://i.imgur.com/8qyo3JW.png)](https://screencast-o-matic.com/watch/cbQvQMIxsN)

### Installation

1. Clone the repo, `git clone https://github.com/Lissy93/awesome-realtime-speech-analytics.git` and `cd` into it
2. Install dependencies `npm install` *Should automatically kick of bower too, but if now, run `bower install`*
3. Build the project `npm run build`
4. Start the project
    * Either start the project in production mode, with `npm start`
    * Or start in development mode, with `npm run dev`. Which will watch for changes, compile and refresh
    * Or just navigate to index.html in your browser, to use the static version

### License 

Licensed under the MIT License. Copyright 2017 Alicia Sykes and Oliver Poole. 
[View License](https://gist.github.com/Lissy93/143d2ee01ccc5c052a17). 
