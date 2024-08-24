import { useParams } from "@remix-run/react";

export default function VariableRoute() {
  const { id } = useParams();

  return (
    <div>
      <h1>Dynamic Route</h1>
      <p>The variable is: {id}</p>
    </div>
  );
}
