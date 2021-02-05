import create from "zustand";

export const useSubjectStore = create(() => ({
  subjectId: null,
  currSoundName: "",
}));

export const getSubjectStore = () => {
  return useSubjectStore.getState();
};

export const setSubjectId = (id) => {
  useSubjectStore.setState((state) => ({ ...state, subjectId: id }));
};

export const setSoundName = (name) => {
  useSubjectStore.setState((state) => ({ ...state, currSoundName: name }));
};
