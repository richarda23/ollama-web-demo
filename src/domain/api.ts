const apiserver = "http://localhost:3000";

type City = {
  name: string;
  description: string;
};
type Cities = {
  destinations: City[];
};
export default async function cities(): Promise<Cities> {
  const res = await fetch(`${apiserver}/cities/canada`);
  const jsonresp = await res.json();
  console.info(`json resp = ${jsonresp}`);
  return jsonresp;
}

export async function availableImages(): Promise<string[]> {
  const res = await fetch(`${apiserver}/availableImages`);
  const jsonresp = await res.json();
  return jsonresp;
}
export type Analysis = {
  threat: number;
  imageSummary: string;
  droneCount: number;
};
export type ImageDesc = {
  file: string;
  analysis: Analysis;
  originalImageDescription: string;
};

export async function describeImage(imageFileName: string): Promise<ImageDesc> {
  const res = await fetch(`${apiserver}/describeImage/${imageFileName}`);
  const jsonresp = await res.json();
  return jsonresp;
}

export const postImage = async (file: FormData): Promise<string> => {
  const res = await fetch(`${apiserver}/upload/`, {
    method: "POST",
    body: file,
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  });
  return await res.json();
};
