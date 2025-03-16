import Editor from "@monaco-editor/react";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

const CodeEditor = () => {
  const [code, setCode] = useState("console.log('Hello, World!');");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (language === "javascript" && !code.includes(";")) {
      setErrors("Warning: Missing semicolon in JavaScript code.");
    } else {
      setErrors("");
    }
  }, [code, language]);

  const runCode = () => {
    try {
      if (errors) {
        throw new Error(errors);
      }
      
      const oldConsoleLog = console.log;
      let logOutput = "";
      console.log = (...args) => {
        logOutput += args.join(" ") + "\n";
      };

      new Function(code)(); // Execute user code

      console.log = oldConsoleLog;
      setOutput(logOutput);
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-primary">VS Code-Like Code Editor</h1>
      <select 
        className="form-select mb-3" 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
      </select>
      <div className="editor-container" style={{ height: "400px", border: "1px solid #ddd" }}>
        <Editor
          height="100%"
          theme="vs-dark"
          defaultLanguage={language}
          value={code}
          onChange={(newValue) => setCode(newValue)}
        />
      </div>
      {errors && <p className="text-danger mt-2">{errors}</p>}
      <button className="btn btn-success mt-3" onClick={runCode}>Run Code</button>
      <h2 className="text-success mt-3">Output:</h2>
      <pre className="bg-light p-3 border">{output}</pre>
    </div>
  );
};

export default CodeEditor;