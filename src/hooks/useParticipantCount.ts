import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useParticipantCount() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const { count } = await supabase
        .from("x_torneo")
        .select("*", { count: "exact", head: true });
      setTotal(count);
    }

    void load();
  }, []);

  return total;
}
