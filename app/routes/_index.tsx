import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare!",
    },
  ];
};

export default function Index() {
  return (
    <div className="comic-container">
      <ul className="comic-nav">
        <li>
          <a href="/1/">|&lt;</a>
        </li>
        <li>
          <a rel="prev" href="/2974/" accessKey="p">
            &lt; Prev
          </a>
        </li>
        <li>
          <a href="//c.xkcd.com/random/comic/">Random</a>
        </li>
        <li>
          <a rel="next" href="/2976/" accessKey="n">
            Next &gt;
          </a>
        </li>
        <li>
          <a href="/">&gt;|</a>
        </li>
      </ul>
      <h2 className="comic-title">#2975 - Classical Periodic Table</h2>
      <div className="comic">
        <img
          src="//imgs.xkcd.com/comics/classical_periodic_table.png"
          title="Personally I think mercury is more of a 'wet earth' hybrid element."
          alt="Classical Periodic Table"
          srcSet="//imgs.xkcd.com/comics/classical_periodic_table_2x.png 2x"
          style={{ imageOrientation: "none" }}
        />
      </div>
      <a href="#" className="comic-share-link">
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
      <ul className="comic-nav">
        <li>
          <a href="/1/">|&lt;</a>
        </li>
        <li>
          <a rel="prev" href="/2974/" accessKey="p">
            &lt; Prev
          </a>
        </li>
        <li>
          <a href="//c.xkcd.com/random/comic/">Random</a>
        </li>
        <li>
          <a rel="next" href="/2976/" accessKey="n">
            Next &gt;
          </a>
        </li>
        <li>
          <a href="/">&gt;|</a>
        </li>
      </ul>
    </div>
  );
}
