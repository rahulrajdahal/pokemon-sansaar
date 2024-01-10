import React from "react";
import Input from "./Input";
import { useInView } from "react-intersection-observer";
import DebouncedInput from "./DebounceInput";
import { Search } from "meistericons-react";

let pokemons = [];

const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
const responseJson = await response.json();

const pokemonUrls = responseJson.results.map((res) => res.url);

for (const url of pokemonUrls) {
  const resp = await fetch(url);
  const respJson = await resp.json();
  pokemons.push({
    name: respJson.name,
    image: respJson.sprites["front_default"],
    type: respJson.types[0].type.name,
  });
}

type IPokemonList = {
  // pokemons: { name: string; image: string; type: string }[];
};
export default function PokemonList({}: // pokemons,
IPokemonList) {
  const [allPokemons, setAllPokemons] = React.useState(pokemons);
  const [filterPokemons, setFilterPokemons] = React.useState(allPokemons);
  const [nextUrl, setNextUrl] = React.useState(responseJson.next);
  const [pokemonQuery, setPokemonQuery] = React.useState("");

  const handleOnChange = (value) => {
    setFilterPokemons(
      allPokemons.filter((pokemon) => pokemon.name.includes(value))
    );
  };

  const { ref, inView } = useInView();

  const fetchPokemons = async () => {
    const pokemons = [];

    const response = await fetch(nextUrl);
    const responseJson = await response.json();

    setNextUrl(responseJson.next);

    const pokemonUrls = responseJson.results.map((res) => res.url);

    for (const url of pokemonUrls) {
      const resp = await fetch(url);
      const respJson = await resp.json();
      pokemons.push({
        name: respJson.name,
        image: respJson.sprites["front_default"],
        type: respJson.types[0].type.name,
      });
    }

    setAllPokemons((prev) => [...prev, ...pokemons]);
    setFilterPokemons((prev) => [...prev, ...pokemons]);
  };

  React.useEffect(() => {
    if (inView) {
      fetchPokemons();
    }
  }, [inView]);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      window.location.href = `/pokemon/${e.currentTarget.value}`;
    }
  };

  return (
    <div className="p-8 mt-4">
      <span
        className={`max-w-[20rem] py-2 px-4 w-full flex items-center gap-2 border-gray-300 border rounded-lg `}
      >
        <Search />
        <DebouncedInput
          value={pokemonQuery}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          className="w-full outline-none border-none"
        />
      </span>
      <p className="mt-3">
        <strong>{filterPokemons?.length} Pokemons found</strong>
      </p>
      <div className="w-full mt-5 grid grid-cols-6 gap-x-12 gap-y-8">
        {filterPokemons?.map((pokemon) => (
          <a
            key={pokemon.name}
            href={`/pokemon/${pokemon.name}`}
            className=" w-full flex flex-col items-center gap-4 px-4 py-2 rounded-md shadow-xl hover:scale-110 hover:shadow-2xl hover:bg-green-300 transition-all border border-gray-300"
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              width={60}
              height={60}
              className="w-40 h-40 rounded-full"
            />
            <strong>{pokemon.name}</strong>
            <p>
              <strong>Type:</strong> {pokemon.type}
            </p>
          </a>
        ))}
      </div>
      <span ref={ref} />
    </div>
  );
}
