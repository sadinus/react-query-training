import { useQuery } from "@tanstack/react-query";

type Person = {
  id: string;
  name: string;
  height: number;
  birth_year: number;
  gender: string;
};

type PeopleResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
};

function fetchPeople(): Promise<Person[] | void> {
  return fetch("https://swapi.dev/api/people")
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      return response.json();
    })
    .then((data: PeopleResponse) => data.results)
    .then((people) =>
      people.map((person) => ({ ...person, id: crypto.randomUUID() }))
    )
    .catch((error) => {
      console.log(`${fetchPeople.name} ->`, error);
    });
}

export const usePeopleData = () => {
  return useQuery(["people"], fetchPeople);
};
