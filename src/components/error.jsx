import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  let title = "An error Occured";
  let message = error.data?.message || "Something went wrong, try again later.";
  let status = error.status;

  return (
    <div>
      <h1>{title}</h1>
      <p>{message}</p>
      <p>{status} error</p>
    </div>
  );
}
