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

export async function availablePdfs(): Promise<string[]> {
  const res = await fetch(`${apiserver}/availablePdfs`);
  const jsonresp = await res.json();
  return jsonresp;
}
export type Analysis = {
  droneCount: number;
};
export type ImageDesc = {
  file: string;
  imageDesc: string;
};

export type ImageAnalysis = {
  filename: string;
  analysis: Analysis;
  originalImageDescription: string;
};

export async function describeImage(imageFileName: string): Promise<ImageDesc> {
  const res = await fetch(`${apiserver}/describeImage/${imageFileName}`);
  const jsonresp = await res.json();
  return jsonresp;
}

export async function getAnalysis(
  imageFileName: string,
  text: string
): Promise<ImageAnalysis> {
  const res = await fetch(`${apiserver}/parseText/${imageFileName}`, {
    method: "POST",
    body: JSON.stringify({ imageDesc: text }),
    headers: {
      "Content-Type": "application/json",
    },
  });
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

export const deleteImage = async (fileName: string): Promise<boolean> => {
  const res = await fetch(`${apiserver}/delete/${fileName}`, {
    method: "DELETE",
  });
  return res.status === 204;
};

export const rag = async (fileName: string, query: string): Promise<string> => {
  const res = await fetch(`${apiserver}/rag/${fileName}`, {
    method: "POST",
    body: JSON.stringify({ q: query }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonresp = await res.json();
  return jsonresp;
};

export const ragIndex = async (fileName: string): Promise<number> => {
  const res = await fetch(`${apiserver}/ragindex/${fileName}`, {
    method: "POST",
    body: JSON.stringify({ something: "1" }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonresp = await res.json();
  return jsonresp;
};
