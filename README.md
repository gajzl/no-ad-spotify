# Custom Spotify Web Player App for Mac
A custom Spotify app for Mac made with Electron

## Pros and Cons of Web Player
- The official app from Spotify uses [Ogg Vorbis](https://xiph.org/vorbis/) compressed audio format, which is lower quality (even with the higher bit rate) compared to [AAC](https://en.wikipedia.org/wiki/Advanced_Audio_Coding), which is used in the Spotify Web Player.
- Being an made with Electron, this means that custom `.css` and `.js` files can be injected into the app, opening possibilities for ad-muters and removals of certain elements.
- However, the web player does not, at the time, support viewing friends activities.

## Instructions
### (1) Install necessary tools
- Install [Nativefier](https://github.com/nativefier/nativefier) through the instructions in the official repository [here](https://github.com/nativefier/nativefier#installation).
- Install [IconSur](https://github.com/rikumi/iconsur) through the instructions in the official repository [here](https://github.com/rikumi/iconsur#installation).

### (2) Download files
Download [stylesheet.css](https://github.com/ghzliahlam/spotify-web/blob/main/stylesheet.css) and [stylesheet.js](https://github.com/ghzliahlam/spotify-web/blob/main/stylesheet.js), then put them in the home directory.

### (3) Using Nativefier to create app
```zsh
nativefier --name 'Spotify Web Player' 'open.spotify.com' --inject stylesheet.css --inject stylesheet.js --title-bar-style 'hiddenInset' --darwin-dark-mode-support --user-agent firefox --widevine
```

### (4) Move app to the Applications folder
Move the created app (by default, put in the home directory) to the `/Applications` folder by using the `mv` command in the terminal:
```zsh
mv Spotify\ Web\ Player-darwin-x64 /Applications
```

### (5) Create app icon
Use [IconSur](https://github.com/rikumi/iconsur) to change the app icon using an existing one from the iOS App Store (note that a password is required):
```zsh
sudo iconsur set /Applications/Spotify\ Web\ Player-darwin-x64/Spotify\ Web\ Player.app --keyword "Spotify"
```
