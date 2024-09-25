import React from "react";
import TicketCard from "./(components)/TicketCard";

const fetchTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch tickets");

    return res.json();
  } catch (error) {
    console.error("Error loading tickets:", error);
  }
};

const getUniqueCategories = (tickets) => [
  ...new Set(tickets.map((ticket) => ticket.category)),
];

const Dashboard = async () => {
  const data = await fetchTickets();
  const tickets = data?.tickets || [];

  if (!tickets.length) return <p>No tickets.</p>;

  return (
    <div className="p-5">
      {getUniqueCategories(tickets).map((category, index) => (
        <div key={index} className="mb-4">
          <h2>{category}</h2>
          <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
            {tickets
              .filter((ticket) => ticket.category === category)
              .map((filteredTicket) => (
                <TicketCard key={filteredTicket.id} ticket={filteredTicket} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
