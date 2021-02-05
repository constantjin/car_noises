import React, { useState, useEffect } from "react";
import { saveRating } from "../utils/api";
import { getSubjectStore } from "../stores/experiment";

import RatingScale from "../components/RatingScale";

export default function Rating({ history }) {
  const [arousal, setArousal] = useState(0);
  const [dominance, setDominance] = useState(0);
  const [valence, setValence] = useState(0);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");
  const subject = getSubjectStore().subjectId;
  const sound = getSubjectStore().currSoundName;

  useEffect(() => {
    const submitRating = async () => {
      if (finished) {
        try {
          await saveRating({
            subject,
            sound,
            arousal,
            dominance,
            valence,
          });
          setError("");
          history.push("/sound");
        } catch (err) {
          setError("서버 에러가 발생했습니다");
        }
      }
    };

    submitRating();
  }, [finished, history, subject, sound, arousal, dominance, valence]);

  useEffect(() => {
    setTimeout(() => {
      setFinished(true);
    }, 10000);
  }, []);

  useEffect(() => {
    if (!(arousal === 0 || dominance === 0 || valence === 0)) {
      console.log(
        `DEBUG: arousal: ${arousal}, dominance: ${dominance}, valence: ${valence}`
      );
      setFinished(true);
    }
  }, [arousal, dominance, valence]);

  return (
    <div>
      <span className="block font-medium tracking-wide text-red-500 text-base mt-1 text-center mb-3">
        {error}
      </span>
      <RatingScale
        ratingTitle="Arousal (자극적임)"
        leftText="← 안정적"
        rightText="자극적 →"
        setRating={setArousal}
      />
      <div className="mt-8">
        <RatingScale
          ratingTitle="Dominance (지배적임)"
          leftText="← 지배되는"
          rightText="지배하는 →"
          setRating={setDominance}
        />
      </div>
      <div className="mt-8">
        <RatingScale
          ratingTitle="Valence (감정가)"
          leftText="← 불쾌한"
          rightText="유쾌한 →"
          setRating={setValence}
        />
      </div>
    </div>
  );
}
