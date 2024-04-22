import streamlit as st
import config_table
st.title("Config table")

config_data = {
    "AUD": {
        "1 Fut": {
            "Range Low": 0,
            "Range High": 0,
            "Range Reference Options":
            {
                "options": ["1 Fut"],
                "selected": "1 Fut"
                }
        },
        "2-4 Fut": {
            "Range Low": 0,
            "Range High": 0,
            "Range Reference Options":{
                "options": ["2 Fut", "3 Fut", "4 Fut"]
            }
        },
        "5-7 Fut": {
            "Range Low": 0,
            "Range High": 0,
            "Range Reference Options":{
                "options": ["5 Fut", "6 Fut", "7 Fut"],
                "selected": "7 Fut"
            }
        }
    },
    
}


return_value1 = config_table.config_table(name="conf1",config=config_data)
st.write(return_value1)
