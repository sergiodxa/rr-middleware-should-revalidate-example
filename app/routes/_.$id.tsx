import { setTimeout } from "node:timers/promises";
import type { Route } from "./+types/_.$id";
import { href, Link, useNavigation } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  console.debug("loader: _.$id");
  await setTimeout(100);
  return { id: params.id, next: String(Number(params.id) + 1) };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  let navigation = useNavigation();
  return (
    <>
      <p>Component: {loaderData.id}</p>
      <Link to={href("/:id", { id: loaderData.next })}>
        <span>Go to {loaderData.next}</span>
        {navigation.state !== "idle" && <span>Loading...</span>}
      </Link>
    </>
  );
}
