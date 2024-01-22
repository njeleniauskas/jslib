# Group Selection
Common functions to handle groups with single or multi-selection.

<br>


## Overview
The group selection module manages the selection of controls within a component. There are a few important behaviors this module covers, including behaviors for

<br>

- single selection;
- multiple selection;
- resetting a group;
- toggling a reset control; and 
- managing the statedness of controls.

<br> 

## Behavior and Usage
### Updating a Selection
Because of the flexibility, updating a selection group is accomplished by using the `updateGroupSelection` function, which requires the nodes, callback function, and arguments for the function to work. The callback will either be the `updateSingleSelection` or `updateMultipleSelection` functions.

<br>

### Reset Features
Resetting a selection group is useful when one or more selections are possible. In this case, functions exist to help reset the selection group to its initial state, and toggle the reset control.

Toggling a reset control simply flags the control with an attribute or class in case the control is dynamically shown (not always the case).

<br>

### Control Statedness
The functions in this module cover any type of accessible stated-ness that can exist, including the state being represented by

<br>

- the value of an attribute;
- the existence of an attribute; or event
- the checked state of radio and checkbox inputs.

<br>

Authors can be very specific about what component accept, or allow any type of selection.