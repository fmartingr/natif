Natif
=====

Load webpages as if they where native OS applications.

## Summary

From some time on, everything is moving to the web. We are losing desktop applications as part of our workflow and even if that's a good thing for some, there are other that could be just applications.

I want to override that barrier with a single app, you just ran it with the URL of the site you want to *convert* to a native application and it will just launch a browser without any menubar and an isolated session environment for that particular URL so logins are mantained when you reopen the app.

The main use case for now is to create custom script launchers for apps using the `natif` command to launch them instead of having lot's of executables around there.

## Installation

You can either [download the latest binaries from the latest release](https://github.com/fmartingr/natif/releases) or [build them for your platform](#building-binaries) if they are not there.

## Usage

Run the application with the URL you want to run as an OS application

``` plain
$ natif https://www.irccloud.com/
```

## Development

### Prepare the development environment

You just need to clone the repository to your local machine.

```
git clone git@github.com/fmartingr/natif.git
cd natif
make setup
```

> Remember that if you want to contribute to the project you need to fork it and clone from your username/organization.

After that, you can run the app with `npm start`.

### Building binaries

Natif uses [electron-packager](https://github.com/electron-userland/electron-packager) to easily build binaries for any platform, if you want to build the specific binaries for yours because they are not on the releases page you can use this command:

```
make build_auto
```
