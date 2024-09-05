import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { xkcdAPI } from "~/api/xkcdAPI";
import Comic, { ComicProps } from "~/components/Comic";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (id === undefined) throw new Response("Comic ID is undefined");
  return xkcdAPI(Number(id));
}

export default function ComicById() {
  const data = useLoaderData<ComicProps>();
  const [preloadComicData, setPreloadComicData] = useState<ComicProps | null>(
    null
  );
  const navigation = useNavigation();

  useEffect(() => {
    window.localStorage.setItem("localComicData", JSON.stringify(data));
    const localStorage = window.localStorage.getItem("localComicData");
    if (localStorage) {
      console.log(localStorage);
      let preloadData = JSON.parse(localStorage);
      let preloadComicId = String(navigation.location?.pathname);

      switch (preloadComicId) {
        case preloadData.nextLink:
          preloadData.img = preloadData.nextImg;
          preloadData.title = preloadData.nextTitle;
          break;
        case preloadData.prevink:
          preloadData.img = preloadData.prevImg;
          preloadData.title = preloadData.prevTitle;
          break;
        case preloadData.randomLink:
          preloadData.img = preloadData.randomImg;
          preloadData.title = preloadData.randomTitle;
          break;
        case "/":
          preloadData.img = preloadData.latestImg;
          preloadData.title = preloadData.latestTitle;
          break;
        case "/1":
          preloadData.img =
            "https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg";
          preloadData.title = "Barrel - Part 1";
          break;
        default:
          break;
      }

      setPreloadComicData(preloadData);
    }
  }, [navigation]);

  if (preloadComicData != null && navigation.state === "loading")
    return <Comic {...preloadComicData} />;

  return <Comic {...data} />;
}
