export function ticketCreatedMail (id: string) {
    return `
        <h1>Welcome to the CRM App</h1>
        <p>Your Ticket with id: <strong>${id}</strong> has been created</p> <br/>
        <p>You can expect reply  within 24 hours.</p><br/>
        <img src="${"https://www.hubspot.com/hubfs/Smiling%20Leo%20Perfect%20GIF.gif"}" /> <br/>
        <p>Thanks and Regards</p>

    
    `
}