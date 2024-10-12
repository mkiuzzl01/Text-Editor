import MyEditor from "./components/MyEditor";

function App() {
  return (
    <div className="m-1">
      <h1 className="text-center font-serif text-2xl pt-2">Text Editor</h1>
      <p className="text-center pb-2">
        You can past any content from MS Office, Google Doc and Excel
      </p>
      <MyEditor></MyEditor>
    </div>
  );
}

export default App;
