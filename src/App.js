import './App.css';
import EmailList from './components/maillist/emaillist.components';
import EmailView from './components/mailview/mailview.component';
import SearchBar from './components/searchbar/searchbar.components';
import React, { useState, useEffect } from 'react';

function App() {
  // Variable declaration: 
  // selectedEmailId : keeps track of the currently selected email.
  // currentFolder : determines which folder is active ('inbox' or 'deleted').
  // searchTerm : stores the current search input.
  const [emails, setEmails] = useState([]);
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [currentFolder, setCurrentFolder] = useState('inbox'); // 'inbox' or 'deleted'
  const [filteredEmails, setFilteredEmails] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

  //API Call (the HOOKs)
  useEffect(() => {
    const fetchMails = async () => {
    try {
        const response = await fetch(
          'https://gist.githubusercontent.com/mrchenliang/15e1989583fd6e6e04e1c49287934c91/raw/ed03cfea1e2edb0303543d2908cd7429ed75580d/email.json',
        );
        const data = await response.json();
        setEmails(data);
        console.log(data) // check if the API call is good
      } catch (error) {
        console.error("Fetching emails failed: ", error);
    }
    };

    fetchMails();
  }, []); // an empty array [] is the dependencies on the initial load

  // //FILTERED the search
  // useEffect(() => {
  //   // First, filter emails based on the current folder
  //   let filteredByFolder = emails.filter(email => {
  //     return currentFolder === 'deleted' ? email.deleted : !email.deleted;
  //   });
  
  //   // Second, if there's a search term, filter the already folder-filtered emails
  //   let filteredBySearchTerm = filteredByFolder.filter(email => {
  //     return email.subject.toLowerCase().includes(searchTerm.toLowerCase());
  //   });
  
  //   // Apply the final filtered list based on whether a search term was entered
  //   setFilteredEmails(searchTerm === "" ? filteredByFolder : filteredBySearchTerm);
  // }, [emails, searchTerm, currentFolder]); // Make sure to include currentFolder in the dependency array
  
  useEffect(() => {
    let filtered = emails.filter(email => {
      // Check if the email's tag matches the current folder ('inbox' or 'deleted')
    let folderMatch = false;
    if (currentFolder === 'inbox') {
      folderMatch = email.tag === 'inbox';
    } else {
      folderMatch = email.tag === 'deleted';
    }
      // Apply search term filter if there's a search term
      const searchTermMatch = searchTerm === '' || email.subject.toLowerCase().includes(searchTerm.toLowerCase());
  
      return folderMatch && searchTermMatch;
    });
  
    setFilteredEmails(filtered);
  }, [emails, searchTerm, currentFolder]); // Include currentFolder in the dependency array
  
  //This function mark an email as read and set it as the selected email.
  const handleEmailSelect = (id) => {
    setSelectedEmailId(id);

    // Update the email's data as read in the data 
    // so it keeps the status after being read
    const updatedEmails = emails.map(email => {
      if (email.id === id) {
          return { ...email, read: "true" }; // Mark as read
      }
      return email;
    }); 
    setEmails(updatedEmails);

  };


  //This function switch the folders
  const switchFolder = (folder) => {
    setCurrentFolder(folder);
  };

  // thus function find the selected email and display them
  const selectedEmail = emails.find(email => email.id === selectedEmailId);

  const handleSearchSubmit = (searchValue) => {
    setSearchTerm(searchValue);
  };

  //UI elements
  return (
    <div className="App">
      <div className="sidebar">
        <div className = {`folder-icon ${currentFolder === 'inbox' ? 'active' : ''}`} 
        onClick={() => switchFolder('inbox')}>
          Inbox
        </div>
        <div className = {`folder-icon ${currentFolder === 'deleted' ? 'active' : ''}`}
        onClick={() => switchFolder('deleted')}>
          Trash
        </div>
        <SearchBar onSearchSubmit={handleSearchSubmit} />
        <EmailList 
          emails={filteredEmails} 
          onEmailSelect={handleEmailSelect} 
          selectedEmailId = {selectedEmailId}
        />
      </div>
      <div className="email-body">
        <EmailView email={selectedEmail} />
      </div>
    </div>
  );
}

export default App;
