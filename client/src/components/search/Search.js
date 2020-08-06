import React, { useCallback } from 'react';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import '@reach/combobox/styles.css';
import './Search.scss';

export default function Search({panTo}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // const mapRef = React.useRef();

  // const panTo = useCallback(({lat, lng}) => {
  //   mapRef.current.panTo({lat, lng});
  //   mapRef.current.setZoom(14);
  // }, [])

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      
      const placeId = results[0].place_id; //we'll need this to check the db on search

      console.log(placeId);
      const { lat, lng } = await getLatLng(results[0]);
      panTo({lat, lng})
    } catch (error) {
      console.log('An error has occurred', error);
    }
  };

  return (
    <div className='search'>
      <Combobox onSelect={handleSelect} className='combo-box'>
        <ComboboxInput
          className='combo-box__input'
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder='   Search for location'
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ id, description }, index) => (
                <ComboboxOption key={index} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
