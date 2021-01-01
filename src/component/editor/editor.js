import CodeMirror from "react-codemirror";
import React, { Component } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/clike/clike";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "./editor.css";
import "codemirror/theme/material-darker.css";
import "codemirror/addon/display/fullscreen.css";
import "codemirror/addon/display/fullscreen";

class Editor extends Component {

  constructor()
  {
    super();
    this.cm = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.sharable === false && this.props.sharable) {
      console.log("YOLO");
      let editor = this.cm.getCodeMirror();
      editor.setValue(this.props.value);
    }

    if(prevProps.reset == false && this.props.reset)
    {
        let editor = this.cm.getCodeMirror();
        editor.setValue("");
        this.props.helper();
    }

    if (prevProps.isFullScreen == false && this.props.isFullScreen) {
      let editor = this.cm.getCodeMirror();
      editor.setOption("fullScreen", true);
      this.props.fullscreenhelper();
      editor.focus();
    }


    if (prevProps.isSelected == false && this.props.isSelected) {
      let text = "";
      switch (this.props.language) {
        case "text/x-csrc":
          text = "#include <stdio.h>\nint main()\n{\n   return 0;\n}";
          break;

        case "text/x-c++src":
          text =
            "#include <iostream>\nusing namespace std;\n\nint main() \n{\n\treturn 0;\n}";
          break;

        case "text/x-java":
          text =
            "public class Main {\n    public static void main(String[] args) {\n        \n    }\n}";
          break;

        case "Python":
          text = "#Your Python came here!";
          break;

        default:
          text = "";
      }

      let editor = this.cm.getCodeMirror();
      editor.setValue(text);

      this.props.selectHelper();
    }
  }

  render() {


    if (this.props.value !== "" && this.props.isReadOnly) {
      let outputBox = this.cm.getCodeMirror();
      outputBox.setValue(this.props.value);
    }

    return (
      <CodeMirror
        className={this.props.class}
        ref={(c) => (this.cm = c)}
        value={this.props.value}
        options={{
          mode: this.props.language,
          theme: this.props.theme,
          lineNumbers: this.props.lineNumber,
          autoCloseTags: true,
          tabSize: 4,
          indentWithTabs: true,
          autofocus: this.props.autofocus,
          extraKeys: {
            F11: function (cm) {
              cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            Esc: function (cm) {
              if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            },
          },
          readOnly: this.props.isReadOnly,
        }}
        onChange={this.props.changed}
      />
    );
  }
}

export default Editor;
