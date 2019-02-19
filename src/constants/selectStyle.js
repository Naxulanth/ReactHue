export const selectStyle = {
    option: (provided, state) => ({
      ...provided,
      color: 'white',
      background: 'black',
      padding: 0,
    }),
    dropdownIndicator: (provided, state) => ({
        height: '30px'
    }),
    container: (provided, state) => ({
        border: '0.5px solid white',
        width: '100%',
        borderRadius: '5px'
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
    width: '100%',
    display: 'flex',
    }),
    singleValue: (provided, state) => ({
        background: 'black'
  }),
  menu: (provided, state) => ({
    ...provided,
    width: '85%',
    'background-color': 'black'
  }),
}

export const sceneSelectStyle = {
  option: (provided, state) => ({
    ...provided,
    color: 'white',
    background: 'black',
    padding: 0,
  }),
  dropdownIndicator: (provided, state) => ({
      height: '30px'
  }),
  container: (provided, state) => ({
      border: '0.5px solid white',
      width: '100%',
      borderRadius: '5px'
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
  width: '100%',
  display: 'flex',
  }),
  singleValue: (provided, state) => ({
      background: 'black'
}),
  menu: (provided, state) => ({
    ...provided,
    top: '20%',
    width: '90%',
    'background-color': 'black'
  }),
}