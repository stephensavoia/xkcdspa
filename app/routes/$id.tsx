import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { xkcdAPI } from "~/api/xkcdAPI";
import Comic, { ComicProps } from "~/components/Comic";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (id === undefined) throw new Response("Comic ID is undefined");
  return xkcdAPI(Number(id));
}

export default function ComicById() {
  const data = useLoaderData<ComicProps>();
  return <Comic {...data} />;
}
