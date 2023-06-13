import { createSlice } from '@reduxjs/toolkit';

const contactsInitialState = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        const { name, number } = action.payload;
        const nameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
        const numberRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

        if (name.match(nameRegex) && number.match(numberRegex)) {
          state.push(action.payload);
        } else {
          const nameErrorMessage = "Name may contain only letters, apostrophe, dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";
          const numberErrorMessage = "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +";
          const errorMessage = `Invalid ${!name.match(nameRegex) ? 'Name' : 'Number'}: ${!name.match(nameRegex) ? nameErrorMessage : numberErrorMessage}`;
          alert(errorMessage);
        }
      },
    },
    deleteContact(state, action) {
      return state.filter((contact) => contact.id !== action.payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
