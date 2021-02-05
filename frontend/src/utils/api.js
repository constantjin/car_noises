import axios from "axios";

export async function setCsrfHeader() {
  const csrfEndPoint = "/api/csrf/";
  const response = await axios.get(csrfEndPoint);
  const token = response.data.csrfToken;
  axios.defaults.headers.common["X-CSRFTOKEN"] = token;
}

export async function fetchSoundUrls() {
  const soundsEndPoint = "/api/sounds/";

  try {
    const responses = await axios.get(soundsEndPoint);
    return responses.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function registerSubject(id, name) {
  const registerEndpoint = "/api/register/";
  try {
    const response = await axios.post(registerEndpoint, {
      participant_id: id,
      name,
    });
    const subjectId = response.data.id;
    console.log(`-- DEBUG -- \nregisterd subject_id:\n  ${subjectId}`);
    return subjectId;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function saveRating({
  subject,
  sound,
  arousal,
  dominance,
  valence,
}) {
  const ratingsEndpoint = "/api/ratings/";
  try {
    const response = await axios.post(ratingsEndpoint, {
      subject,
      sound,
      arousal,
      dominance,
      valence,
    });
    const ratingId = response.data.id;
    console.log(`-- DEBUG -- \nsaved rating_id:\n  ${ratingId}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
