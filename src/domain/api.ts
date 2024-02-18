const apiserver = "http://localhost:3000";

export default async function cities() {
  const res = await fetch(`${apiserver}/cities/germany`);
  const jsonresp = await res.json();
  console.info(`json resp = ${jsonresp}`);
  return jsonresp;
}

export async function availableImages(): Promise<string[]> {
  const res = await fetch(`${apiserver}/availableImages`);
  const jsonresp = await res.json();
  return jsonresp;
}
