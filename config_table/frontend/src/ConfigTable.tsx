import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib";
import React, { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./app.css"

interface Props {
  args: {
    config: any; // Ensure this matches how Streamlit passes down the props.
  };
  disabled: boolean; // Standard prop to control interactivity.
  width: number;    // Standard prop to control the width of the component.
}

interface State {
  config: {
    [key: string]: any; // Allows any property with a string key and any type of value
  };
}

class ConfigTable extends StreamlitComponentBase<Props, State> {
  // constructor(props: Props) {
  //   super(props);
  // }
  

  private handleChange = (path: string, value: any) => {
    console.log("change")
    // Manually handle changes
    let keys = path.split('.');
    // let config = { ...this.props.args.config }; // Clone to prevent direct mutation
    let config = this.props.args.config
    let temp = config;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!temp[keys[i]]) {
        temp[keys[i]] = {};
      }
      temp = temp[keys[i]];
    }

    temp[keys[keys.length - 1]] = value;
    // Directly manipulate config without state
  };

  handleSubmit = () => {
    // Directly send the manipulated config object back to Streamlit
    console.log(this.props.args.config)
    Streamlit.setComponentValue(this.props.args.config);
  };


  private renderField = (value: any, path: string, themeClass:string="form-control table-cell"): ReactNode => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      return Object.entries(value).map(([key, val]) => {
        const fullPath = `${path}.${key}`;
        return this.renderField(val, fullPath, themeClass); // Recursively render deeper levels
      });
    } else if (Array.isArray(value)) {
      return (
        <td width="20%" className="config-table-td">
          <span ><select className={themeClass} onChange={(e) => this.handleChange(path, e.target.value)}>
            {value.map(option => <option key={option} value={option}>{option}</option>)}
          </select></span>
        </td>
      );
    } else if (typeof value === 'boolean') { // Separate handling for boolean values
      return (
        <td width="20%" className="config-table-td">
          <input
            // className={themeClass}
            style={{ margin: '5px' }}
            type="checkbox"
            defaultChecked={value}
            onChange={(e) => this.handleChange(path, e.target.checked)} // Use e.target.checked for checkbox
          />
        </td>
      );
    } else {
      return (
        <td width="20%" className="config-table-td">
          <input
            className={themeClass}
            type={typeof value === 'number' ? 'number' : 'text'}
            defaultValue={value}
            onChange={(e) => this.handleChange(path, typeof value === 'number' ? parseFloat(e.target.value) : e.target.value)}
          />
        </td>
      );
    }
  };

  public render = (): ReactNode => {
    const { config } = this.props.args;
    const { theme } = this.props;
    const tableCellClass = (theme && theme.base === "dark") ? 'form-control table-cell-dark' : 'form-control table-cell';
    const btnClass = (theme && theme.base === "dark") ? 'config-table-btn-dark' : 'config-table-btn';



    return (
      <div className="container">
        {config && Object.entries(config).map(([key, value]) => (
          <div key={key}>
            <h3>{key}</h3>
            <table>
              
              <tbody>
                {Object.entries(value).map(([nestedKey, nestedValue]) => (
                  <tr key={nestedKey}>
                    <td width="20%" className="config-table-td">{nestedKey}</td>
                    {this.renderField(nestedValue, `${key}.${nestedKey}`, tableCellClass)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <button className={btnClass} onClick={this.handleSubmit}>Save Config</button>
      </div>
    );
  }
}

export default withStreamlitConnection(ConfigTable);