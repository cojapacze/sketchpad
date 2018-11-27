Sketchpad.pro
==========

Sketchpad Pro is a simple graphic editor written for web. This drawing plugin uses HTML5 Canvas supported by all modern browsers (Chrome, Firefox, Opera, Internet Explorer...). You can use any device to draw on "sketchpad". Drawen sketches you can export to jepg/png or save as .json history file.

Sketchpad Pro is using inputs history to store drawings. This allows to cooperate multiple users in real-time using WebSocket server.

Sketchpad Pro is fully customisable javascript library written in ES5.

Using Sketchpad Pro with a CDN
Copy this script and paste into your page to include Sketchpad Pro from CDN server:
```
<script src="https://cdn.sketchpad.pro/dist/current/sketchpad.min.js"></script>
```
Build your own Sketchpad Pro
1. Download & install current Node.js.
2. Download {@link https://developers.sketchpad.pro Sketchpad Pro developer pack} and extract ``sketchpad/`` folder or clone project from GitHub:

```
git clone https://github.com/cojapacze/sketchpad.git

```

3. Run in terminal:

```
cd sketchpad
npm install
gulp
```

4. Check dist/ folder for your build files. Open test page: demos/online.html to test your build.

5. Run local server
```
cd server
node server
```

Try:

```
gulp watch
```

to watch files for changes while development.

## Demos

https://developers.sketchpad.pro/advanced.html

## Docker

Dockerfile and docker-compose are available in the Docker directory of the project.

## Documentation

The full documentation is available online at the following address:
https://developers.sketchpad.pro/documentation.html

## Checking Your Installation

The Sketchpad.pro comes with a few sample pages that can be used to verify that
installation proceeded properly. Take a look at the `demos` in installation directory.

Just call for example:
```
  simple.html
```

## License
  AGPL-3.
  https://www.gnu.org/licenses/agpl-3.0.html
