import create from "zustand";

export const useSoundStore = create(() => ({
  soundList: [],
}));

export const getSoundStore = () => {
  return useSoundStore.getState();
};

export const initSoundList = (sounds) => {
  useSoundStore.setState({ soundList: [...sounds] });
};

export const randomSound = () => {
  let currSoundList = [...useSoundStore.getState().soundList];
  const soundListLength = currSoundList.length;
  if (soundListLength === 0) {
    return null;
  }
  const randomIdx = Math.floor(Math.random() * soundListLength);
  const randomSoundList = currSoundList.splice(randomIdx, 1);
  useSoundStore.setState({ soundList: [...currSoundList] });
  return randomSoundList[0];
};
