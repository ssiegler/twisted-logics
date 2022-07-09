import {writable} from "svelte/store";

function createInputs() {
    const { subscribe, set, update} = writable([])
    return {
        subscribe,
        add: (value) => update(inputs => {
            if (inputs[0] === value) {
                return inputs;
            }
            let result = inputs.filter((item) => item !== value);
            result.unshift(value);
            return result;
        }),
        reset: () => set([])
    };
}

export const inputs = createInputs();