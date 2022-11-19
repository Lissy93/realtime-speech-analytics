<h1 align="center">🗣️ Real-Time Speach Analytics</h1>
<p align="center">
  <i>Calculates and renders live speach insights, to help you understand the meaning and tone behind spoken language</i><br>
  <i>Useful for generating meeting notes, inteligent subtitles, practicing speaches, language translation, etc</i>
</p>

<p align="center">
   <a href="https://screencast-o-matic.com/watch/cbQvQMIxsN">
      <img width="700" src="https://i.ibb.co/5YGKZ1Q/real-time-speach-analysis.gif"/>
   </a>
</p>


### Intro 

This is a simple node app, which listens for speach (of any type), and in realtime calculates insightful 
stats from it, then generates a series of visual analytics in D3.js, which are updated live, as speach
comes in.

This includes, current sentiment, most commonly used words, pace of speach, key entities that are being mentioned, and more.
The technology developed can be put into use in areas, such as speach coaching, meeting notes, inteligent subtitles, learning languages, live news analysis, gauging consumer feedback on review videos, sports commentry etc...

_Initially developed as a prototype, by myself (Alicia Sykes), and Oliver Poole (in 24 hours!) during AngelHack London 2016._

### Demo
~There is a live demo running [here on Heroku](https://awesome-speech-analytics.herokuapp.com/)~ (Due to Heroku discontinuing free plans, the demo is no longer availible)

### Installation

1. Clone the repo, `git clone https://github.com/Lissy93/awesome-realtime-speech-analytics.git` and `cd` into it
2. Install dependencies `npm install` *Should automatically kick of bower too, but if not, run `bower install`*
3. Build the project `npm run build`
4. Start the project
    * Either start the project in production mode, with `npm start`
    * Or start in development mode, with `npm run dev`. Which will watch for changes, compile and refresh
    * Or just navigate to index.html in your browser, to use the static version

---

<p  align="center">
  <i>© <a href="https://aliciasykes.com">Alicia Sykes</a> 2016</i><br>
  <i>Licensed under <a href="https://gist.github.com/Lissy93/143d2ee01ccc5c052a17">MIT</a></i><br>
  <a href="https://github.com/lissy93"><img src="https://i.ibb.co/4KtpYxb/octocat-clean-mini.png" /></a>
</p>

