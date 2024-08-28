import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { xkcdAPI } from "~/api/xkcdAPI";
import Comic, { ComicProps } from "~/components/Comic";
import { preloadImage } from "~/functions/preloadImage";

export async function loader() {
  return xkcdAPI();
}

export default function Index() {
  const data = useLoaderData<ComicProps>();
  // Preload the first comic image on home page only (no need to keep loading it on other pages)
  useEffect(() => {
    preloadImage("https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg");
  }, []);
  return <Comic {...data} />;
}
