import useFetch from "./useFetch";
import { useState } from "react";

export default function useMultipleFetch(baseUrl1, baseUrl2) {
  const [loading, setLoading] = useState(false);
  const { get } = useFetch("");

  function getData(url1, url2) {
    setLoading(true);
    return Promise.all([get(baseUrl1 + url1), get(baseUrl2 + url2)]).finally(
      () => setLoading(false)
    );
  }

  return { getData, loading };
}
