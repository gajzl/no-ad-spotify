# Custom Spotify Web Player App for Mac
A custom Spotify app for Mac made with Electron

## Pros and Cons of Web Player
- The official app from Spotify uses [Ogg Vorbis](https://xiph.org/vorbis/) compressed audio format, which is lower quality (even with the higher bit rate) compared to [AAC](https://en.wikipedia.org/wiki/Advanced_Audio_Coding), which is used in the Spotify Web Player.
- Being an made with Electron, this means that custom `.css` and `.js` files can be injected into the app, opening possibilities for ad-muters and removals of certain elements.
- However, the web player does not, at the time, support viewing friends activities.

## Instructions
### (1) Install Nativefier
Install [Nativefier](https://github.com/nativefier/nativefier) through the instructions in the official repository [here](https://github.com/nativefier/nativefier#installation).

### (2) Download files
Download [stylesheet.css](https://github.com/ghzliahlam/spotify-web/blob/main/stylesheet.css), [stylesheet.js](https://github.com/ghzliahlam/spotify-web/blob/main/stylesheet.js), and [icon.icns](https://github.com/ghzliahlam/spotify-web/blob/main/icon.icns) then put them in the home directory.

### (3) Using Nativefier to create app
```zsh
nativefier --name 'Spotify Web Player' 'open.spotify.com' --inject stylesheet.css --inject stylesheet.js --title-bar-style 'hiddenInset' --darwin-dark-mode-support --user-agent firefox --widevine --icon icon.icns
```
- `--name` specifies the name of the app that is to be created.
- `--inject stylesheet.css` allows for a `.css` file by the name of 'stylesheet.css' to be injected to the electron app to modify its layout.
- `--inject stylesheet.js` allows for JavaScript customisations by injecting the 'stylesheet.js' file.
- `--title-bar-style 'hiddenInset'` hides default macOS app title bar and positions the window buttons inset.
- `--darwin-dark-mode-support` enables dark mode support for macOS.
- `--user-agent firefox` convinces [open.spotify.com](open.spotify.com) that the browser used is Firefox, not Google Chrome.
- `--widevine` allows the app to play protected content.
- `--icon icon.icns` uses the official Spotify icon from the Mac Desktop app. If you prefer a macOS Big Sur–styled app icon, you can use [IconSur](https://github.com/rikumi/iconsur) with the instructions [here](https://github.com/ghzliahlam/spotify-web#use-a-macos-big-surstyled-app-icon-instead).

### (4) Move app to the Applications folder
Move the created app (by default, put in the home directory) to the `/Applications` folder by using the `mv` command in the terminal:
```zsh
mv Spotify\ Web\ Player-darwin-x64 /Applications
```

### Use a macOS Big Sur–styled app icon instead
Install [IconSur](https://github.com/rikumi/iconsur) through the instructions in the official repository [here](https://github.com/rikumi/iconsur#installation) and use it to change the app icon using an existing one from the iOS App Store (note that a password will be required):
```zsh
sudo iconsur set /Applications/Spotify\ Web\ Player-darwin-x64/Spotify\ Web\ Player.app --keyword "Spotify"
```
