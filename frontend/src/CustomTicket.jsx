import React, { useState } from "react";

const CustomTicket = () => {
  const [ticketData, setTicketData] = useState([]);

  const handleTickets = () => {
    const newTicket = {};

    setTicketData([...ticketData, newTicket]);
  };

  return 
  <div>
    
  </div>;
};

export default CustomTicket;