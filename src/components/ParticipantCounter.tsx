import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "./ParticipantCounter.css";

function ParticipantCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      const { count, error } = await supabase
        .from("x_torneo")
        .select("*", { count: "exact", head: true });

      if (!error) {
        setCount(count);
      }
    }

    void fetchCount();
  }, []);

  if (count === null) {
    return null;
  }

  return (
    <p className="participant-count">
      <span className="participant-count__label">Participantes inscritos</span>
      <span className="participant-count__number">{count}</span>
    </p>
  );
}

export default ParticipantCounter;
