import { initTE, Input, Autocomplete } from "tw-elements";
import { React, useEffect } from "react";
export default function AsyncAutoCompleteSelect({
  urls,
  name,
  label,
  dispatchFunc,
}) {
  // isSuccess && dispatcher({ type: "SET_EMPLOYEES", payload: [data] });
  //componente select con search
  try {
    const asyncAutocomplete = document.querySelector(`#${name}`);
    const asyncFilter = async (query) => {
      const url = urls;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      return data;
    };

    new Autocomplete(asyncAutocomplete, {
      filter: asyncFilter,
      displayValue: (value) => value[name],
    });
  } catch (e) {
    console.log(e);
  }
  useEffect(() => {
    initTE({ Input, Autocomplete });
  }, []);
  //soluciona bug cada vez que rederiza crea un nuevo drop-down
  //solucion: obtiene

  return (
    <div class="relative" data-te-input-wrapper-init id={name}>
      <input
        name={name}
        type="text"
        class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id={`input-${name}`}
        required
      />
      <label
        for={`input-${name}`}
        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[80%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-focused]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-focused]:scale-[0.8] peer-data-[te-input-state-active]:scale-[0.8] peer-data-[te-input-focused]:text-primary motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
      >
        {label}
      </label>
    </div>
  );
}
