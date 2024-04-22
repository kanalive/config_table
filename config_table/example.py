import streamlit as st
import config_table
st.title("Config table")

config_data = {
    "AUD": {
        "1 Fut": {
            "Range Low": 0,
            "Range High": 0,
            "Range Reference Options":["1 Fut"]
        },
        "2-4 Fut": {
            "Range Low": 0,
            "Range High": 0,
            "Range Reference Options":["2 Fut", "3 Fut", "4 Fut"]
        },
        "5-7 Fut": {
            "Range Low": 0,
            "Range High": 0,
            "Range Reference Options":["5 Fut", "6 Fut", "7 Fut"]
        }
    },
    
}
config_data2 = {
    "General Settings": {
        "theme": "dark",
        "notificationsEnabled": True,
        "volume": 75
    },
    "User Preferences": {
        "fontSize": 14,
        "language": ["English", "Spanish", "French"],
        "layout": {
            "density": "compact",
            "color": ["Blue", "Green", "Red", "Dark"]
        }
    },
    "System Config": {
        "retry Attempts": 5,
        "timeout": 300,
        "advanced": {
            "pipeline Mode": ["sequential", "parallel"],
            "enable Logging": True
        }
    }
}

return_value1 = config_table.config_table(name="conf1",config=config_data)
st.write(return_value1)

return_value2 = config_table.config_table(name="conf2",config=config_data)
st.write(return_value2)