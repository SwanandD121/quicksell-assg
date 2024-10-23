import React, { useState } from 'react';
import './App.css'; // Import CSS for styling

const App = () => {
    // Hardcoded ticket data
    const initialTickets = [
        { id: 1, title: 'Update User Profile Page UI', description: 'Improve the UI of the user profile page.', status: 'In Progress', user: 'Abhideep Maity', priority: 3 },
        { id: 2, title: 'Implement Email Notification System', description: 'Set up email notifications for users.', status: 'Todo', user: 'Akanksha Punjabi', priority: 2 },
        { id: 3, title: 'Create Onboarding Tutorial for New Users', description: 'Develop a tutorial for new users.', status: 'Done', user: 'Anoop Sharma', priority: 4 },
        // Add more tickets as needed
    ];

    const [tickets, setTickets] = useState(initialTickets);
    const [groupBy, setGroupBy] = useState('status');
    const [sortBy, setSortBy] = useState('priority');

    const handleGroupChange = (e) => {
        setGroupBy(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const sortedTickets = [...tickets].sort((a, b) => {
        if (sortBy === 'priority') {
            return b.priority - a.priority; // Descending order
        } else {
            return a.title.localeCompare(b.title); // Ascending order
        }
    });

    const groupedTickets = sortedTickets.reduce((groups, ticket) => {
        const key = groupBy === 'status' ? ticket.status : groupBy === 'user' ? ticket.user : ticket.priority;
        if (!groups[key]) groups[key] = [];
        groups[key].push(ticket);
        return groups;
    }, {});

    return (
        <div className="kanban-board">
            <h1>Kanban Board</h1>
            <div className="controls">
                <select onChange={handleGroupChange} value={groupBy}>
                    <option value="status">Group by Status</option>
                    <option value="user">Group by User</option>
                    <option value="priority">Group by Priority</option>
                </select>
                <select onChange={handleSortChange} value={sortBy}>
                    <option value="priority">Sort by Priority</option>
                    <option value="title">Sort by Title</option>
                </select>
            </div>
            <div className="board">
                {Object.keys(groupedTickets).map((key) => (
                    <div key={key} className="column">
                        <h2>{key}</h2>
                        {groupedTickets[key].map(ticket => (
                            <div key={ticket.id} className="card">
                                <h3>{ticket.title}</h3>
                                <p>{ticket.description}</p>
                                <span>Priority: {ticket.priority}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;