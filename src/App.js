import React, { Component } from "react";
import Editor from "./component/editor/editor";
import Toolbar from "./component/toolbar/toolbar";
import Loader from "./component/loader/loader";
import Navbar from "./component/navbar/navbar";
import "./App.css";
import ReactModal from "./component/Modal/Modal";

const SERVER_URL = "http://localhost:3000";

class App extends Component {
  state = {
    code: "#include <stdio.h>\nint main()\n{\n   return 0;\n}",
    theme: "material-darker",
    language: "text/x-csrc",
    isFullScreen: false,
    isReset: false,
    isRunning: false,
    inputText: "",
    outputText: "",
    isSelected: false,
    showModal: false,
    saved: false,
    fileId: "",
    sharable: false,
    langId : null
  };

  language_id = {
    "text/x-csrc": "0",
    "text/x-c++src": "1",
    "Python": "2",
  };

  componentDidMount() {
    if (this.props.match) {
      const id = this.props.match.params.id;
      fetch(SERVER_URL + `/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("DATA ==> ", data);
          this.setState({
            code: data.sourceCode,
            inputText: data.stdInput,
            sharable: true,
            langId : data.languageId,
          });
        })
        .catch((err) => {
          alert("URL Expired");
        });
    }
  }

  editorUpdated = (newCode) => {
    this.setState({
      code: newCode,
    });
  };

  inputUpdated = (newInput) => {
    this.setState({
      inputText: newInput,
    });
  };

  selectHandler = (e) => {
    if (e.target.id === "theme") {
      this.setState({
        theme: e.target.value,
      });
    } else if (e.target.id === "language") {
      this.setState({
        language: e.target.value,
        isSelected: true,
      });
    }
  };

  selectHelper = () => {
    this.setState({
      isSelected: false,
    });
  };

  resetCode = () => {
    this.setState((prevState) => {
      return { isReset: !prevState.isReset, code: "" };
    });
  };

  fullScreenToggle = () => {
    this.setState((prevState) => {
      return {
        isFullScreen: true,
      };
    });
  };

  fullscreenhelper = () => {
    this.setState({
      isFullScreen: false,
    });
  };

  downloadCode = () => {
    let extention = "";
    switch (this.state.language) {
      case "text/x-csrc":
        extention = ".c";
        break;
      case "text/x-c++src":
        extention = ".cpp";
        break;
      default:
        extention = ".txt";
        break;
    }

    const fileName = "main" + extention;
    const element = document.createElement("a");
    const file = new Blob([this.state.code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  };

  checkCode = () => {
    if (this.state.code !== "") {
      console.log("here");
      this.setState({
        showModal: true,
      });
    } else {
      alert("No Code To Save");
    }
  };

  saveCode = (fileName) => {
    const data = {
      fileName: fileName,
      sourceCode: this.state.code,
      stdInput: this.state.inputText,
      languageId: this.language_id[this.state.language],
    };

    console.log("Saving Data --> ", data);

    let fileSaveUrl = "http://localhost:3000/create_file";
    fetch(fileSaveUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((code) => {
        this.setState({
          saved: true,
          fileId: code._id,
        });
      });
  };

  runCode = () => {
    if (this.state.code !== "") {
      this.setState((prevState) => {
        return {
          isRunning: !prevState.isRunning,
        };
      });
      let data = {
        source_code: this.state.code,
        language_id: this.language_id[this.state.language],
        stdin: this.state.inputText,
      };

      let baseUrl = "http://localhost:3000/compile";
      console.log("data to send ", data);
      fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((opData) => {
          this.setState((prevState) => {
            return {
              outputText: opData.output,
              isRunning: !prevState.isRunning,
            };
          });
        });
    } else {
      let output = "code dude";
      this.setState({
        outputText: output,
      });

      this.setState((prevState) => {
        return {
          isRunning: false,
        };
      });
    }
  };

  toggleModal = () => {
    this.setState((prev) => {
      return { showModal: !prev.showModal };
    });
  };

  render() {
    let scrollClass = "scrollinout";

    let loading = null;
    if (this.state.isRunning) {
      loading = <Loader />;
    }

    return (
      <div className="App">
        {this.state.showModal ? (
          <ReactModal
            show={this.state.showModal}
            toggleModal={this.toggleModal}
            saveCode={this.saveCode}
            saved={this.state.saved}
            link={this.state.fileId}
          />
        ) : null}
        <Navbar title="Code Editor" checkCode={this.checkCode} />

        <div class="container">
          <div class="Toolbar">
            <Toolbar
              selected={this.selectHandler}
              fullScreen={this.fullScreenToggle}
              reset={this.resetCode}
              runCode={this.runCode}
              downloadCode={this.downloadCode}
              isRunning={this.state.isRunning}
              sharable={this.state.sharable}
              languageId={this.state.langId}
            />
          </div>
          <div class="Input">Input</div>
          <div class="Editor">
            <Editor
              changed={this.editorUpdated}
              theme={this.state.theme}
              language={this.state.language}
              value={this.state.code}
              isFullScreen={this.state.isFullScreen}
              reset={this.state.isReset}
              helper={this.resetCode}
              isReadOnly={false}
              lineNumber={true}
              autoFocus={true}
              fullscreenhelper={this.fullscreenhelper}
              isSelected={this.state.isSelected}
              selectHelper={this.selectHelper}
              sharable={this.state.sharable}
            />
          </div>
          <div class="Input-box">
            <Editor
              changed={this.inputUpdated}
              theme={this.state.theme}
              isReadOnly={false}
              autoFocus={false}
              lineNumber={true}
              class={scrollClass}
              value={this.state.inputText}
              sharable={this.state.sharable}
            />
          </div>
          <div class="Output">{this.state.isRunning ? loading : "Output"}</div>
          <div class="Output-box">
            <Editor
              theme={this.state.theme}
              isReadOnly={true}
              autoFocus={false}
              value={this.state.outputText}
              lineNumber={true}
              class={scrollClass}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
