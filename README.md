# React Router Example of using Middleware with ShouldRevalidate

This example demonstrates how to use the new middleware feature along with the `shouldRevalidate` function in React Router.

The route `routes/_.tsx` has a middleware that takes 500ms to run. A loader that takes another 500ms to run and returns the current date.

Additionally, it exports a `shouldRevalidate` function that returns `false` all the time, so the loader will never run again unless the user reloads the page.

The route `routes/_.$id.tsx` has a loader that takes 100ms and returns the `params.id` and that id plus one. This renders the ID value, and a link to the next ID (`id + 1`), and a loading indicator when a navigation is in progress.

When going to the `/1` URL the server terminal logs:

```
middleware: _
loader: _
loader: _.$id
```

Meaning the middleware ran, then both loaders ran.

When going to the `/2` URL, by clicking the link, the server terminal logs:

```
middleware: _
loader: _.$id
```

Meaning the middleware ran, but the loader for `_` did not run again because `shouldRevalidate` returned `false`.
