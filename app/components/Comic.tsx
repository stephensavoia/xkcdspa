import { useEffect } from "react";
import NavLinks from "~/components/NavLinks";
import { preloadImage } from "~/functions/preloadImage";

export type ComicProps = {
  id: number;
  title: string;
  img: string;
  alt: string;
  prevLink: string;
  prevImg: string;
  nextLink: string;
  nextImg: string;
  randomLink: string;
  randomImg: string;
};

export default function Comic(data: ComicProps) {
  useEffect(() => {
    preloadImage(data.prevImg);
    preloadImage(data.nextImg);
    preloadImage(data.randomImg);
  }, []);

  const imgSrc = data.img;
  const imgSrc2x = imgSrc ? imgSrc.replace(/(\.[\w\d_-]+)$/i, "_2x$1") : "";

  const handleShare = async (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.title}`,
          text: `${data.alt}`,
          url: `https://xkcd.com/${data.id}`,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.log("Share API not supported");
    }
  };

  // Some of the xkcd comics are not available in high resolution
  // so we remove the srcset attribute if the image fails to load
  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = event.target as HTMLImageElement;
    target.srcset = "";
  };

  return (
    <div className="comic-container">
      <NavLinks
        prevLink={data.prevLink}
        nextLink={data.nextLink}
        randomLink={data.randomLink}
      />
      <h2 className="comic-title">{data?.title}</h2>
      <div className="comic">
        <img
          src={data.img}
          title={data.title}
          alt={data.alt}
          srcSet={`${imgSrc2x} 2x`}
          style={{ imageOrientation: "none" }}
          onError={handleError}
        />
      </div>
      <a href="#" className="comic-share-link" onClick={handleShare}>
        <span>Share</span>
        <svg
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M15.5 6.5L8.5 10.5"
            stroke="currentColor"
            strokeWidth="1.5"
          ></path>
          <path
            d="M8.5 13.5L15.5 17.5"
            stroke="currentColor"
            strokeWidth="1.5"
          ></path>
        </svg>
      </a>
      <NavLinks
        prevLink={data.prevLink}
        nextLink={data.nextLink}
        randomLink={data.randomLink}
      />
    </div>
  );
}
