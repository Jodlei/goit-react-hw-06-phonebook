import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Container } from './Container/Container.styled';
import { MainTitles, SecondTitles } from './Titles/Titles';
import { PhoneBookEditor } from './PhoneBookEditor/PhoneBookEditor';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
  const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

  const [contacts, setContacts] = useState(() =>
    parsedContacts ? parsedContacts : initialContacts
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (values, { resetForm }) => {
    const { name, number } = values;

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.map(item => item.name.toLowerCase()).includes(name.toLowerCase())
    ) {
      alert(newContact.name + 'is already in contacts');
    } else {
      setContacts([newContact, ...contacts]);
      resetForm();
    }
  };

  const deleteContact = contactId => {
    setContacts(
      contacts.filter(contact => {
        return contact.id !== contactId;
      })
    );
  };

  const doesFiltration = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleCotnacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <Container>
      <MainTitles title={'Phonebook'} />
      <PhoneBookEditor addContact={addContact} />
      <SecondTitles title={'Contacts'} />
      <Filter
        title={'Find contacts by name '}
        doesFiltration={doesFiltration}
      />
      <ContactsList
        contacts={getVisibleCotnacts()}
        deleteContact={deleteContact}
      />
    </Container>
  );
};
