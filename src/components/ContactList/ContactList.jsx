import React from 'react';
import PropTypes from 'prop-types';
import ContactListItem from '../ContactListItem/ContactListItem';

import { useSelector } from 'react-redux';
import { getContacts, getFilter } from '../../redux/selectors';

import { ListItems, Text } from './ContactList.styled';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) => {
      const contactName = contact.name ? contact.name.toLowerCase() : '';
      return contactName.includes(normalizedFilter);
    });
  };

  return (
    <>
      {contacts.length > 0 ? ( 
        <ListItems>
          {getVisibleContacts().map((contact) => (
            <ContactListItem key={contact.id} contact={contact} />
          ))}
        </ListItems>
      ) : (
        <Text>Phonebook is empty. Add your first contact!</Text>
      )}
    </>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ),
};
