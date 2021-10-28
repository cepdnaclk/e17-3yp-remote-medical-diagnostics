export interface IceServerConfig {
  urls: string[];
  username: string;
  credential: string;
}

export function parseIceConfig(payload: string) {
  if (payload) return JSON.parse(payload) as Array<IceServerConfig>;
}
