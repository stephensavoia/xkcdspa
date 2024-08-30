import { redirect } from "@remix-run/cloudflare";

interface ComicData {
  num: number;
  title?: string;
  img?: string;
  alt?: string;
}

export async function xkcdAPI(comicId: number | null = null) {
  try {
    let latestResponse = await fetch("https://xkcd.com/info.0.json");
    if (!latestResponse.ok) {
      throw new Error("Failed to fetch data from xkcd API");
    }
    let latestData: ComicData = await latestResponse.json();

    if (
      (comicId != null && isNaN(comicId)) ||
      (comicId && comicId > latestData.num) ||
      (comicId && comicId < 1)
    ) {
      return redirect("/");
    }
    let randomNumber = Math.floor(Math.random() * latestData.num) + 1;
    let randomResponse = await fetch(
      `https://xkcd.com/${randomNumber}/info.0.json`
    );
    let randomData: ComicData = await randomResponse.json();

    if (comicId && comicId !== latestData.num && comicId !== 1) {
      const [currentResponse, prevResponse, nextResponse]: [
        Response,
        Response,
        Response
      ] = await Promise.all([
        fetch(`https://xkcd.com/${comicId}/info.0.json`),
        fetch("https://xkcd.com/" + (comicId - 1) + "/info.0.json"),
        fetch("https://xkcd.com/" + (comicId + 1) + "/info.0.json"),
      ]);

      const [currentData, prevData, nextData]: [
        ComicData,
        ComicData,
        ComicData
      ] = await Promise.all([
        currentResponse.json() as Promise<ComicData>,
        prevResponse.json() as Promise<ComicData>,
        nextResponse.json() as Promise<ComicData>,
      ]);

      return {
        id: currentData.num,
        title: currentData.title,
        img: currentData.img,
        alt: currentData.alt,
        prevLink: `/${prevData.num}`,
        prevImg: prevData.img,
        nextLink: `/${nextData.num}`,
        nextImg: nextData.img,
        randomLink: `/${randomData.num}`,
        randomImg: randomData.img,
      };
    } else if (comicId === 1) {
      return {
        id: 1,
        title: "Barrel - Part 1",
        img: "https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg",
        alt: "Don't we all.",
        prevLink: "/1",
        prevImg: "https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg",
        nextLink: "/2",
        nextImg: "https://imgs.xkcd.com/comics/tree_cropped_(1).jpg",
        randomLink: `/${randomData.num}`,
        randomImg: randomData.img,
      };
    } else {
      let prevResponse = await fetch(
        "https://xkcd.com/" + (latestData.num - 1) + "/info.0.json"
      );
      let prevData: ComicData = await prevResponse.json();
      return {
        id: latestData.num,
        title: latestData.title,
        img: latestData.img,
        alt: latestData.alt,
        prevLink: `/${prevData.num}`,
        prevImg: prevData.img,
        nextLink: `/${latestData.num}`,
        nextImg: latestData.img,
        randomLink: `/${randomData.num}`,
        randomImg: randomData.img,
      };
    }
  } catch (error: unknown) {
    throw new Error(`Error loading comic data: ${(error as Error).message}`);
  }
}
