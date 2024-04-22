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
    btn_name: "";
  };
  disabled: boolean; // Standard prop to control interactivity.
  width: number;    // Standard prop to control the width of the component.
}

interface State {
  config: {
    [key: string]: any; // Allows any property with a string key and any type of value
  };
  btn_name: "";
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


  private renderField = (value: any, path: string, themeClass: string = "form-control table-cell"): ReactNode => {
    if (typeof value === 'object' && !Array.isArray(value) && value.options) {
      // Handle dropdowns with options and a selected value
      return (
        <td className="config-table-td">
          <select
            className={themeClass}
            defaultValue={value.selected}  // Set the currently selected option
            onChange={(e) => this.handleChange(path + '.selected', e.target.value)}  // Update the selected value on change
          >
            {value.options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </td>
      );
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      // Handle nested objects
      return Object.entries(value).map(([key, val]) => {
        const fullPath = `${path}.${key}`;
        return this.renderField(val, fullPath, themeClass);
      });
    } else {
      // Handle other inputs like text and checkbox
      return (
        <td className="config-table-td">
          <input
            className={themeClass}
            type={typeof value === 'number' ? 'number' : typeof value === 'boolean' ? 'checkbox' : 'text'}
            defaultValue={typeof value !== 'boolean' ? value : undefined}
            checked={typeof value === 'boolean' ? value : undefined}
            onChange={(e) => this.handleChange(path, typeof value === 'number' ? parseFloat(e.target.value) : typeof value === 'boolean' ? e.target.checked : e.target.value)}
          />
        </td>
      );
    }
  };
  
  public render = (): ReactNode => {
    const { config } = this.props.args;
    const { theme } = this.props;
    const tableCellClass = (theme && theme.base === "dark") ? 'form-control table-cell-dark' : 'form-control table-cell';
    const btnClass = (theme && theme.base === "dark") ? 'config-table-btn-dark float-right' : 'config-table-btn float-right';
    const btnName = this.props.args["btn_name"];


    return (
      <div >
        {config && Object.entries(config).map(([key, value]) => (
          <div key={key}>
            <h3>{key}</h3>
            <table>
              
              <tbody>
                {Object.entries(value).map(([nestedKey, nestedValue]) => (
                  <tr key={nestedKey}>
                    <td className="config-table-td">{nestedKey}</td>
                    {this.renderField(nestedValue, `${key}.${nestedKey}`, tableCellClass)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <button className={btnClass} onClick={this.handleSubmit}>{btnName}</button>
      </div>
    );
  }
}

export default withStreamlitConnection(ConfigTable);
