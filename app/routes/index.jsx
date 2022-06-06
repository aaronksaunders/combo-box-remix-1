import stylesUrl from "../styles/index.css";
import { useCallback, useEffect } from "react";
import { json } from "@remix-run/node";

import { Form, useActionData, useFetcher } from "@remix-run/react";

export function meta() {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
}

export function links() {
  return [{ rel: "stylesheet", href: stylesUrl }];
}

export async function loader({ request }) {
  // we are not loading data here because we are loading
  // data in the user effect using a fetcher
  return null;
}

export async function action({ request }) {
  const body = await request.formData();
  const petType = body.get("petType");
  const selectedPet = body.get("selectedPet");
  return { message: `Type: ${petType}, Value: ${selectedPet}` };
}

export default function Index() {
  const petsFetcher = useFetcher();
  const actionData = useActionData();

  const loadPets = useCallback(
    (value) => {
      console.log(value);
      petsFetcher.load(`/pet-search?petType=${value}`);
    },
    [petsFetcher]
  );

  useEffect(() => {
    if (petsFetcher.type === "init") {
      loadPets("home");
    }
  }, [petsFetcher, loadPets]);

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <Form method="post" id="myForm">
        <select
          disabled={petsFetcher.state !== "idle"}
          name="petType"
          id="petType"
          onChange={(event) => loadPets(event.target.value)}
        >
          <option value={"home"} key={"home"}>
            home
          </option>
          <option value={"wild"} key={"wild"}>
            wild
          </option>
        </select>

        <select
          required
          name="selectedPet"
          id="selectedPet"
          disabled={petsFetcher.state !== "idle"}
        >
          <option value="">please pick one</option>
          {petsFetcher?.data?.pets?.map((p) => (
            <option value={p.name} key={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <button type="submit">SUBMIT</button>
      </Form>
      <p>{actionData?.message}</p>
    </div>
  );
}
