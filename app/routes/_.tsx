import { setTimeout } from "node:timers/promises";
import { Outlet } from "react-router";
import type { Route } from "./+types/_";

export const unstable_middleware: Route.unstable_MiddlewareFunction[] = [
  async (_, next) => {
    console.debug("middleware: _");
    await setTimeout(500);
    return await next();
  },
];

export async function loader() {
  console.debug("loader: _"); // This won't show up after the SSR
  await setTimeout(500);
  return { date: new Date() };
}

export function shouldRevalidate() {
  return false;
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <p>
        Layout:{" "}
        {loaderData.date.toLocaleTimeString("en", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </p>
      <Outlet />
    </>
  );
}
