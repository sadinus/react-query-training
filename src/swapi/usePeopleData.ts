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

function fetchPeople(): Promise<Person[] | void> {
  return fetch("https://swapi.dev/api/people")
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      return response.json();
    })
    .then((data: PeopleResponse) => data.results)
    .then((people) => people.map((person) => ({ ...person, id: uuidv4() })))
    .catch((error) => {
      console.log("fetchPeople ->", error);
    });
}

export const usePeopleData = () => {
  return useQuery(["people"], fetchPeople);
};
