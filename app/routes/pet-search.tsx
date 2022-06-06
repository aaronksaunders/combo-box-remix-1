const PETS = {
  wild: [
    { id: 10, name: "lions" },
    { id: 20, name: "tiger" },
    { id: 30, name: "bear" }
  ],
  home: [
    { id: 1, name: "dog" },
    { id: 2, name: "cat" },
    { id: 3, name: "parrot" }
  ]
};
export async function loader({ request }) {
  const url = new URL(request.url);
  const petType = url.searchParams.get("petType");

  const data = {
    petType,
    pets: PETS[petType]
  };

  return new Promise((resolve) => setTimeout(() => resolve(data),300));
}
