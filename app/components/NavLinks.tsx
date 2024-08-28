import { Link } from "@remix-run/react";

type NavLinkProps = {
  prevLink: string;
  nextLink: string;
  randomLink: string;
};

function NavLinks(links: NavLinkProps) {
  return (
    <ul className="comic-nav">
      <li>
        <Link to="/1">|&lt;</Link>
      </li>
      <li>
        <Link rel="prev" to={links.prevLink} accessKey="p">
          &lt; Prev
        </Link>
      </li>
      <li>
        <Link to={links.randomLink}>Random</Link>
      </li>
      <li>
        <Link rel="next" to={links.nextLink} accessKey="n">
          Next &gt;
        </Link>
      </li>
      <li>
        <Link to="/">&gt;|</Link>
      </li>
    </ul>
  );
}

export default NavLinks;
