import { usePeopleData } from "./swapi";

function App() {
  const { data: characters, isError, isLoading } = usePeopleData();

  if (isError) return "Error occurred during fetch";
  if (isLoading) return "Loading...";

  return (
    <>
      <h1>Star wars characters</h1>
      {characters?.map((character) => (
        <div>
          <h2>{character.name}</h2>
          <p>
            Info: {character.height}, {character.gender}, {character.birth_year}
          </p>
        </div>
      ))}
    </>
  );
}

export default App;
