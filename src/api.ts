import { TUser } from "./type.ts";

export const getUser = async (login: string): Promise<TUser> => {
  const user = await (
    await fetch(`https://www.codewars.com/api/v1/users/${login}`)
  ).json();

  return user;
};
