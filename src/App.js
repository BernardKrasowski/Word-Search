import "./App.css";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return;

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    setResult(json.query.search);
    setSearchInfo(json.query.searchinfo);

    setSearch("");
  };

  return (
    <div className="app">
      <header>
        <h1>Word Search</h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="What are you looking for? "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {searchInfo.totalhits ? (
          <p>Search Results: {searchInfo.totalhits}</p>
        ) : (
          ""
        )}
      </header>
      <div className="wrapper">
        {result.map((result, id) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

          return (
            <div key={id} className="results">
              <a href={url} target="_blank" rel="nofollow noreferrer">
                <div className="result">
                  <h3>{result.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
