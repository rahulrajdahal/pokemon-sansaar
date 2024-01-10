import React from "react";
import * as Tabs from "@radix-ui/react-tabs";

const tabs = [
  { id: 1, tab: "Info" },
  { id: 2, tab: "Abilities" },
  // { id: 3, tab: "Forms" },
  { id: 4, tab: "Stats" },
  // { id: 5, tab: "Types" },
];

export default function PokemonTab({
  info,
  abilities,
  stats,
}: {
  info: any;
  abilities: any;
  stats: any;
}) {
  const [activeTab, setActiveTab] = React.useState(tabs[0].tab.toLowerCase());

  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return <PokemonInfo info={info} />;

      case "abilities":
        return <PokemonAbilities abilities={abilities} />;

      case "stats":
        return <PokemonStats stats={stats} />;

      default:
        break;
    }
  };

  return (
    <Tabs.Root
      className="flex flex-col w-full gap-4"
      defaultValue={activeTab}
      onValueChange={(value: string) => setActiveTab(value)}
    >
      <Tabs.List className="flex items-center" aria-label="Manage your account">
        {tabs.map(({ id, tab }) => (
          <Tabs.Trigger
            key={id}
            className="px-8 hover:cursor-pointer py-2  text-gray-900 font-medium text-2xl select-none data-[state=active]:bg-blue-700 data-[state=active]:rounded-md data-[state=active]:text-gray-50 border-none outline-none"
            value={tab.toLowerCase()}
          >
            {tab}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Content
        className="p-5 rounded-b-md outline-none border border-grey-300"
        value={activeTab}
      >
        {renderContent()}
      </Tabs.Content>
    </Tabs.Root>
  );
}

const PokemonInfo = ({ info }: { info: any }) => {
  return (
    <ul className="flex flex-col gap-2">
      {info.map(([key, value]) => (
        <li key={key}>
          <p className="capitalize">
            <strong>{key.replaceAll("_", " ")}: </strong>
            {value}
          </p>
        </li>
      ))}
    </ul>
  );
};

const PokemonAbilities = ({ abilities }: { abilities: any }) => {
  return (
    <>
      <strong className="text-xl font-semibold text-gray-800">Abilities</strong>

      <ul className="w-full mt-4">
        {abilities
          .map((abiliti) => abiliti.ability)
          .map((ability) => (
            <li
              key={ability.name}
              className="text-base font-semibold text-gray-900"
            >
              {ability.name}
            </li>
          ))}
      </ul>
    </>
  );
};

const PokemonStats = ({ stats }: { stats: any }) => {
  return (
    <>
      <strong className="text-xl font-semibold text-gray-800">Stats</strong>

      <table className="w-full text-left mt-4">
        <thead className="">
          <tr>
            <th>Name</th>
            <th>Effort</th>
            <th>Base Stat</th>
          </tr>
        </thead>

        <tbody>
          {stats.map((stat) => (
            <tr key={stat.stat.name}>
              <td className="py-2">{stat.stat.name}</td>
              <td className="py-2">{stat.effort}</td>
              <td className="py-2">{stat.base_stat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
