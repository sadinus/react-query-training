import { useQuery } from "@tanstack/react-query";

type Person = {
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

async function fetchPeople(): Promise<Person[]> {
  return fetch("https://swapi.dev/api/people/")
    .then((response) => response.json())
    .then((data: PeopleResponse) => data.results)
    .catch((error) => {
      console.log("Error fetching data: ", error);
      return [];
    });
}

export const usePeopleData = () => {
  return useQuery(["people"], fetchPeople);
};
