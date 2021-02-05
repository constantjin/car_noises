import { Howl } from "howler";

export function asyncLoadCarSound(name, url) {
  if (!window.howlStore) {
    window.howlStore = {};
  }
  return new Promise((resolve) => {
    // If current sound already loaded, resolve
    if (window.howlStore[name] && window.howlStore[name].state() === "loaded") {
      console.log(`DEBUG: Sound - ${name} is already loaded`);
      resolve();
    } else {
      // Load new sound
      window.howlStore[name] = new Howl({
        src: [url],
        volume: 1.0,
        preload: true,
        html5: true,
        onload: () => {
          console.log(`DEBUG: Sound - ${name} is now loaded`);
          resolve();
        },
      });
    }
  });
}

export function asyncLoadSoundHTML5(name, url) {
  if (!window.howlStore) {
    window.howlStore = {};
  }
  return new Promise((resolve) => {
    window.howlStore[name] = new Howl({
      src: [url],
      volume: 1.0,
      preload: true,
      html5: true,
      onload: () => {
        console.log(`DEBUG: Sound - ${name} is now loaded`);
        resolve();
      },
    });
  });
}

export function asyncLoadSoundListHTML5(soundList) {
  const promiseList = soundList.map((sound) => {
    return asyncLoadSoundHTML5(sound.name, sound.url);
  });
  return Promise.all(promiseList);
}

export function playSound(name) {
  const currSound = window.howlStore[name];
  if (!currSound) {
    console.error(`Sound - ${name} should be created first!`);
  } else if (currSound.state() !== "loaded") {
    console.error(`Sound - ${name} should be loaded first!`);
  } else if (currSound.playing()) {
    console.error(`Sound - ${name} is already playing!`);
  } else {
    currSound.play();
  }
}

export function asyncPlaySound(name) {
  const currSound = window.howlStore[name];
  if (!currSound) {
    console.error(`Sound - ${name} should be created first!`);
  } else if (currSound.state() !== "loaded") {
    console.error(`Sound - ${name} should be loaded first!`);
  } else if (currSound.playing()) {
    console.error(`Sound - ${name} is already playing!`);
  } else {
    return new Promise((resolve) => {
      currSound.play();
      currSound.once("end", () => {
        resolve();
      });
    });
  }
}

export function stopSound(name) {
  const currSound = window.howlStore[name];
  if (!currSound) {
    console.error(`Sound - ${name} should be created first!`);
  } else if (currSound.state() !== "loaded") {
    console.error(`Sound - ${name} should be loaded first!`);
  } else {
    currSound.stop();
  }
}

export function setVolume(name, vol) {
  const currSound = window.howlStore[name];
  if (!currSound) {
    console.error(`Sound - ${name} should be created first!`);
  } else if (currSound.state() !== "loaded") {
    console.error(`Sound - ${name} should be loaded first!`);
  } else {
    currSound.volume(vol);
  }
}

export function unloadSound(name) {
  const currSound = window.howlStore[name];
  if (!currSound) {
    console.error(`Sound - ${name} should be created first!`);
  } else if (currSound.state() !== "loaded") {
    console.error(`Sound - ${name} should be loaded first!`);
  } else {
    currSound.unload();
    window.howlStore[name] = null;
    delete window.howlStore[name];
    console.log(`DEBUG: Sound - ${name} is unloaded`);
  }
}

export function cleanHowlStore() {
  for (let sound in window.howlStore) {
    unloadSound(sound);
  }
  window.howlStore = null;
}
