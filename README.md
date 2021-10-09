# Ad-Muted Spotify
A custom ad-muted Spotify ([© 2021 Spotify AB](https://www.spotify.com/uk/legal/end-user-agreement/)) app for Mac made with Electron.

Ads in this unofficial Spotify app are only ***muted***, ***not blocked*** due to Spotify's policy of [suspending or terminating accounts caught using ad-blockers](https://techcrunch.com/2019/02/08/spotify-will-now-suspend-or-terminate-accounts-it-finds-are-using-ad-blockers/).

## Pros and Cons of Web Player
### Pros
- The official app from Spotify uses [Ogg Vorbis](https://xiph.org/vorbis/) compressed audio format, which is lower quality (even with the higher bit rate) compared to [AAC](https://en.wikipedia.org/wiki/Advanced_Audio_Coding), which is used in the Spotify Web Player.
- Being an made with Electron, this means that custom `.css` and `.js` files can be injected into the app, opening possibilities for ad-muters and removals of certain elements.
### Cons
- The web player does not, at the time, support viewing friends activities.
- It also lacks the playlist filtering feature.

## Instructions
### (1) Install Nativefier
Install [Nativefier](https://github.com/nativefier/nativefier) through the instructions in the official repository [here](https://github.com/nativefier/nativefier#installation).

### (2) Download files
Download [stylesheet.css](https://github.com/gajzl/spotify-web/blob/main/stylesheet.css), [stylesheet.js](https://github.com/gajzl/spotify-web/blob/main/stylesheet.js), and [icon.icns](https://github.com/gajzl/spotify-web/blob/main/icon.icns) (icon belongs to [© Spotify](https://www.spotify.com/uk/legal/end-user-agreement/)) then put them in the home directory.

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
- `--icon icon.icns` uses the official Spotify icon (belonging to [© Spotify](https://www.spotify.com/uk/legal/end-user-agreement/)) from the Mac Desktop app. If you prefer a macOS Big Sur–styled app icon, you can use [IconSur](https://github.com/rikumi/iconsur) with the instructions [here](https://github.com/gajzl/spotify-web#use-a-macos-big-surstyled-app-icon-instead).

### (4) Move app to the Applications folder
Move the created app (by default, put in the home directory) to the `/Applications` folder by using the `mv` command in the terminal:
```zsh
mv Spotify\ Web\ Player-darwin-x64 /Applications
```
### (5) Sign Widevine with EVS
Widevine has to be signed with [EVS](https://github.com/castlabs/electron-releases/wiki/EVS) in order for contents in the app to play. Install EVS by entering this on the command line.
```zsh
python3 -m pip install --upgrade castlabs-evs
```
You might be prompted to update your version of `pip`. If so, follow the instructions given in the command line.
After successfully installing EVS, create an account.
```zsh
python3 -m castlabs_evs.account signup
```
Or, if you already have an account, you can login to it.
```zsh
python3 -m castlabs_evs.account reauth
```
Sign the application package.
```zsh
python3 -m castlabs_evs.vmp sign-pkg /Applications/Spotify\ Web\ Player-darwin-x64
```
More details on the usage of EVS [here](https://github.com/castlabs/electron-releases/wiki/EVS).

### Use a macOS Big Sur–styled app icon instead
Install [IconSur](https://github.com/rikumi/iconsur) through the instructions in the official repository [here](https://github.com/rikumi/iconsur#installation) and use it to change the app icon using an existing one from the iOS App Store (note that a password will be required):
```zsh
sudo iconsur set /Applications/Spotify\ Web\ Player-darwin-x64/Spotify\ Web\ Player.app --keyword "Spotify"
```
