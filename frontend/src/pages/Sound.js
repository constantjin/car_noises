import React, { useEffect } from "react";
import { setSoundName } from "../stores/experiment";
import { randomSound } from "../stores/sounds";
import {
  asyncLoadCarSound,
  asyncPlaySound,
  unloadSound,
} from "../utils/howler";

export default function Emotional({ history }) {
  useEffect(() => {
    const asyncInitEmotional = async () => {
      // (pseudo)Random sample a carsound
      const selectedCarSound = randomSound();

      // If there is no remaining carsound, route to /end
      if (!selectedCarSound) {
        history.push("/end");
      } else {
        // Else, register the carsound
        setSoundName(selectedCarSound.name);
        // Load the carsound
        await asyncLoadCarSound(selectedCarSound.name, selectedCarSound.url);
        // Asynchronously play the carsound sound
        await asyncPlaySound(selectedCarSound.name);
        // Then unload the finished sound
        unloadSound(selectedCarSound.name);
        // Finally, route to /rating.
        history.push("/rating");
      }
    };

    asyncInitEmotional();
  }, [history]);
  return (
    <div>
      <p className="text-7xl">+</p>
    </div>
  );
}
