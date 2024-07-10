# Next JS capacitor integration.

[Next JS](https://nextjs.org/) website integrated with [Capacitor JS](https://capacitorjs.com/) = single codebase for website + android apk (aka an app) ready for installation on any device.
In line with capacitor guidelines we generate a static site [(subject to these constraints)](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) and use as the source of a gradle build.

# Prerequisites

- The Next app requires node 18+. This repo runs the dev server in a docker container to ease development.
- Generating Android apk image requires Java 17+ and Android SDK with JAVA_HOME, ANDROID_HOME and ANDROID_SDK_ROOT set.

e.g.

export JAVA_HOME="/usr/lib/jvm/jdk-17-oracle-x64"
export ANDROID_HOME="/usr/local/android-sdk"
export ANDROID_SDK_ROOT="/usr/local/android-sdk"
export PATH="$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin"

# installation

- npx create-next-app@latest my-app
- modify next.config.mjs to include output: 'export. [Read this](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- npx cap init
- npx cap add android

# docker

- aim is to run the dev server in a container for live updates and isolated output when building/rebuilding the static output
- this is quite server specific so change for your environment

- docker compose up for the dev server. 

dev version outputs to .next.dev
prod version outputs to .next.prod

## to run next js server

volumes:
    - ./.next.prod:/app/.next
    - ./next.config.server.mjs:/app/next.config.mjs
command: npm run start

## to run static (exported) server

volumes: 
    - ./next.config.static.mjs:/app/next.config.mjs
command: "npx serve@latest out" 

# create android app

After following these steps the apk android image available at [project root]/android/app/build/outputs/apk/debug.

For quick testing I am pushing this to my /public folder so I can download and install from the website.

## command line steps

from project root

- npm run build
- npx cap sync

from ./android (you need android and java sdk installed)

- gradlew/assembleDebug
