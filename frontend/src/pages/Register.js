import { useState, useEffect } from "react";
import { setCsrfHeader, fetchSoundUrls } from "../utils/api";
import { initSoundList } from "../stores/sounds";

import Loading from "../components/Loading";
import RegisterForm from "../components/RegisterForm";

export default function Register({ history }) {
  const [initState, setInitState] = useState(false);

  useEffect(() => {
    const mainInit = async () => {
      try {
        await setCsrfHeader();
        const carSounds = await fetchSoundUrls();

        // Initialize sound stores
        initSoundList(carSounds);

        // Initialization finished
        setInitState(true);
      } catch (err) {
        console.log(err);
      }
    };

    mainInit();
  }, []);

  return initState ? <RegisterForm history={history} /> : <Loading />;
}
