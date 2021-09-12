import { writable } from 'svelte/store';

export const booted = writable(false);
export const accepted = writable(false);
export const configured = writable(false);
export const screen = writable("nav");