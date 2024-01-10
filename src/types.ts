export type IResponse = {
  count: number;
  prev: string | null;
  next: string | null;
  results: { name: string; url: string }[];
};

export type IPokemon = {
  name: string;
  abilities: { ability: IAbility; is_hidden: boolean; slot: number };
  base_experience: number;
};

export type IAbility = { name: string; url: string };
