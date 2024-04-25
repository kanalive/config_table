import os
import streamlit.components.v1 as components
import streamlit as st

# _component_func = components.declare_component(
      
#         "config_table",
       
#         url="http://localhost:3001",
#     )

# st.title("Config table")

# config_data = {
#     "AUD": {
#         "1 Fut": {
#             "Range Low": 0,
#             "Range High": 0,
#             "Range Reference Options":
#             {
#                 "options": ["1 Fut"],
#                 "selected": "1 Fut"
#                 }
#         },
#         "2-4 Fut": {
#             "Range Low": 0,
#             "Range High": 0,
#             "Range Reference Options":{
#                 "options": ["2 Fut", "3 Fut", "4 Fut"]
#             }
#         },
#         "5-7 Fut": {
#             "Range Low": 0,
#             "Range High": 0,
#             "Range Reference Options":{
#                 "options": ["5 Fut", "6 Fut", "7 Fut"],
#                 "selected": "7 Fut"
#             }
#         }
#     },
    
# }

# return_value1 = _component_func(name="conf1",config=config_data, btn_name="Update")
# st.write(return_value1)

parent_dir = os.path.dirname(os.path.abspath(__file__))
build_dir = os.path.join(parent_dir,  "frontend\\build")
_component_func = components.declare_component("config_table", path=build_dir)


# Create a wrapper function for the component. This is an optional
# best practice - we could simply expose the component function returned by
# `declare_component` and call it done. The wrapper allows us to customize
# our component's API: we can pre-process its input args, post-process its
# output value, and add a docstring for users.
def config_table(name, config, btn_name, idx_header, key=None):
    component_value = _component_func(name=name, key=key, config=config, btn_name = btn_name, idx_header = idx_header, default=0)
    # We could modify the value returned from the component if we wanted.
    # There's no need to do this in our simple example - but it's an option.
    return component_value
