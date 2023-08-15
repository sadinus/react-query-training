import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

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

async function fetchPeople(): Promise<Person[]> {
  return fetch("https://swapi.dev/api/people/")
    .then((response) => response.json())
    .then((data: PeopleResponse) => data.results)
    .then((people) => people.map((person) => ({ ...person, id: uuidv4() })))
    .catch((error) => {
      console.log("Error fetching data: ", error);
      return [];
    });
}

export const usePeopleData = () => {
  return useQuery(["people"], fetchPeople);
};
