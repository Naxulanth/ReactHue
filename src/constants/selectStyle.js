export const selectStyle = {
    option: (provided, state) => ({
      ...provided,
      color: 'white',
      background: 'black',
      padding: 0,
    }),
    dropdownIndicator: (provided, state) => ({
        width: '25%',
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
  })
}