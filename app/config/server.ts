import md5 from "spark-md5";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENAI_API_KEY?: string;
      CODE?: string;
      PROXY_URL?: string;
      VERCEL?: string;
      HIDE_USER_API_KEY?: string; // disable user's api key input
      DISABLE_GPT4?: string; // allow user to use gpt-4 or not
    }
  }
}

const ACCESS_CODES = (function getAccessCodes(): Set<string> {
  const code = process.env.CODE;

  try {
    const codes = (code?.split(",") ?? [])
      .filter((v) => !!v)
      .map((v) => md5.hash(v.trim()));
    return new Set(codes);
  } catch (e) {
    return new Set();
  }
})();

export const getServerSideConfig = () => {
  if (typeof process === "undefined") {
    throw Error(
      "[Server Config] you are importing a nodejs-only module outside of nodejs",
    );
  }

  return {
    apiKey: process.env.OPENAI_API_KEY,
    code: process.env.CODE,
    codes: ACCESS_CODES,
    needCode: ACCESS_CODES.size > 0,
    proxyUrl: process.env.PROXY_URL,
    isVercel: !!process.env.VERCEL,
    hideUserApiKey: !!process.env.HIDE_USER_API_KEY,
    enableGPT4: !process.env.DISABLE_GPT4,
  };
};

export const authCodes = [
  "wj35-4dc760ab84874e8c9d013280ce5c65ab",
  "wj35-c5429d0872634f97a5647dcf32f17953",
  "wj35-e5c0ad419b9e4a9d8a41263ff3a99847b",
  "wj35-f7d891eb6db546a9b60c3d8e82e47e2b",
  "wj35-8f5d10ce21554e4f9b6b7c0658ac29f6",
  "wj35-2db5e1f4c6034e4cb1e98d68d8c593dc",
  "wj35-03e3629687b64f4a94231a3668e8b184",
  "wj35-59df4c6deb1e4e20b7cc942c6a5a53b2",
  "wj35-a6fcb6f865154a788eabdf7da4ad9f61",
  "wj35-d8f4638b70f24a5a946fd3292b4a8716",
];

export const authPlusCode = [
  "wj40-5aef786fb2d94f86a1a5f11f1535b764",
  "wj40-c734e980b6a0408a86e6be94a75cd1fd",
  "wj40-ed7f5c6397e54516a0f20124e08b56bf",
  "wj40-1e69f83b4aaf4f2e9e1c10ddc9f0d0e2",
  "wj40-8d2c97e74c9948f1b0e3806b024a1c57",
  "wj40-6a7b4d8214f14d87b042a1f68f3df6e7",
  "wj40-7f109d5a927b42a3b8645edf8d19ce92",
  "wj40-b8e546f0739b456e9b0ac8824a06a163",
  "wj40-3c7a9812a8ab4b76a05b10d2e638d49e",
  "wj40-f90f69d8e0e14e98a2e7fe5e2e5dcff3",
];
